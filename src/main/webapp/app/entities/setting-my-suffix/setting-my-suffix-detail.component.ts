import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SettingMySuffix } from './setting-my-suffix.model';
import { SettingMySuffixService } from './setting-my-suffix.service';

@Component({
    selector: 'jhi-setting-my-suffix-detail',
    templateUrl: './setting-my-suffix-detail.component.html'
})
export class SettingMySuffixDetailComponent implements OnInit, OnDestroy {

    setting: SettingMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private settingService: SettingMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSettings();
    }

    load(id) {
        this.settingService.find(id)
            .subscribe((settingResponse: HttpResponse<SettingMySuffix>) => {
                this.setting = settingResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSettings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'settingListModification',
            (response) => this.load(this.setting.id)
        );
    }
}
