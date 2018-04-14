import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RedcarpetSharedModule } from '../../shared';
import {
    MediaMySuffixService,
    MediaMySuffixPopupService,
    MediaMySuffixComponent,
    MediaMySuffixDetailComponent,
    MediaMySuffixDialogComponent,
    MediaMySuffixPopupComponent,
    MediaMySuffixDeletePopupComponent,
    MediaMySuffixDeleteDialogComponent,
    mediaRoute,
    mediaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...mediaRoute,
    ...mediaPopupRoute,
];

@NgModule({
    imports: [
        RedcarpetSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MediaMySuffixComponent,
        MediaMySuffixDetailComponent,
        MediaMySuffixDialogComponent,
        MediaMySuffixDeleteDialogComponent,
        MediaMySuffixPopupComponent,
        MediaMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MediaMySuffixComponent,
        MediaMySuffixDialogComponent,
        MediaMySuffixPopupComponent,
        MediaMySuffixDeleteDialogComponent,
        MediaMySuffixDeletePopupComponent,
    ],
    providers: [
        MediaMySuffixService,
        MediaMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetMediaMySuffixModule {}
