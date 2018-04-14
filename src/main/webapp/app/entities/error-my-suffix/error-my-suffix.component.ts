import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ErrorMySuffix } from './error-my-suffix.model';
import { ErrorMySuffixService } from './error-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-error-my-suffix',
    templateUrl: './error-my-suffix.component.html'
})
export class ErrorMySuffixComponent implements OnInit, OnDestroy {
errors: ErrorMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private errorService: ErrorMySuffixService,
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
            this.errorService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ErrorMySuffix[]>) => this.errors = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.errorService.query().subscribe(
            (res: HttpResponse<ErrorMySuffix[]>) => {
                this.errors = res.body;
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
        this.registerChangeInErrors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ErrorMySuffix) {
        return item.id;
    }
    registerChangeInErrors() {
        this.eventSubscriber = this.eventManager.subscribe('errorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
