import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AdsMySuffix } from './ads-my-suffix.model';
import { AdsMySuffixPopupService } from './ads-my-suffix-popup.service';
import { AdsMySuffixService } from './ads-my-suffix.service';

@Component({
    selector: 'jhi-ads-my-suffix-delete-dialog',
    templateUrl: './ads-my-suffix-delete-dialog.component.html'
})
export class AdsMySuffixDeleteDialogComponent {

    ads: AdsMySuffix;

    constructor(
        private adsService: AdsMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.adsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'adsListModification',
                content: 'Deleted an ads'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ads-my-suffix-delete-popup',
    template: ''
})
export class AdsMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private adsPopupService: AdsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.adsPopupService
                .open(AdsMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
