import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ErrorMySuffix } from './error-my-suffix.model';
import { ErrorMySuffixPopupService } from './error-my-suffix-popup.service';
import { ErrorMySuffixService } from './error-my-suffix.service';

@Component({
    selector: 'jhi-error-my-suffix-delete-dialog',
    templateUrl: './error-my-suffix-delete-dialog.component.html'
})
export class ErrorMySuffixDeleteDialogComponent {

    error: ErrorMySuffix;

    constructor(
        private errorService: ErrorMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.errorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'errorListModification',
                content: 'Deleted an error'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-error-my-suffix-delete-popup',
    template: ''
})
export class ErrorMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private errorPopupService: ErrorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.errorPopupService
                .open(ErrorMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
