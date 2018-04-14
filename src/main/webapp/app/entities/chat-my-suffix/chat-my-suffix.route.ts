import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ChatMySuffixComponent } from './chat-my-suffix.component';
import { ChatMySuffixDetailComponent } from './chat-my-suffix-detail.component';
import { ChatMySuffixPopupComponent } from './chat-my-suffix-dialog.component';
import { ChatMySuffixDeletePopupComponent } from './chat-my-suffix-delete-dialog.component';

@Injectable()
export class ChatMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const chatRoute: Routes = [
    {
        path: 'chat-my-suffix',
        component: ChatMySuffixComponent,
        resolve: {
            'pagingParams': ChatMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Chats'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chat-my-suffix/:id',
        component: ChatMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Chats'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chatPopupRoute: Routes = [
    {
        path: 'chat-my-suffix-new',
        component: ChatMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Chats'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-my-suffix/:id/edit',
        component: ChatMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Chats'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-my-suffix/:id/delete',
        component: ChatMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Chats'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
