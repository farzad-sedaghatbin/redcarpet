import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RatingMySuffix } from './rating-my-suffix.model';
import { RatingMySuffixPopupService } from './rating-my-suffix-popup.service';
import { RatingMySuffixService } from './rating-my-suffix.service';
import { MerchantMySuffix, MerchantMySuffixService } from '../merchant-my-suffix';

@Component({
    selector: 'jhi-rating-my-suffix-dialog',
    templateUrl: './rating-my-suffix-dialog.component.html'
})
export class RatingMySuffixDialogComponent implements OnInit {

    rating: RatingMySuffix;
    isSaving: boolean;

    merchants: MerchantMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ratingService: RatingMySuffixService,
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
        if (this.rating.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ratingService.update(this.rating));
        } else {
            this.subscribeToSaveResponse(
                this.ratingService.create(this.rating));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RatingMySuffix>>) {
        result.subscribe((res: HttpResponse<RatingMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RatingMySuffix) {
        this.eventManager.broadcast({ name: 'ratingListModification', content: 'OK'});
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-rating-my-suffix-popup',
    template: ''
})
export class RatingMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ratingPopupService: RatingMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ratingPopupService
                    .open(RatingMySuffixDialogComponent as Component, params['id']);
            } else {
                this.ratingPopupService
                    .open(RatingMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
