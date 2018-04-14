import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-employee',
    templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit, OnDestroy {
employees: Employee[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private employeeService: EmployeeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.employeeService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<Employee[]>) => this.employees = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.employeeService.query().subscribe(
            (res: HttpResponse<Employee[]>) => {
                this.employees = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmployees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Employee) {
        return item.id;
    }
    registerChangeInEmployees() {
        this.eventSubscriber = this.eventManager.subscribe('employeeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
