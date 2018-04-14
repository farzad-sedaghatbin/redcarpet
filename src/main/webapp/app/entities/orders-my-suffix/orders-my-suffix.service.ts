import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrdersMySuffix } from './orders-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrdersMySuffix>;

@Injectable()
export class OrdersMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/orders';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/orders';

    constructor(private http: HttpClient) { }

    create(orders: OrdersMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(orders);
        return this.http.post<OrdersMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(orders: OrdersMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(orders);
        return this.http.put<OrdersMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrdersMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrdersMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrdersMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrdersMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<OrdersMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrdersMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrdersMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrdersMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrdersMySuffix[]>): HttpResponse<OrdersMySuffix[]> {
        const jsonResponse: OrdersMySuffix[] = res.body;
        const body: OrdersMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrdersMySuffix.
     */
    private convertItemFromServer(orders: OrdersMySuffix): OrdersMySuffix {
        const copy: OrdersMySuffix = Object.assign({}, orders);
        return copy;
    }

    /**
     * Convert a OrdersMySuffix to a JSON which can be sent to the server.
     */
    private convert(orders: OrdersMySuffix): OrdersMySuffix {
        const copy: OrdersMySuffix = Object.assign({}, orders);
        return copy;
    }
}
