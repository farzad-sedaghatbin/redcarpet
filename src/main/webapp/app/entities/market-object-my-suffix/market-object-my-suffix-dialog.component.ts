import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MarketObjectMySuffix } from './market-object-my-suffix.model';
import { MarketObjectMySuffixPopupService } from './market-object-my-suffix-popup.service';
import { MarketObjectMySuffixService } from './market-object-my-suffix.service';

@Component({
    selector: 'jhi-market-object-my-suffix-dialog',
    templateUrl: './market-object-my-suffix-dialog.component.html'
})
export class MarketObjectMySuffixDialogComponent implements OnInit {

    marketObject: MarketObjectMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private marketObjectService: MarketObjectMySuffixService,
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
        if (this.marketObject.id !== undefined) {
            this.subscribeToSaveResponse(
                this.marketObjectService.update(this.marketObject));
        } else {
            this.subscribeToSaveResponse(
                this.marketObjectService.create(this.marketObject));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MarketObjectMySuffix>>) {
        result.subscribe((res: HttpResponse<MarketObjectMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MarketObjectMySuffix) {
        this.eventManager.broadcast({ name: 'marketObjectListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-market-object-my-suffix-popup',
    template: ''
})
export class MarketObjectMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private marketObjectPopupService: MarketObjectMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.marketObjectPopupService
                    .open(MarketObjectMySuffixDialogComponent as Component, params['id']);
            } else {
                this.marketObjectPopupService
                    .open(MarketObjectMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
