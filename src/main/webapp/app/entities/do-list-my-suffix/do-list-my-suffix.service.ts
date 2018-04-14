import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DoListMySuffix } from './do-list-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DoListMySuffix>;

@Injectable()
export class DoListMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/do-lists';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/do-lists';

    constructor(private http: HttpClient) { }

    create(doList: DoListMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(doList);
        return this.http.post<DoListMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(doList: DoListMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(doList);
        return this.http.put<DoListMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DoListMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DoListMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<DoListMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DoListMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<DoListMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<DoListMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DoListMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DoListMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DoListMySuffix[]>): HttpResponse<DoListMySuffix[]> {
        const jsonResponse: DoListMySuffix[] = res.body;
        const body: DoListMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DoListMySuffix.
     */
    private convertItemFromServer(doList: DoListMySuffix): DoListMySuffix {
        const copy: DoListMySuffix = Object.assign({}, doList);
        return copy;
    }

    /**
     * Convert a DoListMySuffix to a JSON which can be sent to the server.
     */
    private convert(doList: DoListMySuffix): DoListMySuffix {
        const copy: DoListMySuffix = Object.assign({}, doList);
        return copy;
    }
}
