import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CheckListMySuffix } from './check-list-my-suffix.model';
import { CheckListMySuffixPopupService } from './check-list-my-suffix-popup.service';
import { CheckListMySuffixService } from './check-list-my-suffix.service';
import { CermonyMySuffix, CermonyMySuffixService } from '../cermony-my-suffix';

@Component({
    selector: 'jhi-check-list-my-suffix-dialog',
    templateUrl: './check-list-my-suffix-dialog.component.html'
})
export class CheckListMySuffixDialogComponent implements OnInit {

    checkList: CheckListMySuffix;
    isSaving: boolean;

    cermonies: CermonyMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private checkListService: CheckListMySuffixService,
        private cermonyService: CermonyMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cermonyService.query()
            .subscribe((res: HttpResponse<CermonyMySuffix[]>) => { this.cermonies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.checkList.id !== undefined) {
            this.subscribeToSaveResponse(
                this.checkListService.update(this.checkList));
        } else {
            this.subscribeToSaveResponse(
                this.checkListService.create(this.checkList));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CheckListMySuffix>>) {
        result.subscribe((res: HttpResponse<CheckListMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CheckListMySuffix) {
        this.eventManager.broadcast({ name: 'checkListListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCermonyById(index: number, item: CermonyMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-check-list-my-suffix-popup',
    template: ''
})
export class CheckListMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private checkListPopupService: CheckListMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.checkListPopupService
                    .open(CheckListMySuffixDialogComponent as Component, params['id']);
            } else {
                this.checkListPopupService
                    .open(CheckListMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
