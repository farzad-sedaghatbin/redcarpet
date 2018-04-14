import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DoListMySuffix } from './do-list-my-suffix.model';
import { DoListMySuffixPopupService } from './do-list-my-suffix-popup.service';
import { DoListMySuffixService } from './do-list-my-suffix.service';

@Component({
    selector: 'jhi-do-list-my-suffix-delete-dialog',
    templateUrl: './do-list-my-suffix-delete-dialog.component.html'
})
export class DoListMySuffixDeleteDialogComponent {

    doList: DoListMySuffix;

    constructor(
        private doListService: DoListMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.doListService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'doListListModification',
                content: 'Deleted an doList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-do-list-my-suffix-delete-popup',
    template: ''
})
export class DoListMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private doListPopupService: DoListMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.doListPopupService
                .open(DoListMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
