import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FactorMySuffixComponent } from './factor-my-suffix.component';
import { FactorMySuffixDetailComponent } from './factor-my-suffix-detail.component';
import { FactorMySuffixPopupComponent } from './factor-my-suffix-dialog.component';
import { FactorMySuffixDeletePopupComponent } from './factor-my-suffix-delete-dialog.component';

export const factorRoute: Routes = [
    {
        path: 'factor-my-suffix',
        component: FactorMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Factors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'factor-my-suffix/:id',
        component: FactorMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Factors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const factorPopupRoute: Routes = [
    {
        path: 'factor-my-suffix-new',
        component: FactorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Factors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'factor-my-suffix/:id/edit',
        component: FactorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Factors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'factor-my-suffix/:id/delete',
        component: FactorMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Factors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
