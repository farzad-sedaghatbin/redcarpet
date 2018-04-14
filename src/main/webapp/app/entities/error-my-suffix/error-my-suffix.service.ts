import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ErrorMySuffix } from './error-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ErrorMySuffix>;

@Injectable()
export class ErrorMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/errors';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/errors';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(error: ErrorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(error);
        return this.http.post<ErrorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(error: ErrorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(error);
        return this.http.put<ErrorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ErrorMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ErrorMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ErrorMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ErrorMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ErrorMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ErrorMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ErrorMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ErrorMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ErrorMySuffix[]>): HttpResponse<ErrorMySuffix[]> {
        const jsonResponse: ErrorMySuffix[] = res.body;
        const body: ErrorMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ErrorMySuffix.
     */
    private convertItemFromServer(error: ErrorMySuffix): ErrorMySuffix {
        const copy: ErrorMySuffix = Object.assign({}, error);
        copy.moment = this.dateUtils
            .convertDateTimeFromServer(error.moment);
        return copy;
    }

    /**
     * Convert a ErrorMySuffix to a JSON which can be sent to the server.
     */
    private convert(error: ErrorMySuffix): ErrorMySuffix {
        const copy: ErrorMySuffix = Object.assign({}, error);

        copy.moment = this.dateUtils.toDate(error.moment);
        return copy;
    }
}
