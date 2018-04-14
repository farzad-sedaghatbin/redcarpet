import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrdersMySuffix } from './orders-my-suffix.model';
import { OrdersMySuffixService } from './orders-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-orders-my-suffix',
    templateUrl: './orders-my-suffix.component.html'
})
export class OrdersMySuffixComponent implements OnInit, OnDestroy {
orders: OrdersMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private ordersService: OrdersMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.ordersService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<OrdersMySuffix[]>) => this.orders = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.ordersService.query().subscribe(
            (res: HttpResponse<OrdersMySuffix[]>) => {
                this.orders = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOrders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OrdersMySuffix) {
        return item.id;
    }
    registerChangeInOrders() {
        this.eventSubscriber = this.eventManager.subscribe('ordersListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
