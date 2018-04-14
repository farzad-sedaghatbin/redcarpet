import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RedcarpetSharedModule } from '../../shared';
import {
    DoListMySuffixService,
    DoListMySuffixPopupService,
    DoListMySuffixComponent,
    DoListMySuffixDetailComponent,
    DoListMySuffixDialogComponent,
    DoListMySuffixPopupComponent,
    DoListMySuffixDeletePopupComponent,
    DoListMySuffixDeleteDialogComponent,
    doListRoute,
    doListPopupRoute,
} from './';

const ENTITY_STATES = [
    ...doListRoute,
    ...doListPopupRoute,
];

@NgModule({
    imports: [
        RedcarpetSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DoListMySuffixComponent,
        DoListMySuffixDetailComponent,
        DoListMySuffixDialogComponent,
        DoListMySuffixDeleteDialogComponent,
        DoListMySuffixPopupComponent,
        DoListMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DoListMySuffixComponent,
        DoListMySuffixDialogComponent,
        DoListMySuffixPopupComponent,
        DoListMySuffixDeleteDialogComponent,
        DoListMySuffixDeletePopupComponent,
    ],
    providers: [
        DoListMySuffixService,
        DoListMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetDoListMySuffixModule {}
