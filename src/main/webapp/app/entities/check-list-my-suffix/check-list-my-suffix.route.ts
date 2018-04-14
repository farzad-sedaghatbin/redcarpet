import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CheckListMySuffixComponent } from './check-list-my-suffix.component';
import { CheckListMySuffixDetailComponent } from './check-list-my-suffix-detail.component';
import { CheckListMySuffixPopupComponent } from './check-list-my-suffix-dialog.component';
import { CheckListMySuffixDeletePopupComponent } from './check-list-my-suffix-delete-dialog.component';

export const checkListRoute: Routes = [
    {
        path: 'check-list-my-suffix',
        component: CheckListMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CheckLists'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'check-list-my-suffix/:id',
        component: CheckListMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CheckLists'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const checkListPopupRoute: Routes = [
    {
        path: 'check-list-my-suffix-new',
        component: CheckListMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CheckLists'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'check-list-my-suffix/:id/edit',
        component: CheckListMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CheckLists'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'check-list-my-suffix/:id/delete',
        component: CheckListMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CheckLists'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
