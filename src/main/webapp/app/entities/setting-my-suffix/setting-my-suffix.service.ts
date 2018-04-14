import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SettingMySuffix } from './setting-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SettingMySuffix>;

@Injectable()
export class SettingMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/settings';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/settings';

    constructor(private http: HttpClient) { }

    create(setting: SettingMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(setting);
        return this.http.post<SettingMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(setting: SettingMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(setting);
        return this.http.put<SettingMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SettingMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SettingMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SettingMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SettingMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<SettingMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SettingMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SettingMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SettingMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SettingMySuffix[]>): HttpResponse<SettingMySuffix[]> {
        const jsonResponse: SettingMySuffix[] = res.body;
        const body: SettingMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SettingMySuffix.
     */
    private convertItemFromServer(setting: SettingMySuffix): SettingMySuffix {
        const copy: SettingMySuffix = Object.assign({}, setting);
        return copy;
    }

    /**
     * Convert a SettingMySuffix to a JSON which can be sent to the server.
     */
    private convert(setting: SettingMySuffix): SettingMySuffix {
        const copy: SettingMySuffix = Object.assign({}, setting);
        return copy;
    }
}
