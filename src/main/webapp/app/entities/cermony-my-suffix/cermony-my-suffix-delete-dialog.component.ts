import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CermonyMySuffix } from './cermony-my-suffix.model';
import { CermonyMySuffixPopupService } from './cermony-my-suffix-popup.service';
import { CermonyMySuffixService } from './cermony-my-suffix.service';

@Component({
    selector: 'jhi-cermony-my-suffix-delete-dialog',
    templateUrl: './cermony-my-suffix-delete-dialog.component.html'
})
export class CermonyMySuffixDeleteDialogComponent {

    cermony: CermonyMySuffix;

    constructor(
        private cermonyService: CermonyMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cermonyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cermonyListModification',
                content: 'Deleted an cermony'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cermony-my-suffix-delete-popup',
    template: ''
})
export class CermonyMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cermonyPopupService: CermonyMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cermonyPopupService
                .open(CermonyMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
