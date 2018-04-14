import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RedcarpetSharedModule } from '../../shared';
import {
    ErrorMySuffixService,
    ErrorMySuffixPopupService,
    ErrorMySuffixComponent,
    ErrorMySuffixDetailComponent,
    ErrorMySuffixDialogComponent,
    ErrorMySuffixPopupComponent,
    ErrorMySuffixDeletePopupComponent,
    ErrorMySuffixDeleteDialogComponent,
    errorRoute,
    errorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...errorRoute,
    ...errorPopupRoute,
];

@NgModule({
    imports: [
        RedcarpetSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ErrorMySuffixComponent,
        ErrorMySuffixDetailComponent,
        ErrorMySuffixDialogComponent,
        ErrorMySuffixDeleteDialogComponent,
        ErrorMySuffixPopupComponent,
        ErrorMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ErrorMySuffixComponent,
        ErrorMySuffixDialogComponent,
        ErrorMySuffixPopupComponent,
        ErrorMySuffixDeleteDialogComponent,
        ErrorMySuffixDeletePopupComponent,
    ],
    providers: [
        ErrorMySuffixService,
        ErrorMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetErrorMySuffixModule {}
