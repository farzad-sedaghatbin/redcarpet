import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OrdersMySuffixComponent } from './orders-my-suffix.component';
import { OrdersMySuffixDetailComponent } from './orders-my-suffix-detail.component';
import { OrdersMySuffixPopupComponent } from './orders-my-suffix-dialog.component';
import { OrdersMySuffixDeletePopupComponent } from './orders-my-suffix-delete-dialog.component';

export const ordersRoute: Routes = [
    {
        path: 'orders-my-suffix',
        component: OrdersMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Orders'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'orders-my-suffix/:id',
        component: OrdersMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Orders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ordersPopupRoute: Routes = [
    {
        path: 'orders-my-suffix-new',
        component: OrdersMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Orders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'orders-my-suffix/:id/edit',
        component: OrdersMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Orders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'orders-my-suffix/:id/delete',
        component: OrdersMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Orders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
