import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceMySuffix } from './service-my-suffix.model';
import { ServiceMySuffixPopupService } from './service-my-suffix-popup.service';
import { ServiceMySuffixService } from './service-my-suffix.service';

@Component({
    selector: 'jhi-service-my-suffix-delete-dialog',
    templateUrl: './service-my-suffix-delete-dialog.component.html'
})
export class ServiceMySuffixDeleteDialogComponent {

    service: ServiceMySuffix;

    constructor(
        private serviceService: ServiceMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.serviceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'serviceListModification',
                content: 'Deleted an service'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-service-my-suffix-delete-popup',
    template: ''
})
export class ServiceMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private servicePopupService: ServiceMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.servicePopupService
                .open(ServiceMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
