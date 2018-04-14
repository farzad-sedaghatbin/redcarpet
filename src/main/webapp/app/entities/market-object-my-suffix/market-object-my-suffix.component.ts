import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MarketObjectMySuffix } from './market-object-my-suffix.model';
import { MarketObjectMySuffixService } from './market-object-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-market-object-my-suffix',
    templateUrl: './market-object-my-suffix.component.html'
})
export class MarketObjectMySuffixComponent implements OnInit, OnDestroy {
marketObjects: MarketObjectMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private marketObjectService: MarketObjectMySuffixService,
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
            this.marketObjectService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<MarketObjectMySuffix[]>) => this.marketObjects = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.marketObjectService.query().subscribe(
            (res: HttpResponse<MarketObjectMySuffix[]>) => {
                this.marketObjects = res.body;
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
        this.registerChangeInMarketObjects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MarketObjectMySuffix) {
        return item.id;
    }
    registerChangeInMarketObjects() {
        this.eventSubscriber = this.eventManager.subscribe('marketObjectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
