import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ErrorMySuffix } from './error-my-suffix.model';
import { ErrorMySuffixPopupService } from './error-my-suffix-popup.service';
import { ErrorMySuffixService } from './error-my-suffix.service';

@Component({
    selector: 'jhi-error-my-suffix-dialog',
    templateUrl: './error-my-suffix-dialog.component.html'
})
export class ErrorMySuffixDialogComponent implements OnInit {

    error: ErrorMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private errorService: ErrorMySuffixService,
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
        if (this.error.id !== undefined) {
            this.subscribeToSaveResponse(
                this.errorService.update(this.error));
        } else {
            this.subscribeToSaveResponse(
                this.errorService.create(this.error));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ErrorMySuffix>>) {
        result.subscribe((res: HttpResponse<ErrorMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ErrorMySuffix) {
        this.eventManager.broadcast({ name: 'errorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-error-my-suffix-popup',
    template: ''
})
export class ErrorMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private errorPopupService: ErrorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.errorPopupService
                    .open(ErrorMySuffixDialogComponent as Component, params['id']);
            } else {
                this.errorPopupService
                    .open(ErrorMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
