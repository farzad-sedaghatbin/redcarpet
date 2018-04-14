import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CermonyMySuffix } from './cermony-my-suffix.model';
import { CermonyMySuffixPopupService } from './cermony-my-suffix-popup.service';
import { CermonyMySuffixService } from './cermony-my-suffix.service';

@Component({
    selector: 'jhi-cermony-my-suffix-dialog',
    templateUrl: './cermony-my-suffix-dialog.component.html'
})
export class CermonyMySuffixDialogComponent implements OnInit {

    cermony: CermonyMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cermonyService: CermonyMySuffixService,
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
        if (this.cermony.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cermonyService.update(this.cermony));
        } else {
            this.subscribeToSaveResponse(
                this.cermonyService.create(this.cermony));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CermonyMySuffix>>) {
        result.subscribe((res: HttpResponse<CermonyMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CermonyMySuffix) {
        this.eventManager.broadcast({ name: 'cermonyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cermony-my-suffix-popup',
    template: ''
})
export class CermonyMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cermonyPopupService: CermonyMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cermonyPopupService
                    .open(CermonyMySuffixDialogComponent as Component, params['id']);
            } else {
                this.cermonyPopupService
                    .open(CermonyMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
