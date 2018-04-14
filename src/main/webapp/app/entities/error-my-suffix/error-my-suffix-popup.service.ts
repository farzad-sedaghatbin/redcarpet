import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ErrorMySuffix } from './error-my-suffix.model';
import { ErrorMySuffixService } from './error-my-suffix.service';

@Injectable()
export class ErrorMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private errorService: ErrorMySuffixService

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
                this.errorService.find(id)
                    .subscribe((errorResponse: HttpResponse<ErrorMySuffix>) => {
                        const error: ErrorMySuffix = errorResponse.body;
                        error.moment = this.datePipe
                            .transform(error.moment, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.errorModalRef(component, error);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.errorModalRef(component, new ErrorMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    errorModalRef(component: Component, error: ErrorMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.error = error;
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
