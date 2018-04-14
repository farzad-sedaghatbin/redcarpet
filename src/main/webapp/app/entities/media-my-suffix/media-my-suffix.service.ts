import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MediaMySuffix } from './media-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MediaMySuffix>;

@Injectable()
export class MediaMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/media';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/media';

    constructor(private http: HttpClient) { }

    create(media: MediaMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(media);
        return this.http.post<MediaMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(media: MediaMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(media);
        return this.http.put<MediaMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MediaMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MediaMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MediaMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MediaMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<MediaMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MediaMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MediaMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MediaMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MediaMySuffix[]>): HttpResponse<MediaMySuffix[]> {
        const jsonResponse: MediaMySuffix[] = res.body;
        const body: MediaMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MediaMySuffix.
     */
    private convertItemFromServer(media: MediaMySuffix): MediaMySuffix {
        const copy: MediaMySuffix = Object.assign({}, media);
        return copy;
    }

    /**
     * Convert a MediaMySuffix to a JSON which can be sent to the server.
     */
    private convert(media: MediaMySuffix): MediaMySuffix {
        const copy: MediaMySuffix = Object.assign({}, media);
        return copy;
    }
}
