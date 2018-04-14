import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JobHistory } from './job-history.model';
import { JobHistoryPopupService } from './job-history-popup.service';
import { JobHistoryService } from './job-history.service';

@Component({
    selector: 'jhi-job-history-dialog',
    templateUrl: './job-history-dialog.component.html'
})
export class JobHistoryDialogComponent implements OnInit {

    jobHistory: JobHistory;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jobHistoryService: JobHistoryService,
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
        if (this.jobHistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jobHistoryService.update(this.jobHistory));
        } else {
            this.subscribeToSaveResponse(
                this.jobHistoryService.create(this.jobHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JobHistory>>) {
        result.subscribe((res: HttpResponse<JobHistory>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JobHistory) {
        this.eventManager.broadcast({ name: 'jobHistoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-job-history-popup',
    template: ''
})
export class JobHistoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobHistoryPopupService: JobHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jobHistoryPopupService
                    .open(JobHistoryDialogComponent as Component, params['id']);
            } else {
                this.jobHistoryPopupService
                    .open(JobHistoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
