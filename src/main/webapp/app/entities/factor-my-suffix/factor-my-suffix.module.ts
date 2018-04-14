import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RedcarpetSharedModule } from '../../shared';
import {
    FactorMySuffixService,
    FactorMySuffixPopupService,
    FactorMySuffixComponent,
    FactorMySuffixDetailComponent,
    FactorMySuffixDialogComponent,
    FactorMySuffixPopupComponent,
    FactorMySuffixDeletePopupComponent,
    FactorMySuffixDeleteDialogComponent,
    factorRoute,
    factorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...factorRoute,
    ...factorPopupRoute,
];

@NgModule({
    imports: [
        RedcarpetSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FactorMySuffixComponent,
        FactorMySuffixDetailComponent,
        FactorMySuffixDialogComponent,
        FactorMySuffixDeleteDialogComponent,
        FactorMySuffixPopupComponent,
        FactorMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        FactorMySuffixComponent,
        FactorMySuffixDialogComponent,
        FactorMySuffixPopupComponent,
        FactorMySuffixDeleteDialogComponent,
        FactorMySuffixDeletePopupComponent,
    ],
    providers: [
        FactorMySuffixService,
        FactorMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetFactorMySuffixModule {}
