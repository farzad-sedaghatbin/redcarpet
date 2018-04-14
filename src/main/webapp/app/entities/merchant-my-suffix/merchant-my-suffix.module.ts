import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RedcarpetSharedModule } from '../../shared';
import {
    MerchantMySuffixService,
    MerchantMySuffixPopupService,
    MerchantMySuffixComponent,
    MerchantMySuffixDetailComponent,
    MerchantMySuffixDialogComponent,
    MerchantMySuffixPopupComponent,
    MerchantMySuffixDeletePopupComponent,
    MerchantMySuffixDeleteDialogComponent,
    merchantRoute,
    merchantPopupRoute,
} from './';

const ENTITY_STATES = [
    ...merchantRoute,
    ...merchantPopupRoute,
];

@NgModule({
    imports: [
        RedcarpetSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MerchantMySuffixComponent,
        MerchantMySuffixDetailComponent,
        MerchantMySuffixDialogComponent,
        MerchantMySuffixDeleteDialogComponent,
        MerchantMySuffixPopupComponent,
        MerchantMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MerchantMySuffixComponent,
        MerchantMySuffixDialogComponent,
        MerchantMySuffixPopupComponent,
        MerchantMySuffixDeleteDialogComponent,
        MerchantMySuffixDeletePopupComponent,
    ],
    providers: [
        MerchantMySuffixService,
        MerchantMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetMerchantMySuffixModule {}
