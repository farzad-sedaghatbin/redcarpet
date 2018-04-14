import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SettingMySuffix } from './setting-my-suffix.model';
import { SettingMySuffixPopupService } from './setting-my-suffix-popup.service';
import { SettingMySuffixService } from './setting-my-suffix.service';

@Component({
    selector: 'jhi-setting-my-suffix-delete-dialog',
    templateUrl: './setting-my-suffix-delete-dialog.component.html'
})
export class SettingMySuffixDeleteDialogComponent {

    setting: SettingMySuffix;

    constructor(
        private settingService: SettingMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.settingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'settingListModification',
                content: 'Deleted an setting'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-setting-my-suffix-delete-popup',
    template: ''
})
export class SettingMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private settingPopupService: SettingMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.settingPopupService
                .open(SettingMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
