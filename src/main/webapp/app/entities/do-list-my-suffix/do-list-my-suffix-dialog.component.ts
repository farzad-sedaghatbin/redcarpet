import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DoListMySuffix } from './do-list-my-suffix.model';
import { DoListMySuffixPopupService } from './do-list-my-suffix-popup.service';
import { DoListMySuffixService } from './do-list-my-suffix.service';
import { CheckListMySuffix, CheckListMySuffixService } from '../check-list-my-suffix';

@Component({
    selector: 'jhi-do-list-my-suffix-dialog',
    templateUrl: './do-list-my-suffix-dialog.component.html'
})
export class DoListMySuffixDialogComponent implements OnInit {

    doList: DoListMySuffix;
    isSaving: boolean;

    checklists: CheckListMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private doListService: DoListMySuffixService,
        private checkListService: CheckListMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.checkListService.query()
            .subscribe((res: HttpResponse<CheckListMySuffix[]>) => { this.checklists = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.doList.id !== undefined) {
            this.subscribeToSaveResponse(
                this.doListService.update(this.doList));
        } else {
            this.subscribeToSaveResponse(
                this.doListService.create(this.doList));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DoListMySuffix>>) {
        result.subscribe((res: HttpResponse<DoListMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DoListMySuffix) {
        this.eventManager.broadcast({ name: 'doListListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCheckListById(index: number, item: CheckListMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-do-list-my-suffix-popup',
    template: ''
})
export class DoListMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private doListPopupService: DoListMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.doListPopupService
                    .open(DoListMySuffixDialogComponent as Component, params['id']);
            } else {
                this.doListPopupService
                    .open(DoListMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
