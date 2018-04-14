import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MerchantMySuffixComponent } from './merchant-my-suffix.component';
import { MerchantMySuffixDetailComponent } from './merchant-my-suffix-detail.component';
import { MerchantMySuffixPopupComponent } from './merchant-my-suffix-dialog.component';
import { MerchantMySuffixDeletePopupComponent } from './merchant-my-suffix-delete-dialog.component';

export const merchantRoute: Routes = [
    {
        path: 'merchant-my-suffix',
        component: MerchantMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Merchants'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'merchant-my-suffix/:id',
        component: MerchantMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Merchants'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const merchantPopupRoute: Routes = [
    {
        path: 'merchant-my-suffix-new',
        component: MerchantMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Merchants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'merchant-my-suffix/:id/edit',
        component: MerchantMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Merchants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'merchant-my-suffix/:id/delete',
        component: MerchantMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Merchants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
