import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FactorMySuffix } from './factor-my-suffix.model';
import { FactorMySuffixPopupService } from './factor-my-suffix-popup.service';
import { FactorMySuffixService } from './factor-my-suffix.service';

@Component({
    selector: 'jhi-factor-my-suffix-delete-dialog',
    templateUrl: './factor-my-suffix-delete-dialog.component.html'
})
export class FactorMySuffixDeleteDialogComponent {

    factor: FactorMySuffix;

    constructor(
        private factorService: FactorMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.factorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'factorListModification',
                content: 'Deleted an factor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-factor-my-suffix-delete-popup',
    template: ''
})
export class FactorMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private factorPopupService: FactorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.factorPopupService
                .open(FactorMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
