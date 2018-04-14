import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MerchantMySuffix } from './merchant-my-suffix.model';
import { MerchantMySuffixPopupService } from './merchant-my-suffix-popup.service';
import { MerchantMySuffixService } from './merchant-my-suffix.service';
import { MediaMySuffix, MediaMySuffixService } from '../media-my-suffix';
import { RatingMySuffix, RatingMySuffixService } from '../rating-my-suffix';
import { CommentMySuffix, CommentMySuffixService } from '../comment-my-suffix';

@Component({
    selector: 'jhi-merchant-my-suffix-dialog',
    templateUrl: './merchant-my-suffix-dialog.component.html'
})
export class MerchantMySuffixDialogComponent implements OnInit {

    merchant: MerchantMySuffix;
    isSaving: boolean;

    logos: MediaMySuffix[];

    ratings: RatingMySuffix[];

    comments: CommentMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private merchantService: MerchantMySuffixService,
        private mediaService: MediaMySuffixService,
        private ratingService: RatingMySuffixService,
        private commentService: CommentMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.mediaService
            .query({filter: 'merchant-is-null'})
            .subscribe((res: HttpResponse<MediaMySuffix[]>) => {
                if (!this.merchant.logoId) {
                    this.logos = res.body;
                } else {
                    this.mediaService
                        .find(this.merchant.logoId)
                        .subscribe((subRes: HttpResponse<MediaMySuffix>) => {
                            this.logos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.ratingService.query()
            .subscribe((res: HttpResponse<RatingMySuffix[]>) => { this.ratings = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.commentService.query()
            .subscribe((res: HttpResponse<CommentMySuffix[]>) => { this.comments = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.merchant.id !== undefined) {
            this.subscribeToSaveResponse(
                this.merchantService.update(this.merchant));
        } else {
            this.subscribeToSaveResponse(
                this.merchantService.create(this.merchant));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MerchantMySuffix>>) {
        result.subscribe((res: HttpResponse<MerchantMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MerchantMySuffix) {
        this.eventManager.broadcast({ name: 'merchantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMediaById(index: number, item: MediaMySuffix) {
        return item.id;
    }

    trackRatingById(index: number, item: RatingMySuffix) {
        return item.id;
    }

    trackCommentById(index: number, item: CommentMySuffix) {
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
    selector: 'jhi-merchant-my-suffix-popup',
    template: ''
})
export class MerchantMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private merchantPopupService: MerchantMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.merchantPopupService
                    .open(MerchantMySuffixDialogComponent as Component, params['id']);
            } else {
                this.merchantPopupService
                    .open(MerchantMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
