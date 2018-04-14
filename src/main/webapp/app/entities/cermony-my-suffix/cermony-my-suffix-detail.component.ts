import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CermonyMySuffix } from './cermony-my-suffix.model';
import { CermonyMySuffixService } from './cermony-my-suffix.service';

@Component({
    selector: 'jhi-cermony-my-suffix-detail',
    templateUrl: './cermony-my-suffix-detail.component.html'
})
export class CermonyMySuffixDetailComponent implements OnInit, OnDestroy {

    cermony: CermonyMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cermonyService: CermonyMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCermonies();
    }

    load(id) {
        this.cermonyService.find(id)
            .subscribe((cermonyResponse: HttpResponse<CermonyMySuffix>) => {
                this.cermony = cermonyResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCermonies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cermonyListModification',
            (response) => this.load(this.cermony.id)
        );
    }
}
