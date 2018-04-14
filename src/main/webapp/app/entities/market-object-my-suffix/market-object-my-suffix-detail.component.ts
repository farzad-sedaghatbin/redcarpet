import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MarketObjectMySuffix } from './market-object-my-suffix.model';
import { MarketObjectMySuffixService } from './market-object-my-suffix.service';

@Component({
    selector: 'jhi-market-object-my-suffix-detail',
    templateUrl: './market-object-my-suffix-detail.component.html'
})
export class MarketObjectMySuffixDetailComponent implements OnInit, OnDestroy {

    marketObject: MarketObjectMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private marketObjectService: MarketObjectMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMarketObjects();
    }

    load(id) {
        this.marketObjectService.find(id)
            .subscribe((marketObjectResponse: HttpResponse<MarketObjectMySuffix>) => {
                this.marketObject = marketObjectResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMarketObjects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'marketObjectListModification',
            (response) => this.load(this.marketObject.id)
        );
    }
}
