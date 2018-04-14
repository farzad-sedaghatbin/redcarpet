import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RedcarpetSharedModule } from '../../shared';
import {
    RatingMySuffixService,
    RatingMySuffixPopupService,
    RatingMySuffixComponent,
    RatingMySuffixDetailComponent,
    RatingMySuffixDialogComponent,
    RatingMySuffixPopupComponent,
    RatingMySuffixDeletePopupComponent,
    RatingMySuffixDeleteDialogComponent,
    ratingRoute,
    ratingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ratingRoute,
    ...ratingPopupRoute,
];

@NgModule({
    imports: [
        RedcarpetSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RatingMySuffixComponent,
        RatingMySuffixDetailComponent,
        RatingMySuffixDialogComponent,
        RatingMySuffixDeleteDialogComponent,
        RatingMySuffixPopupComponent,
        RatingMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        RatingMySuffixComponent,
        RatingMySuffixDialogComponent,
        RatingMySuffixPopupComponent,
        RatingMySuffixDeleteDialogComponent,
        RatingMySuffixDeletePopupComponent,
    ],
    providers: [
        RatingMySuffixService,
        RatingMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetRatingMySuffixModule {}
