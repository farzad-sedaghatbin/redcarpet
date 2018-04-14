import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrdersMySuffix } from './orders-my-suffix.model';
import { OrdersMySuffixPopupService } from './orders-my-suffix-popup.service';
import { OrdersMySuffixService } from './orders-my-suffix.service';

@Component({
    selector: 'jhi-orders-my-suffix-delete-dialog',
    templateUrl: './orders-my-suffix-delete-dialog.component.html'
})
export class OrdersMySuffixDeleteDialogComponent {

    orders: OrdersMySuffix;

    constructor(
        private ordersService: OrdersMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ordersService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ordersListModification',
                content: 'Deleted an orders'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-orders-my-suffix-delete-popup',
    template: ''
})
export class OrdersMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ordersPopupService: OrdersMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ordersPopupService
                .open(OrdersMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
