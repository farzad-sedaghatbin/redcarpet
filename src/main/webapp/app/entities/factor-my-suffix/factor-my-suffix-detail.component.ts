import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FactorMySuffix } from './factor-my-suffix.model';
import { FactorMySuffixService } from './factor-my-suffix.service';

@Component({
    selector: 'jhi-factor-my-suffix-detail',
    templateUrl: './factor-my-suffix-detail.component.html'
})
export class FactorMySuffixDetailComponent implements OnInit, OnDestroy {

    factor: FactorMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private factorService: FactorMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFactors();
    }

    load(id) {
        this.factorService.find(id)
            .subscribe((factorResponse: HttpResponse<FactorMySuffix>) => {
                this.factor = factorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFactors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'factorListModification',
            (response) => this.load(this.factor.id)
        );
    }
}
