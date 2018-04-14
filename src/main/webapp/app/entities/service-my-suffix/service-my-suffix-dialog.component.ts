import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ServiceMySuffix } from './service-my-suffix.model';
import { ServiceMySuffixPopupService } from './service-my-suffix-popup.service';
import { ServiceMySuffixService } from './service-my-suffix.service';
import { MerchantMySuffix, MerchantMySuffixService } from '../merchant-my-suffix';

@Component({
    selector: 'jhi-service-my-suffix-dialog',
    templateUrl: './service-my-suffix-dialog.component.html'
})
export class ServiceMySuffixDialogComponent implements OnInit {

    service: ServiceMySuffix;
    isSaving: boolean;

    merchants: MerchantMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private serviceService: ServiceMySuffixService,
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
        if (this.service.id !== undefined) {
            this.subscribeToSaveResponse(
                this.serviceService.update(this.service));
        } else {
            this.subscribeToSaveResponse(
                this.serviceService.create(this.service));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ServiceMySuffix>>) {
        result.subscribe((res: HttpResponse<ServiceMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ServiceMySuffix) {
        this.eventManager.broadcast({ name: 'serviceListModification', content: 'OK'});
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
    selector: 'jhi-service-my-suffix-popup',
    template: ''
})
export class ServiceMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private servicePopupService: ServiceMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.servicePopupService
                    .open(ServiceMySuffixDialogComponent as Component, params['id']);
            } else {
                this.servicePopupService
                    .open(ServiceMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
