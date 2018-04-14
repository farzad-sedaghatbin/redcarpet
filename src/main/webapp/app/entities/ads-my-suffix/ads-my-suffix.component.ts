import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AdsMySuffix } from './ads-my-suffix.model';
import { AdsMySuffixService } from './ads-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-ads-my-suffix',
    templateUrl: './ads-my-suffix.component.html'
})
export class AdsMySuffixComponent implements OnInit, OnDestroy {
ads: AdsMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private adsService: AdsMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.adsService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<AdsMySuffix[]>) => this.ads = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.adsService.query().subscribe(
            (res: HttpResponse<AdsMySuffix[]>) => {
                this.ads = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AdsMySuffix) {
        return item.id;
    }
    registerChangeInAds() {
        this.eventSubscriber = this.eventManager.subscribe('adsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
