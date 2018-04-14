import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AdsMySuffix } from './ads-my-suffix.model';
import { AdsMySuffixService } from './ads-my-suffix.service';

@Injectable()
export class AdsMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private adsService: AdsMySuffixService

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
                this.adsService.find(id)
                    .subscribe((adsResponse: HttpResponse<AdsMySuffix>) => {
                        const ads: AdsMySuffix = adsResponse.body;
                        ads.startDate = this.datePipe
                            .transform(ads.startDate, 'yyyy-MM-ddTHH:mm:ss');
                        ads.endDate = this.datePipe
                            .transform(ads.endDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.adsModalRef(component, ads);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.adsModalRef(component, new AdsMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    adsModalRef(component: Component, ads: AdsMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ads = ads;
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
