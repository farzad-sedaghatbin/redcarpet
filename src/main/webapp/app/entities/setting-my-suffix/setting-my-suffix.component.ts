import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SettingMySuffix } from './setting-my-suffix.model';
import { SettingMySuffixService } from './setting-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-setting-my-suffix',
    templateUrl: './setting-my-suffix.component.html'
})
export class SettingMySuffixComponent implements OnInit, OnDestroy {
settings: SettingMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private settingService: SettingMySuffixService,
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
            this.settingService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<SettingMySuffix[]>) => this.settings = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.settingService.query().subscribe(
            (res: HttpResponse<SettingMySuffix[]>) => {
                this.settings = res.body;
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
        this.registerChangeInSettings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SettingMySuffix) {
        return item.id;
    }
    registerChangeInSettings() {
        this.eventSubscriber = this.eventManager.subscribe('settingListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
