import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AdsMySuffix } from './ads-my-suffix.model';
import { AdsMySuffixPopupService } from './ads-my-suffix-popup.service';
import { AdsMySuffixService } from './ads-my-suffix.service';
import { MerchantMySuffix, MerchantMySuffixService } from '../merchant-my-suffix';

@Component({
    selector: 'jhi-ads-my-suffix-dialog',
    templateUrl: './ads-my-suffix-dialog.component.html'
})
export class AdsMySuffixDialogComponent implements OnInit {

    ads: AdsMySuffix;
    isSaving: boolean;

    merchants: MerchantMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private adsService: AdsMySuffixService,
        private merchantService: MerchantMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.merchantService.query()
            .subscribe((res: HttpResponse<MerchantMySuffix[]>) => { this.merchants = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ads.id !== undefined) {
            this.subscribeToSaveResponse(
                this.adsService.update(this.ads));
        } else {
            this.subscribeToSaveResponse(
                this.adsService.create(this.ads));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AdsMySuffix>>) {
        result.subscribe((res: HttpResponse<AdsMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AdsMySuffix) {
        this.eventManager.broadcast({ name: 'adsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMerchantById(index: number, item: MerchantMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ads-my-suffix-popup',
    template: ''
})
export class AdsMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private adsPopupService: AdsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.adsPopupService
                    .open(AdsMySuffixDialogComponent as Component, params['id']);
            } else {
                this.adsPopupService
                    .open(AdsMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
