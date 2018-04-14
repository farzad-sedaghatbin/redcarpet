import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RedcarpetSharedModule } from '../../shared';
import {
    SettingMySuffixService,
    SettingMySuffixPopupService,
    SettingMySuffixComponent,
    SettingMySuffixDetailComponent,
    SettingMySuffixDialogComponent,
    SettingMySuffixPopupComponent,
    SettingMySuffixDeletePopupComponent,
    SettingMySuffixDeleteDialogComponent,
    settingRoute,
    settingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...settingRoute,
    ...settingPopupRoute,
];

@NgModule({
    imports: [
        RedcarpetSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SettingMySuffixComponent,
        SettingMySuffixDetailComponent,
        SettingMySuffixDialogComponent,
        SettingMySuffixDeleteDialogComponent,
        SettingMySuffixPopupComponent,
        SettingMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SettingMySuffixComponent,
        SettingMySuffixDialogComponent,
        SettingMySuffixPopupComponent,
        SettingMySuffixDeleteDialogComponent,
        SettingMySuffixDeletePopupComponent,
    ],
    providers: [
        SettingMySuffixService,
        SettingMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetSettingMySuffixModule {}
