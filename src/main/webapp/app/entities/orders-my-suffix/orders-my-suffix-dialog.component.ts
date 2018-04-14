import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrdersMySuffix } from './orders-my-suffix.model';
import { OrdersMySuffixPopupService } from './orders-my-suffix-popup.service';
import { OrdersMySuffixService } from './orders-my-suffix.service';

@Component({
    selector: 'jhi-orders-my-suffix-dialog',
    templateUrl: './orders-my-suffix-dialog.component.html'
})
export class OrdersMySuffixDialogComponent implements OnInit {

    orders: OrdersMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private ordersService: OrdersMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.orders.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ordersService.update(this.orders));
        } else {
            this.subscribeToSaveResponse(
                this.ordersService.create(this.orders));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrdersMySuffix>>) {
        result.subscribe((res: HttpResponse<OrdersMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrdersMySuffix) {
        this.eventManager.broadcast({ name: 'ordersListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-orders-my-suffix-popup',
    template: ''
})
export class OrdersMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ordersPopupService: OrdersMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ordersPopupService
                    .open(OrdersMySuffixDialogComponent as Component, params['id']);
            } else {
                this.ordersPopupService
                    .open(OrdersMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
