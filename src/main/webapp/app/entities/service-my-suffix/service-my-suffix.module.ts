import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RedcarpetSharedModule } from '../../shared';
import {
    ServiceMySuffixService,
    ServiceMySuffixPopupService,
    ServiceMySuffixComponent,
    ServiceMySuffixDetailComponent,
    ServiceMySuffixDialogComponent,
    ServiceMySuffixPopupComponent,
    ServiceMySuffixDeletePopupComponent,
    ServiceMySuffixDeleteDialogComponent,
    serviceRoute,
    servicePopupRoute,
} from './';

const ENTITY_STATES = [
    ...serviceRoute,
    ...servicePopupRoute,
];

@NgModule({
    imports: [
        RedcarpetSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServiceMySuffixComponent,
        ServiceMySuffixDetailComponent,
        ServiceMySuffixDialogComponent,
        ServiceMySuffixDeleteDialogComponent,
        ServiceMySuffixPopupComponent,
        ServiceMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ServiceMySuffixComponent,
        ServiceMySuffixDialogComponent,
        ServiceMySuffixPopupComponent,
        ServiceMySuffixDeleteDialogComponent,
        ServiceMySuffixDeletePopupComponent,
    ],
    providers: [
        ServiceMySuffixService,
        ServiceMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetServiceMySuffixModule {}
