import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FactorMySuffix } from './factor-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FactorMySuffix>;

@Injectable()
export class FactorMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/factors';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/factors';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(factor: FactorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(factor);
        return this.http.post<FactorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(factor: FactorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(factor);
        return this.http.put<FactorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FactorMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FactorMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<FactorMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FactorMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<FactorMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<FactorMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FactorMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FactorMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FactorMySuffix[]>): HttpResponse<FactorMySuffix[]> {
        const jsonResponse: FactorMySuffix[] = res.body;
        const body: FactorMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FactorMySuffix.
     */
    private convertItemFromServer(factor: FactorMySuffix): FactorMySuffix {
        const copy: FactorMySuffix = Object.assign({}, factor);
        copy.eventTime = this.dateUtils
            .convertDateTimeFromServer(factor.eventTime);
        return copy;
    }

    /**
     * Convert a FactorMySuffix to a JSON which can be sent to the server.
     */
    private convert(factor: FactorMySuffix): FactorMySuffix {
        const copy: FactorMySuffix = Object.assign({}, factor);

        copy.eventTime = this.dateUtils.toDate(factor.eventTime);
        return copy;
    }
}
