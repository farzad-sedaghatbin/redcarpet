import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RedcarpetSharedModule } from '../../shared';
import {
    ChatMySuffixService,
    ChatMySuffixPopupService,
    ChatMySuffixComponent,
    ChatMySuffixDetailComponent,
    ChatMySuffixDialogComponent,
    ChatMySuffixPopupComponent,
    ChatMySuffixDeletePopupComponent,
    ChatMySuffixDeleteDialogComponent,
    chatRoute,
    chatPopupRoute,
    ChatMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...chatRoute,
    ...chatPopupRoute,
];

@NgModule({
    imports: [
        RedcarpetSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChatMySuffixComponent,
        ChatMySuffixDetailComponent,
        ChatMySuffixDialogComponent,
        ChatMySuffixDeleteDialogComponent,
        ChatMySuffixPopupComponent,
        ChatMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ChatMySuffixComponent,
        ChatMySuffixDialogComponent,
        ChatMySuffixPopupComponent,
        ChatMySuffixDeleteDialogComponent,
        ChatMySuffixDeletePopupComponent,
    ],
    providers: [
        ChatMySuffixService,
        ChatMySuffixPopupService,
        ChatMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetChatMySuffixModule {}
