import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CheckListMySuffix } from './check-list-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CheckListMySuffix>;

@Injectable()
export class CheckListMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/check-lists';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/check-lists';

    constructor(private http: HttpClient) { }

    create(checkList: CheckListMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(checkList);
        return this.http.post<CheckListMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(checkList: CheckListMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(checkList);
        return this.http.put<CheckListMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CheckListMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CheckListMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CheckListMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CheckListMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CheckListMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CheckListMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CheckListMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CheckListMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CheckListMySuffix[]>): HttpResponse<CheckListMySuffix[]> {
        const jsonResponse: CheckListMySuffix[] = res.body;
        const body: CheckListMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CheckListMySuffix.
     */
    private convertItemFromServer(checkList: CheckListMySuffix): CheckListMySuffix {
        const copy: CheckListMySuffix = Object.assign({}, checkList);
        return copy;
    }

    /**
     * Convert a CheckListMySuffix to a JSON which can be sent to the server.
     */
    private convert(checkList: CheckListMySuffix): CheckListMySuffix {
        const copy: CheckListMySuffix = Object.assign({}, checkList);
        return copy;
    }
}
