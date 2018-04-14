import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MerchantMySuffix } from './merchant-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MerchantMySuffix>;

@Injectable()
export class MerchantMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/merchants';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/merchants';

    constructor(private http: HttpClient) { }

    create(merchant: MerchantMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(merchant);
        return this.http.post<MerchantMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(merchant: MerchantMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(merchant);
        return this.http.put<MerchantMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MerchantMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MerchantMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MerchantMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MerchantMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<MerchantMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MerchantMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MerchantMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MerchantMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MerchantMySuffix[]>): HttpResponse<MerchantMySuffix[]> {
        const jsonResponse: MerchantMySuffix[] = res.body;
        const body: MerchantMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MerchantMySuffix.
     */
    private convertItemFromServer(merchant: MerchantMySuffix): MerchantMySuffix {
        const copy: MerchantMySuffix = Object.assign({}, merchant);
        return copy;
    }

    /**
     * Convert a MerchantMySuffix to a JSON which can be sent to the server.
     */
    private convert(merchant: MerchantMySuffix): MerchantMySuffix {
        const copy: MerchantMySuffix = Object.assign({}, merchant);
        return copy;
    }
}
