import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatMySuffix } from './chat-my-suffix.model';
import { ChatMySuffixPopupService } from './chat-my-suffix-popup.service';
import { ChatMySuffixService } from './chat-my-suffix.service';

@Component({
    selector: 'jhi-chat-my-suffix-dialog',
    templateUrl: './chat-my-suffix-dialog.component.html'
})
export class ChatMySuffixDialogComponent implements OnInit {

    chat: ChatMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private chatService: ChatMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.chat.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chatService.update(this.chat));
        } else {
            this.subscribeToSaveResponse(
                this.chatService.create(this.chat));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChatMySuffix>>) {
        result.subscribe((res: HttpResponse<ChatMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChatMySuffix) {
        this.eventManager.broadcast({ name: 'chatListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-chat-my-suffix-popup',
    template: ''
})
export class ChatMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatPopupService: ChatMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatPopupService
                    .open(ChatMySuffixDialogComponent as Component, params['id']);
            } else {
                this.chatPopupService
                    .open(ChatMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
