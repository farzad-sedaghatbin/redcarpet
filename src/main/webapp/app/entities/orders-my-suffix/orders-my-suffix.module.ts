import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RedcarpetSharedModule } from '../../shared';
import {
    OrdersMySuffixService,
    OrdersMySuffixPopupService,
    OrdersMySuffixComponent,
    OrdersMySuffixDetailComponent,
    OrdersMySuffixDialogComponent,
    OrdersMySuffixPopupComponent,
    OrdersMySuffixDeletePopupComponent,
    OrdersMySuffixDeleteDialogComponent,
    ordersRoute,
    ordersPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ordersRoute,
    ...ordersPopupRoute,
];

@NgModule({
    imports: [
        RedcarpetSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrdersMySuffixComponent,
        OrdersMySuffixDetailComponent,
        OrdersMySuffixDialogComponent,
        OrdersMySuffixDeleteDialogComponent,
        OrdersMySuffixPopupComponent,
        OrdersMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        OrdersMySuffixComponent,
        OrdersMySuffixDialogComponent,
        OrdersMySuffixPopupComponent,
        OrdersMySuffixDeleteDialogComponent,
        OrdersMySuffixDeletePopupComponent,
    ],
    providers: [
        OrdersMySuffixService,
        OrdersMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetOrdersMySuffixModule {}
