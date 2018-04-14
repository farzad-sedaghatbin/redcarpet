import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FactorMySuffix } from './factor-my-suffix.model';
import { FactorMySuffixService } from './factor-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-factor-my-suffix',
    templateUrl: './factor-my-suffix.component.html'
})
export class FactorMySuffixComponent implements OnInit, OnDestroy {
factors: FactorMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private factorService: FactorMySuffixService,
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
            this.factorService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<FactorMySuffix[]>) => this.factors = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.factorService.query().subscribe(
            (res: HttpResponse<FactorMySuffix[]>) => {
                this.factors = res.body;
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
        this.registerChangeInFactors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FactorMySuffix) {
        return item.id;
    }
    registerChangeInFactors() {
        this.eventSubscriber = this.eventManager.subscribe('factorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
