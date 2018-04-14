import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AdsMySuffix } from './ads-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AdsMySuffix>;

@Injectable()
export class AdsMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/ads';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/ads';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(ads: AdsMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(ads);
        return this.http.post<AdsMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ads: AdsMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(ads);
        return this.http.put<AdsMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AdsMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AdsMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<AdsMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AdsMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<AdsMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<AdsMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AdsMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AdsMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AdsMySuffix[]>): HttpResponse<AdsMySuffix[]> {
        const jsonResponse: AdsMySuffix[] = res.body;
        const body: AdsMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AdsMySuffix.
     */
    private convertItemFromServer(ads: AdsMySuffix): AdsMySuffix {
        const copy: AdsMySuffix = Object.assign({}, ads);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(ads.startDate);
        copy.endDate = this.dateUtils
            .convertDateTimeFromServer(ads.endDate);
        return copy;
    }

    /**
     * Convert a AdsMySuffix to a JSON which can be sent to the server.
     */
    private convert(ads: AdsMySuffix): AdsMySuffix {
        const copy: AdsMySuffix = Object.assign({}, ads);

        copy.startDate = this.dateUtils.toDate(ads.startDate);

        copy.endDate = this.dateUtils.toDate(ads.endDate);
        return copy;
    }
}
