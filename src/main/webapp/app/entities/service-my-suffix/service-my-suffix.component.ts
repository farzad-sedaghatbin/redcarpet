import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ServiceMySuffix } from './service-my-suffix.model';
import { ServiceMySuffixService } from './service-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-service-my-suffix',
    templateUrl: './service-my-suffix.component.html'
})
export class ServiceMySuffixComponent implements OnInit, OnDestroy {
services: ServiceMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private serviceService: ServiceMySuffixService,
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
            this.serviceService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ServiceMySuffix[]>) => this.services = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.serviceService.query().subscribe(
            (res: HttpResponse<ServiceMySuffix[]>) => {
                this.services = res.body;
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
        this.registerChangeInServices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ServiceMySuffix) {
        return item.id;
    }
    registerChangeInServices() {
        this.eventSubscriber = this.eventManager.subscribe('serviceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
