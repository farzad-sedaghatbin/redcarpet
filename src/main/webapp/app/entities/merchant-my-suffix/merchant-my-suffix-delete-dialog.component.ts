import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MerchantMySuffix } from './merchant-my-suffix.model';
import { MerchantMySuffixPopupService } from './merchant-my-suffix-popup.service';
import { MerchantMySuffixService } from './merchant-my-suffix.service';

@Component({
    selector: 'jhi-merchant-my-suffix-delete-dialog',
    templateUrl: './merchant-my-suffix-delete-dialog.component.html'
})
export class MerchantMySuffixDeleteDialogComponent {

    merchant: MerchantMySuffix;

    constructor(
        private merchantService: MerchantMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.merchantService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'merchantListModification',
                content: 'Deleted an merchant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-merchant-my-suffix-delete-popup',
    template: ''
})
export class MerchantMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private merchantPopupService: MerchantMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.merchantPopupService
                .open(MerchantMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
