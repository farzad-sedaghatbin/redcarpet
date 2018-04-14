import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RedcarpetSharedModule } from '../../shared';
import {
    AdsMySuffixService,
    AdsMySuffixPopupService,
    AdsMySuffixComponent,
    AdsMySuffixDetailComponent,
    AdsMySuffixDialogComponent,
    AdsMySuffixPopupComponent,
    AdsMySuffixDeletePopupComponent,
    AdsMySuffixDeleteDialogComponent,
    adsRoute,
    adsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...adsRoute,
    ...adsPopupRoute,
];

@NgModule({
    imports: [
        RedcarpetSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AdsMySuffixComponent,
        AdsMySuffixDetailComponent,
        AdsMySuffixDialogComponent,
        AdsMySuffixDeleteDialogComponent,
        AdsMySuffixPopupComponent,
        AdsMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AdsMySuffixComponent,
        AdsMySuffixDialogComponent,
        AdsMySuffixPopupComponent,
        AdsMySuffixDeleteDialogComponent,
        AdsMySuffixDeletePopupComponent,
    ],
    providers: [
        AdsMySuffixService,
        AdsMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetAdsMySuffixModule {}
