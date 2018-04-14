import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ErrorMySuffixComponent } from './error-my-suffix.component';
import { ErrorMySuffixDetailComponent } from './error-my-suffix-detail.component';
import { ErrorMySuffixPopupComponent } from './error-my-suffix-dialog.component';
import { ErrorMySuffixDeletePopupComponent } from './error-my-suffix-delete-dialog.component';

export const errorRoute: Routes = [
    {
        path: 'error-my-suffix',
        component: ErrorMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Errors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'error-my-suffix/:id',
        component: ErrorMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Errors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const errorPopupRoute: Routes = [
    {
        path: 'error-my-suffix-new',
        component: ErrorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Errors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'error-my-suffix/:id/edit',
        component: ErrorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Errors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'error-my-suffix/:id/delete',
        component: ErrorMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Errors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
