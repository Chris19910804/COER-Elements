import { Component, viewChild } from '@angular/core';
import { CoerButton } from 'coer-elements/components';
import { Page, Tools } from 'coer-elements/tools';
import { IProperty } from 'projects/coer-documentation/src/app/shared/interfaces';

@Component({
    selector: 'coer-button-page',
    templateUrl: './coer-button.component.html',
    styleUrl: './coer-button.component.scss'
})
export class CoerButtonPage extends Page {

    protected coerButton = viewChild.required<CoerButton>('#coerButton');

    constructor() { super('coer-button') }

    //Variables
    protected properties: IProperty[] = [
        { property: 'color', type: 'string', default: { name: 'default' },
            options: [
                { name: 'default'    },
                { name: 'primary'    },
                { name: 'secondary'  },
                { name: 'success'    },
                { name: 'warning'    },
                { name: 'danger'     },
                { name: 'navigation' }
            ]
        },
        { property: 'type', type: 'string', default: { name: 'filled' },
            options: [
                { name: 'filled'         },
                { name: 'outline'        },
                { name: 'icon'           },
                { name: 'icon-outline'   },
                { name: 'icon-no-border' }
            ]
        },
        { property: 'icon', type: 'string',  default: { name: 'new' },
            options: [
                { name: 'new'    },
                { name: 'save'   },
                { name: 'cancel' },
                { name: 'import' },
                { name: 'excel'  },
                { name: 'menu'   },
                { name: 'delete' },
                { name: 'edit'   },
                { name: 'go'     },
                { name: 'back'   }
            ]
        },
        { property: 'iconPosition', type: 'string', default: { name: 'left' },
            options: [
                { name: 'left'  },
                { name: 'right' }
            ]
        },
        { property: 'animation', type: 'boolean', default: { name: false },
            options: [
                { name: true  },
                { name: false }
            ]
        },
        { property: 'isLoading', type: 'boolean', default: { name: false },
            options: [
                { name: true  },
                { name: false }
            ]
        },
        { property: 'isDisabled', type: 'boolean', default: { name: false },
            options: [
                { name: true  },
                { name: false }
            ]
        },
        { property: 'isInvisible', type: 'boolean', default: { name: false },
            options: [
                { name: true  },
                { name: false }
            ]
        },
        { property: 'tooltip', type: 'string', default: 'Tooltip' },
        { property: 'tooltipPosition', type: 'string',
            default: { name: 'left' },
            options: [
                { name: 'top'    },
                { name: 'right'  },
                { name: 'bottom' },
                { name: 'left'   }
            ]
        },
        { property: 'width'       , type: 'string', default: '125px' },
        { property: 'minWidth'    , type: 'string', default: '30px'  },
        { property: 'height'      , type: 'string', default: '40px'  },
        { property: 'minHeight'   , type: 'string', default: '30px'  },
        { property: 'marginTop'   , type: 'string', default: '0px'   },
        { property: 'marginRight' , type: 'string', default: '0px'   },
        { property: 'marginBottom', type: 'string', default: '0px'   },
        { property: 'marginLeft'  , type: 'string', default: '0px'   }
    ];


    /** */
    protected HasOptions(property: IProperty): any {
        return Tools.GetObjectProperties(property).some(x => x == 'options');
    }


    /** */
    protected GetProperty(property: string): any {
        const value = this.properties.find(x => x.property == property)?.default;
        return ['string'].includes(typeof value) ? value : value.name;
    }
}