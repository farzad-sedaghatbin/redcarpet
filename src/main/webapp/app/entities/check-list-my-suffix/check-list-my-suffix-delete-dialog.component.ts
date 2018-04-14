import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CheckListMySuffix } from './check-list-my-suffix.model';
import { CheckListMySuffixPopupService } from './check-list-my-suffix-popup.service';
import { CheckListMySuffixService } from './check-list-my-suffix.service';

@Component({
    selector: 'jhi-check-list-my-suffix-delete-dialog',
    templateUrl: './check-list-my-suffix-delete-dialog.component.html'
})
export class CheckListMySuffixDeleteDialogComponent {

    checkList: CheckListMySuffix;

    constructor(
        private checkListService: CheckListMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.checkListService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'checkListListModification',
                content: 'Deleted an checkList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-check-list-my-suffix-delete-popup',
    template: ''
})
export class CheckListMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private checkListPopupService: CheckListMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.checkListPopupService
                .open(CheckListMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
