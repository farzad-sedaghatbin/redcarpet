import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ErrorMySuffix } from './error-my-suffix.model';
import { ErrorMySuffixService } from './error-my-suffix.service';

@Component({
    selector: 'jhi-error-my-suffix-detail',
    templateUrl: './error-my-suffix-detail.component.html'
})
export class ErrorMySuffixDetailComponent implements OnInit, OnDestroy {

    error: ErrorMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private errorService: ErrorMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInErrors();
    }

    load(id) {
        this.errorService.find(id)
            .subscribe((errorResponse: HttpResponse<ErrorMySuffix>) => {
                this.error = errorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInErrors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'errorListModification',
            (response) => this.load(this.error.id)
        );
    }
}
