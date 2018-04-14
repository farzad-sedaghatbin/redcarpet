import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DoListMySuffixComponent } from './do-list-my-suffix.component';
import { DoListMySuffixDetailComponent } from './do-list-my-suffix-detail.component';
import { DoListMySuffixPopupComponent } from './do-list-my-suffix-dialog.component';
import { DoListMySuffixDeletePopupComponent } from './do-list-my-suffix-delete-dialog.component';

export const doListRoute: Routes = [
    {
        path: 'do-list-my-suffix',
        component: DoListMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DoLists'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'do-list-my-suffix/:id',
        component: DoListMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DoLists'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const doListPopupRoute: Routes = [
    {
        path: 'do-list-my-suffix-new',
        component: DoListMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DoLists'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'do-list-my-suffix/:id/edit',
        component: DoListMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DoLists'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'do-list-my-suffix/:id/delete',
        component: DoListMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DoLists'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
