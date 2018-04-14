import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CermonyMySuffix } from './cermony-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CermonyMySuffix>;

@Injectable()
export class CermonyMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/cermonies';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/cermonies';

    constructor(private http: HttpClient) { }

    create(cermony: CermonyMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cermony);
        return this.http.post<CermonyMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cermony: CermonyMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cermony);
        return this.http.put<CermonyMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CermonyMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CermonyMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CermonyMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CermonyMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CermonyMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CermonyMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CermonyMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CermonyMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CermonyMySuffix[]>): HttpResponse<CermonyMySuffix[]> {
        const jsonResponse: CermonyMySuffix[] = res.body;
        const body: CermonyMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CermonyMySuffix.
     */
    private convertItemFromServer(cermony: CermonyMySuffix): CermonyMySuffix {
        const copy: CermonyMySuffix = Object.assign({}, cermony);
        return copy;
    }

    /**
     * Convert a CermonyMySuffix to a JSON which can be sent to the server.
     */
    private convert(cermony: CermonyMySuffix): CermonyMySuffix {
        const copy: CermonyMySuffix = Object.assign({}, cermony);
        return copy;
    }
}
