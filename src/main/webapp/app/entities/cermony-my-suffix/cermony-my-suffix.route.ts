import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CermonyMySuffixComponent } from './cermony-my-suffix.component';
import { CermonyMySuffixDetailComponent } from './cermony-my-suffix-detail.component';
import { CermonyMySuffixPopupComponent } from './cermony-my-suffix-dialog.component';
import { CermonyMySuffixDeletePopupComponent } from './cermony-my-suffix-delete-dialog.component';

export const cermonyRoute: Routes = [
    {
        path: 'cermony-my-suffix',
        component: CermonyMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cermonies'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cermony-my-suffix/:id',
        component: CermonyMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cermonies'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cermonyPopupRoute: Routes = [
    {
        path: 'cermony-my-suffix-new',
        component: CermonyMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cermonies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cermony-my-suffix/:id/edit',
        component: CermonyMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cermonies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cermony-my-suffix/:id/delete',
        component: CermonyMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cermonies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
