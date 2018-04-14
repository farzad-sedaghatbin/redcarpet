import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceMySuffix } from './service-my-suffix.model';
import { ServiceMySuffixService } from './service-my-suffix.service';

@Component({
    selector: 'jhi-service-my-suffix-detail',
    templateUrl: './service-my-suffix-detail.component.html'
})
export class ServiceMySuffixDetailComponent implements OnInit, OnDestroy {

    service: ServiceMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private serviceService: ServiceMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInServices();
    }

    load(id) {
        this.serviceService.find(id)
            .subscribe((serviceResponse: HttpResponse<ServiceMySuffix>) => {
                this.service = serviceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInServices() {
        this.eventSubscriber = this.eventManager.subscribe(
            'serviceListModification',
            (response) => this.load(this.service.id)
        );
    }
}
