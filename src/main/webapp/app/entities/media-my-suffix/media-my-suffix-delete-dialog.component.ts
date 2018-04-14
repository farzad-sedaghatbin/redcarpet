import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MediaMySuffix } from './media-my-suffix.model';
import { MediaMySuffixPopupService } from './media-my-suffix-popup.service';
import { MediaMySuffixService } from './media-my-suffix.service';

@Component({
    selector: 'jhi-media-my-suffix-delete-dialog',
    templateUrl: './media-my-suffix-delete-dialog.component.html'
})
export class MediaMySuffixDeleteDialogComponent {

    media: MediaMySuffix;

    constructor(
        private mediaService: MediaMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mediaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mediaListModification',
                content: 'Deleted an media'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-media-my-suffix-delete-popup',
    template: ''
})
export class MediaMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mediaPopupService: MediaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mediaPopupService
                .open(MediaMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
