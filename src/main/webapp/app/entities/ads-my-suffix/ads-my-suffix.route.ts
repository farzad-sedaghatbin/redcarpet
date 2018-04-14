import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AdsMySuffixComponent } from './ads-my-suffix.component';
import { AdsMySuffixDetailComponent } from './ads-my-suffix-detail.component';
import { AdsMySuffixPopupComponent } from './ads-my-suffix-dialog.component';
import { AdsMySuffixDeletePopupComponent } from './ads-my-suffix-delete-dialog.component';

export const adsRoute: Routes = [
    {
        path: 'ads-my-suffix',
        component: AdsMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ads'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ads-my-suffix/:id',
        component: AdsMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ads'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const adsPopupRoute: Routes = [
    {
        path: 'ads-my-suffix-new',
        component: AdsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ads-my-suffix/:id/edit',
        component: AdsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ads-my-suffix/:id/delete',
        component: AdsMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
