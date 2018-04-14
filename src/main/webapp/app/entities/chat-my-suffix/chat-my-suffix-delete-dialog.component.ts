import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatMySuffix } from './chat-my-suffix.model';
import { ChatMySuffixPopupService } from './chat-my-suffix-popup.service';
import { ChatMySuffixService } from './chat-my-suffix.service';

@Component({
    selector: 'jhi-chat-my-suffix-delete-dialog',
    templateUrl: './chat-my-suffix-delete-dialog.component.html'
})
export class ChatMySuffixDeleteDialogComponent {

    chat: ChatMySuffix;

    constructor(
        private chatService: ChatMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chatService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chatListModification',
                content: 'Deleted an chat'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chat-my-suffix-delete-popup',
    template: ''
})
export class ChatMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatPopupService: ChatMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chatPopupService
                .open(ChatMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
