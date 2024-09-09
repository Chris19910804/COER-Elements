import { AfterViewInit, Component, Inject, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAppSource, IBreadcrumb, IGoBack } from '../../interfaces';
import { CoerAlert } from '../../components';
import { Breadcrumbs } from './breadcrumbs.class';
import { Source } from './source.class';
import { Tools } from './generi-tools';

@Component({ template: '' })
export class Page implements AfterViewInit, OnDestroy {

    //Injection
    protected readonly alert = inject(CoerAlert);
    protected readonly router = inject(Router);
    private readonly activatedRoute = inject(ActivatedRoute);

    /** */
    protected isUpdate: boolean = false;

    /** */
    protected isLoading: boolean = false;

    /** */
    protected isReadyPage: boolean = false;

    /** */
    protected enableAnimations: boolean = false;

    /** */
    protected routeParams: any;

    /** */
    protected queryParams: any;

    /** */
    protected breadcrumbs: IBreadcrumb[] = [];

    /** */
    protected pageResponse: any = null;

    /** */
    protected goBack: IGoBack = { show: false };

    //Private Variables
    private _page: string = '';
    private _source: IAppSource | null = null;
    private _preventDestroy: boolean = false;


    constructor(@Inject(String) page: string) {
        this.SetPageName(page);
        this.SetSource();
        this.GetSource();
        this.GetNavigation();
        this.SetGoBack();
        this.GetPageResponse();
    }

    ngAfterViewInit() {
        this.routeParams = this.activatedRoute.snapshot.params;
        this.queryParams = this.activatedRoute.snapshot.queryParams;

        setTimeout(() => {
            this.isReadyPage = true;
            this.RunPage();
            setTimeout(() => { this.enableAnimations = true }, 1000);
        });

    }

    ngOnDestroy() {
        if (!this._preventDestroy) Source.ClearPageResponse();
    }

    /** Main method. Starts after ngAfterViewInit() */
    protected RunPage(): void {};


    /** Rename the last breadcrumb and update the url id */
    protected SetPageName(name: string, id: string | number | null = null): void {
        this._page = name;

        let path = this.router.url;
        if (path.includes('?')) path = path.split('?')[0];

        if (id) {
            const PATH_ARRAY = path.split('/');
            const PATH_ID = Tools.BreakReference(PATH_ARRAY).pop();
            if (PATH_ID) {
                PATH_ARRAY[PATH_ARRAY.length - 1] = String(id);
                path = PATH_ARRAY.join('/');
            }
        }

        if (this.breadcrumbs.length > 0) {
            this.breadcrumbs[this.breadcrumbs.length - 1].page = name;
            this.breadcrumbs[this.breadcrumbs.length - 1].path = path;
            Breadcrumbs.SetLast(name, path);
        }

        this.router.navigateByUrl(path)
    }


    /** */
    private SetSource(): void {
        Source.Set(this._page);
    }


    /** */
    private GetSource(): void {
        this._source = Source.Get();
    }


    /** */
    protected GetPageResponse(): void {
        this.pageResponse = Source.GetPageResponse();
    }


    /** */
    private GetNavigation(): void {
        if (this._source) {
            this.breadcrumbs = Breadcrumbs.Get().map(item => Object.assign({
                page: item.page,
                path: item.path,
                click: this.GoBack(item.path)
            }));
        }

        else this.breadcrumbs = [{ page: this._page }];
    }


    /** */
    private SetGoBack(): void {
        if (this._source) {
            this.goBack = {
                show: true,
                path: this._source.path,
                click: this.GoBack()
            };
        }
    }


    /** */
    private GoBack = (path?: string) => (() => {
        if (path) Breadcrumbs.Remove(path);
        else Breadcrumbs.RemoveLast();
    });


    /** Navigate to previous page */
    protected GoToSource<T>(pageResponse: T | null = null): void {
        if(this._source) {
            Breadcrumbs.RemoveLast();
            this.SetPageResponse(pageResponse);
            Tools.Sleep().then(_ => this.router.navigateByUrl(this._source!.path));
        }
    };


    /** */
    protected SetPageResponse<T>(pageResponse: T | null = null): void {
        if (Tools.IsNotNull(pageResponse)) {
            this._preventDestroy = true;
            Source.SetPageResponse(pageResponse);
        }
    };


    /** */
    protected ReloadPage(): void {
        Breadcrumbs.RemoveLast();
        setTimeout(() => window.location.reload());
    }


    /** */
    protected Log(value: any, log: string | null = null): void {
        if (Tools.IsNotNull(log)) console.log({ log, value });
        else console.log(value);
    }
}