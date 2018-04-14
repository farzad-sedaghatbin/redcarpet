import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RedcarpetSharedModule } from '../../shared';
import {
    CheckListMySuffixService,
    CheckListMySuffixPopupService,
    CheckListMySuffixComponent,
    CheckListMySuffixDetailComponent,
    CheckListMySuffixDialogComponent,
    CheckListMySuffixPopupComponent,
    CheckListMySuffixDeletePopupComponent,
    CheckListMySuffixDeleteDialogComponent,
    checkListRoute,
    checkListPopupRoute,
} from './';

const ENTITY_STATES = [
    ...checkListRoute,
    ...checkListPopupRoute,
];

@NgModule({
    imports: [
        RedcarpetSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CheckListMySuffixComponent,
        CheckListMySuffixDetailComponent,
        CheckListMySuffixDialogComponent,
        CheckListMySuffixDeleteDialogComponent,
        CheckListMySuffixPopupComponent,
        CheckListMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CheckListMySuffixComponent,
        CheckListMySuffixDialogComponent,
        CheckListMySuffixPopupComponent,
        CheckListMySuffixDeleteDialogComponent,
        CheckListMySuffixDeletePopupComponent,
    ],
    providers: [
        CheckListMySuffixService,
        CheckListMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetCheckListMySuffixModule {}
