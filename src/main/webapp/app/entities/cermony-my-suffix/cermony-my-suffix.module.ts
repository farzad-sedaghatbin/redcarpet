import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RedcarpetSharedModule } from '../../shared';
import {
    CermonyMySuffixService,
    CermonyMySuffixPopupService,
    CermonyMySuffixComponent,
    CermonyMySuffixDetailComponent,
    CermonyMySuffixDialogComponent,
    CermonyMySuffixPopupComponent,
    CermonyMySuffixDeletePopupComponent,
    CermonyMySuffixDeleteDialogComponent,
    cermonyRoute,
    cermonyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cermonyRoute,
    ...cermonyPopupRoute,
];

@NgModule({
    imports: [
        RedcarpetSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CermonyMySuffixComponent,
        CermonyMySuffixDetailComponent,
        CermonyMySuffixDialogComponent,
        CermonyMySuffixDeleteDialogComponent,
        CermonyMySuffixPopupComponent,
        CermonyMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CermonyMySuffixComponent,
        CermonyMySuffixDialogComponent,
        CermonyMySuffixPopupComponent,
        CermonyMySuffixDeleteDialogComponent,
        CermonyMySuffixDeletePopupComponent,
    ],
    providers: [
        CermonyMySuffixService,
        CermonyMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetCermonyMySuffixModule {}
