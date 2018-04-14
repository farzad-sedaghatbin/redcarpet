import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CheckListMySuffix } from './check-list-my-suffix.model';
import { CheckListMySuffixService } from './check-list-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-check-list-my-suffix',
    templateUrl: './check-list-my-suffix.component.html'
})
export class CheckListMySuffixComponent implements OnInit, OnDestroy {
checkLists: CheckListMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private checkListService: CheckListMySuffixService,
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
            this.checkListService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<CheckListMySuffix[]>) => this.checkLists = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.checkListService.query().subscribe(
            (res: HttpResponse<CheckListMySuffix[]>) => {
                this.checkLists = res.body;
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
        this.registerChangeInCheckLists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CheckListMySuffix) {
        return item.id;
    }
    registerChangeInCheckLists() {
        this.eventSubscriber = this.eventManager.subscribe('checkListListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
