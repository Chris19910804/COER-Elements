import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, Inject, inject, OnDestroy } from '@angular/core';
import { IAppSource, IBreadcrumb, IGoBack } from 'coer-elements/interfaces';
import { GridTemplates } from './coer-grid.templates';
import { CoerAlert } from './coer-alert/coer-alert.component';
import { Breadcrumbs } from './breadcrumbs.class';
import { Source } from './source.class';
import { Tools } from './tools';
import { Filters } from './filters.class';

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
    protected pageFilters: any = {};

    /** */
    protected goBack: IGoBack = { show: false };

    //Private Variables
    private _path: string = '';
    private _page: string = '';
    private _source: IAppSource | null = null;
    private _preventDestroy: boolean = false;


    constructor(@Inject(String) page: string) {
        this.SetPageName(page);
        this.__SetSource();
        this.__GetSource();
        this.__GetNavigation();
        this.__SetGoBack();
        this.__GetPageFilter();
        this.__GetPageResponse();
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

        this._path = this.router.url;
        if (this._path.includes('?')) this._path = this._path.split('?')[0];

        if (id) {
            const PATH_ARRAY = this._path.split('/');
            const PATH_ID = Tools.BreakReference(PATH_ARRAY).pop();
            if (PATH_ID) {
                PATH_ARRAY[PATH_ARRAY.length - 1] = String(id);
                this._path = PATH_ARRAY.join('/');
            }
        }

        if (this.breadcrumbs.length > 0) {
            this.breadcrumbs[this.breadcrumbs.length - 1].page = name;
            this.breadcrumbs[this.breadcrumbs.length - 1].path = this._path;
            Breadcrumbs.SetLast(name, this._path);
        }

        this.router.navigateByUrl(this._path)
    }


    /** */
    private __SetSource(): void {
        Source.Set(this._page);
    }


    /** */
    private __GetSource(): void {
        this._source = Source.Get();
    }


    /** */
    private __GetPageResponse(): void {
        this.pageResponse = Source.GetPageResponse();
    }


    /** */
    private __GetNavigation(): void {
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
    private __SetGoBack(): void {
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
            this.RemovePageFilter();
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
    protected SetPageFilters<T>(filters: T): void {
        this.pageFilters = Tools.BreakReference<T>(filters);
        Filters.Add(this.pageFilters, this._path);
    }


    /** */
    private __GetPageFilter(): void { 
        this.pageFilters = Filters.Get(this._path); 
    }


    /** */
    protected RemovePageFilter(): void { 
        this.pageFilters = {};
        Filters.Remove(this._path); 
    }


    /** */
    protected Log(value: any, log: string | null = null): void {
        if (Tools.IsNotNull(log)) console.log({ log, value });
        else console.log(value);
    }


    //Grid Templates
    protected isActiveTemplate = GridTemplates.isActiveTemplate;
    protected coerSwitchTemplate = GridTemplates.coerSwitchTemplate;
    protected coerTextboxTemplate = GridTemplates.coerTextboxTemplate;
    protected coerIconTemplate = GridTemplates.coerIconTemplate;


    //Tools
    protected IsNull = Tools.IsNull;
    protected IsNotNull = Tools.IsNotNull;
    protected IsOnlyWhiteSpace = Tools.IsOnlyWhiteSpace;
    protected IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
}