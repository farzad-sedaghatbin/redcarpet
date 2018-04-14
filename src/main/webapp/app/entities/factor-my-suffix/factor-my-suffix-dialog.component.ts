import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FactorMySuffix } from './factor-my-suffix.model';
import { FactorMySuffixPopupService } from './factor-my-suffix-popup.service';
import { FactorMySuffixService } from './factor-my-suffix.service';
import { MarketObjectMySuffix, MarketObjectMySuffixService } from '../market-object-my-suffix';

@Component({
    selector: 'jhi-factor-my-suffix-dialog',
    templateUrl: './factor-my-suffix-dialog.component.html'
})
export class FactorMySuffixDialogComponent implements OnInit {

    factor: FactorMySuffix;
    isSaving: boolean;

    marketobjects: MarketObjectMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private factorService: FactorMySuffixService,
        private marketObjectService: MarketObjectMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.marketObjectService.query()
            .subscribe((res: HttpResponse<MarketObjectMySuffix[]>) => { this.marketobjects = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.factor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.factorService.update(this.factor));
        } else {
            this.subscribeToSaveResponse(
                this.factorService.create(this.factor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FactorMySuffix>>) {
        result.subscribe((res: HttpResponse<FactorMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FactorMySuffix) {
        this.eventManager.broadcast({ name: 'factorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMarketObjectById(index: number, item: MarketObjectMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-factor-my-suffix-popup',
    template: ''
})
export class FactorMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private factorPopupService: FactorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.factorPopupService
                    .open(FactorMySuffixDialogComponent as Component, params['id']);
            } else {
                this.factorPopupService
                    .open(FactorMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
