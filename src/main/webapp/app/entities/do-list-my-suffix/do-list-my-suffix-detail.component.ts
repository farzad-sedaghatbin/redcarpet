import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DoListMySuffix } from './do-list-my-suffix.model';
import { DoListMySuffixService } from './do-list-my-suffix.service';

@Component({
    selector: 'jhi-do-list-my-suffix-detail',
    templateUrl: './do-list-my-suffix-detail.component.html'
})
export class DoListMySuffixDetailComponent implements OnInit, OnDestroy {

    doList: DoListMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private doListService: DoListMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDoLists();
    }

    load(id) {
        this.doListService.find(id)
            .subscribe((doListResponse: HttpResponse<DoListMySuffix>) => {
                this.doList = doListResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDoLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'doListListModification',
            (response) => this.load(this.doList.id)
        );
    }
}
