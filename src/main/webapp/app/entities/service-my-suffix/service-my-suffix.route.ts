import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ServiceMySuffixComponent } from './service-my-suffix.component';
import { ServiceMySuffixDetailComponent } from './service-my-suffix-detail.component';
import { ServiceMySuffixPopupComponent } from './service-my-suffix-dialog.component';
import { ServiceMySuffixDeletePopupComponent } from './service-my-suffix-delete-dialog.component';

export const serviceRoute: Routes = [
    {
        path: 'service-my-suffix',
        component: ServiceMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Services'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'service-my-suffix/:id',
        component: ServiceMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Services'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const servicePopupRoute: Routes = [
    {
        path: 'service-my-suffix-new',
        component: ServiceMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Services'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-my-suffix/:id/edit',
        component: ServiceMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Services'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-my-suffix/:id/delete',
        component: ServiceMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Services'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
