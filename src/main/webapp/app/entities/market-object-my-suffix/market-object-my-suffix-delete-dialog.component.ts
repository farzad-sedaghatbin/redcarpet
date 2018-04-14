import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MarketObjectMySuffix } from './market-object-my-suffix.model';
import { MarketObjectMySuffixPopupService } from './market-object-my-suffix-popup.service';
import { MarketObjectMySuffixService } from './market-object-my-suffix.service';

@Component({
    selector: 'jhi-market-object-my-suffix-delete-dialog',
    templateUrl: './market-object-my-suffix-delete-dialog.component.html'
})
export class MarketObjectMySuffixDeleteDialogComponent {

    marketObject: MarketObjectMySuffix;

    constructor(
        private marketObjectService: MarketObjectMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.marketObjectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'marketObjectListModification',
                content: 'Deleted an marketObject'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-market-object-my-suffix-delete-popup',
    template: ''
})
export class MarketObjectMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private marketObjectPopupService: MarketObjectMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.marketObjectPopupService
                .open(MarketObjectMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
