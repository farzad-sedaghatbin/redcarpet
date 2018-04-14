import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RedcarpetSharedModule } from '../../shared';
import {
    MarketObjectMySuffixService,
    MarketObjectMySuffixPopupService,
    MarketObjectMySuffixComponent,
    MarketObjectMySuffixDetailComponent,
    MarketObjectMySuffixDialogComponent,
    MarketObjectMySuffixPopupComponent,
    MarketObjectMySuffixDeletePopupComponent,
    MarketObjectMySuffixDeleteDialogComponent,
    marketObjectRoute,
    marketObjectPopupRoute,
} from './';

const ENTITY_STATES = [
    ...marketObjectRoute,
    ...marketObjectPopupRoute,
];

@NgModule({
    imports: [
        RedcarpetSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MarketObjectMySuffixComponent,
        MarketObjectMySuffixDetailComponent,
        MarketObjectMySuffixDialogComponent,
        MarketObjectMySuffixDeleteDialogComponent,
        MarketObjectMySuffixPopupComponent,
        MarketObjectMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MarketObjectMySuffixComponent,
        MarketObjectMySuffixDialogComponent,
        MarketObjectMySuffixPopupComponent,
        MarketObjectMySuffixDeleteDialogComponent,
        MarketObjectMySuffixDeletePopupComponent,
    ],
    providers: [
        MarketObjectMySuffixService,
        MarketObjectMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetMarketObjectMySuffixModule {}
