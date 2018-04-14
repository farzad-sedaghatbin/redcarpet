import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ChatMySuffix } from './chat-my-suffix.model';
import { ChatMySuffixService } from './chat-my-suffix.service';

@Component({
    selector: 'jhi-chat-my-suffix-detail',
    templateUrl: './chat-my-suffix-detail.component.html'
})
export class ChatMySuffixDetailComponent implements OnInit, OnDestroy {

    chat: ChatMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chatService: ChatMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChats();
    }

    load(id) {
        this.chatService.find(id)
            .subscribe((chatResponse: HttpResponse<ChatMySuffix>) => {
                this.chat = chatResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChats() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatListModification',
            (response) => this.load(this.chat.id)
        );
    }
}
