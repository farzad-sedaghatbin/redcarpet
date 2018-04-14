import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MediaMySuffixComponent } from './media-my-suffix.component';
import { MediaMySuffixDetailComponent } from './media-my-suffix-detail.component';
import { MediaMySuffixPopupComponent } from './media-my-suffix-dialog.component';
import { MediaMySuffixDeletePopupComponent } from './media-my-suffix-delete-dialog.component';

export const mediaRoute: Routes = [
    {
        path: 'media-my-suffix',
        component: MediaMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Media'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'media-my-suffix/:id',
        component: MediaMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Media'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mediaPopupRoute: Routes = [
    {
        path: 'media-my-suffix-new',
        component: MediaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Media'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'media-my-suffix/:id/edit',
        component: MediaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Media'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'media-my-suffix/:id/delete',
        component: MediaMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Media'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
