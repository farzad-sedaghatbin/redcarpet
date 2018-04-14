import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CheckListMySuffix } from './check-list-my-suffix.model';
import { CheckListMySuffixService } from './check-list-my-suffix.service';

@Component({
    selector: 'jhi-check-list-my-suffix-detail',
    templateUrl: './check-list-my-suffix-detail.component.html'
})
export class CheckListMySuffixDetailComponent implements OnInit, OnDestroy {

    checkList: CheckListMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private checkListService: CheckListMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCheckLists();
    }

    load(id) {
        this.checkListService.find(id)
            .subscribe((checkListResponse: HttpResponse<CheckListMySuffix>) => {
                this.checkList = checkListResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCheckLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'checkListListModification',
            (response) => this.load(this.checkList.id)
        );
    }
}
