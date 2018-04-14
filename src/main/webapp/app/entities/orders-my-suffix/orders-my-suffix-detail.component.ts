import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrdersMySuffix } from './orders-my-suffix.model';
import { OrdersMySuffixService } from './orders-my-suffix.service';

@Component({
    selector: 'jhi-orders-my-suffix-detail',
    templateUrl: './orders-my-suffix-detail.component.html'
})
export class OrdersMySuffixDetailComponent implements OnInit, OnDestroy {

    orders: OrdersMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ordersService: OrdersMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrders();
    }

    load(id) {
        this.ordersService.find(id)
            .subscribe((ordersResponse: HttpResponse<OrdersMySuffix>) => {
                this.orders = ordersResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ordersListModification',
            (response) => this.load(this.orders.id)
        );
    }
}
