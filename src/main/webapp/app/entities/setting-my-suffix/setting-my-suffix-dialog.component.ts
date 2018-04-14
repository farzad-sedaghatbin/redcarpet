import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SettingMySuffix } from './setting-my-suffix.model';
import { SettingMySuffixPopupService } from './setting-my-suffix-popup.service';
import { SettingMySuffixService } from './setting-my-suffix.service';

@Component({
    selector: 'jhi-setting-my-suffix-dialog',
    templateUrl: './setting-my-suffix-dialog.component.html'
})
export class SettingMySuffixDialogComponent implements OnInit {

    setting: SettingMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private settingService: SettingMySuffixService,
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
        if (this.setting.id !== undefined) {
            this.subscribeToSaveResponse(
                this.settingService.update(this.setting));
        } else {
            this.subscribeToSaveResponse(
                this.settingService.create(this.setting));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SettingMySuffix>>) {
        result.subscribe((res: HttpResponse<SettingMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SettingMySuffix) {
        this.eventManager.broadcast({ name: 'settingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-setting-my-suffix-popup',
    template: ''
})
export class SettingMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private settingPopupService: SettingMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.settingPopupService
                    .open(SettingMySuffixDialogComponent as Component, params['id']);
            } else {
                this.settingPopupService
                    .open(SettingMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
