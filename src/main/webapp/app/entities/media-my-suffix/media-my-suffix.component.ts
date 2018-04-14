import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MediaMySuffix } from './media-my-suffix.model';
import { MediaMySuffixService } from './media-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-media-my-suffix',
    templateUrl: './media-my-suffix.component.html'
})
export class MediaMySuffixComponent implements OnInit, OnDestroy {
media: MediaMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private mediaService: MediaMySuffixService,
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
            this.mediaService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<MediaMySuffix[]>) => this.media = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.mediaService.query().subscribe(
            (res: HttpResponse<MediaMySuffix[]>) => {
                this.media = res.body;
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
        this.registerChangeInMedia();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MediaMySuffix) {
        return item.id;
    }
    registerChangeInMedia() {
        this.eventSubscriber = this.eventManager.subscribe('mediaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
