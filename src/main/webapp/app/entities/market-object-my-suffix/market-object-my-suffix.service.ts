import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MarketObjectMySuffix } from './market-object-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MarketObjectMySuffix>;

@Injectable()
export class MarketObjectMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/market-objects';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/market-objects';

    constructor(private http: HttpClient) { }

    create(marketObject: MarketObjectMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(marketObject);
        return this.http.post<MarketObjectMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(marketObject: MarketObjectMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(marketObject);
        return this.http.put<MarketObjectMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MarketObjectMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MarketObjectMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MarketObjectMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MarketObjectMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<MarketObjectMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MarketObjectMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MarketObjectMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MarketObjectMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MarketObjectMySuffix[]>): HttpResponse<MarketObjectMySuffix[]> {
        const jsonResponse: MarketObjectMySuffix[] = res.body;
        const body: MarketObjectMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MarketObjectMySuffix.
     */
    private convertItemFromServer(marketObject: MarketObjectMySuffix): MarketObjectMySuffix {
        const copy: MarketObjectMySuffix = Object.assign({}, marketObject);
        return copy;
    }

    /**
     * Convert a MarketObjectMySuffix to a JSON which can be sent to the server.
     */
    private convert(marketObject: MarketObjectMySuffix): MarketObjectMySuffix {
        const copy: MarketObjectMySuffix = Object.assign({}, marketObject);
        return copy;
    }
}
