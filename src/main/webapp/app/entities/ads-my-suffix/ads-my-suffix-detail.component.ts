import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AdsMySuffix } from './ads-my-suffix.model';
import { AdsMySuffixService } from './ads-my-suffix.service';

@Component({
    selector: 'jhi-ads-my-suffix-detail',
    templateUrl: './ads-my-suffix-detail.component.html'
})
export class AdsMySuffixDetailComponent implements OnInit, OnDestroy {

    ads: AdsMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private adsService: AdsMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAds();
    }

    load(id) {
        this.adsService.find(id)
            .subscribe((adsResponse: HttpResponse<AdsMySuffix>) => {
                this.ads = adsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'adsListModification',
            (response) => this.load(this.ads.id)
        );
    }
}
