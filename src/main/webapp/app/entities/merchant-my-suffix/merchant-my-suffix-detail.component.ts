import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MerchantMySuffix } from './merchant-my-suffix.model';
import { MerchantMySuffixService } from './merchant-my-suffix.service';

@Component({
    selector: 'jhi-merchant-my-suffix-detail',
    templateUrl: './merchant-my-suffix-detail.component.html'
})
export class MerchantMySuffixDetailComponent implements OnInit, OnDestroy {

    merchant: MerchantMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private merchantService: MerchantMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMerchants();
    }

    load(id) {
        this.merchantService.find(id)
            .subscribe((merchantResponse: HttpResponse<MerchantMySuffix>) => {
                this.merchant = merchantResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMerchants() {
        this.eventSubscriber = this.eventManager.subscribe(
            'merchantListModification',
            (response) => this.load(this.merchant.id)
        );
    }
}
