import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MerchantMySuffix } from './merchant-my-suffix.model';
import { MerchantMySuffixService } from './merchant-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-merchant-my-suffix',
    templateUrl: './merchant-my-suffix.component.html'
})
export class MerchantMySuffixComponent implements OnInit, OnDestroy {
merchants: MerchantMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private merchantService: MerchantMySuffixService,
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
            this.merchantService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<MerchantMySuffix[]>) => this.merchants = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.merchantService.query().subscribe(
            (res: HttpResponse<MerchantMySuffix[]>) => {
                this.merchants = res.body;
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
        this.registerChangeInMerchants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MerchantMySuffix) {
        return item.id;
    }
    registerChangeInMerchants() {
        this.eventSubscriber = this.eventManager.subscribe('merchantListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
