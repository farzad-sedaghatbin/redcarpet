import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ServiceMySuffix } from './service-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ServiceMySuffix>;

@Injectable()
export class ServiceMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/services';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/services';

    constructor(private http: HttpClient) { }

    create(service: ServiceMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(service);
        return this.http.post<ServiceMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(service: ServiceMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(service);
        return this.http.put<ServiceMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ServiceMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ServiceMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ServiceMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ServiceMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ServiceMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ServiceMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ServiceMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ServiceMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ServiceMySuffix[]>): HttpResponse<ServiceMySuffix[]> {
        const jsonResponse: ServiceMySuffix[] = res.body;
        const body: ServiceMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ServiceMySuffix.
     */
    private convertItemFromServer(service: ServiceMySuffix): ServiceMySuffix {
        const copy: ServiceMySuffix = Object.assign({}, service);
        return copy;
    }

    /**
     * Convert a ServiceMySuffix to a JSON which can be sent to the server.
     */
    private convert(service: ServiceMySuffix): ServiceMySuffix {
        const copy: ServiceMySuffix = Object.assign({}, service);
        return copy;
    }
}
