import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CermonyMySuffix } from './cermony-my-suffix.model';
import { CermonyMySuffixService } from './cermony-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cermony-my-suffix',
    templateUrl: './cermony-my-suffix.component.html'
})
export class CermonyMySuffixComponent implements OnInit, OnDestroy {
cermonies: CermonyMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private cermonyService: CermonyMySuffixService,
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
            this.cermonyService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<CermonyMySuffix[]>) => this.cermonies = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.cermonyService.query().subscribe(
            (res: HttpResponse<CermonyMySuffix[]>) => {
                this.cermonies = res.body;
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
        this.registerChangeInCermonies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CermonyMySuffix) {
        return item.id;
    }
    registerChangeInCermonies() {
        this.eventSubscriber = this.eventManager.subscribe('cermonyListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
