import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MediaMySuffix } from './media-my-suffix.model';
import { MediaMySuffixService } from './media-my-suffix.service';

@Component({
    selector: 'jhi-media-my-suffix-detail',
    templateUrl: './media-my-suffix-detail.component.html'
})
export class MediaMySuffixDetailComponent implements OnInit, OnDestroy {

    media: MediaMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mediaService: MediaMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMedia();
    }

    load(id) {
        this.mediaService.find(id)
            .subscribe((mediaResponse: HttpResponse<MediaMySuffix>) => {
                this.media = mediaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMedia() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mediaListModification',
            (response) => this.load(this.media.id)
        );
    }
}
