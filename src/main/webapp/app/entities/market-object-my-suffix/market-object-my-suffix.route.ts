import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MarketObjectMySuffixComponent } from './market-object-my-suffix.component';
import { MarketObjectMySuffixDetailComponent } from './market-object-my-suffix-detail.component';
import { MarketObjectMySuffixPopupComponent } from './market-object-my-suffix-dialog.component';
import { MarketObjectMySuffixDeletePopupComponent } from './market-object-my-suffix-delete-dialog.component';

export const marketObjectRoute: Routes = [
    {
        path: 'market-object-my-suffix',
        component: MarketObjectMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MarketObjects'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'market-object-my-suffix/:id',
        component: MarketObjectMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MarketObjects'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const marketObjectPopupRoute: Routes = [
    {
        path: 'market-object-my-suffix-new',
        component: MarketObjectMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MarketObjects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'market-object-my-suffix/:id/edit',
        component: MarketObjectMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MarketObjects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'market-object-my-suffix/:id/delete',
        component: MarketObjectMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MarketObjects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
