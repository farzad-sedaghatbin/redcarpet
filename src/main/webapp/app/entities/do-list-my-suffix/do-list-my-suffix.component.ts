import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DoListMySuffix } from './do-list-my-suffix.model';
import { DoListMySuffixService } from './do-list-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-do-list-my-suffix',
    templateUrl: './do-list-my-suffix.component.html'
})
export class DoListMySuffixComponent implements OnInit, OnDestroy {
doLists: DoListMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private doListService: DoListMySuffixService,
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
            this.doListService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<DoListMySuffix[]>) => this.doLists = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.doListService.query().subscribe(
            (res: HttpResponse<DoListMySuffix[]>) => {
                this.doLists = res.body;
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
        this.registerChangeInDoLists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DoListMySuffix) {
        return item.id;
    }
    registerChangeInDoLists() {
        this.eventSubscriber = this.eventManager.subscribe('doListListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
