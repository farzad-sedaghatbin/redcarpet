import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ChatMySuffix } from './chat-my-suffix.model';
import { ChatMySuffixService } from './chat-my-suffix.service';

@Injectable()
export class ChatMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private chatService: ChatMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.chatService.find(id)
                    .subscribe((chatResponse: HttpResponse<ChatMySuffix>) => {
                        const chat: ChatMySuffix = chatResponse.body;
                        chat.chatTime = this.datePipe
                            .transform(chat.chatTime, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.chatModalRef(component, chat);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.chatModalRef(component, new ChatMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    chatModalRef(component: Component, chat: ChatMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.chat = chat;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
