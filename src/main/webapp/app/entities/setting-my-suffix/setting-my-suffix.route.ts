import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SettingMySuffixComponent } from './setting-my-suffix.component';
import { SettingMySuffixDetailComponent } from './setting-my-suffix-detail.component';
import { SettingMySuffixPopupComponent } from './setting-my-suffix-dialog.component';
import { SettingMySuffixDeletePopupComponent } from './setting-my-suffix-delete-dialog.component';

export const settingRoute: Routes = [
    {
        path: 'setting-my-suffix',
        component: SettingMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Settings'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'setting-my-suffix/:id',
        component: SettingMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Settings'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const settingPopupRoute: Routes = [
    {
        path: 'setting-my-suffix-new',
        component: SettingMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Settings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'setting-my-suffix/:id/edit',
        component: SettingMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Settings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'setting-my-suffix/:id/delete',
        component: SettingMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Settings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
