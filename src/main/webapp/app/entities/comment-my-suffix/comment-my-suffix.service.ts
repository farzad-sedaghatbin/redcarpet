import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CommentMySuffix } from './comment-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CommentMySuffix>;

@Injectable()
export class CommentMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/comments';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/comments';

    constructor(private http: HttpClient) { }

    create(comment: CommentMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(comment);
        return this.http.post<CommentMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(comment: CommentMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(comment);
        return this.http.put<CommentMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CommentMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CommentMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CommentMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CommentMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CommentMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CommentMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CommentMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CommentMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CommentMySuffix[]>): HttpResponse<CommentMySuffix[]> {
        const jsonResponse: CommentMySuffix[] = res.body;
        const body: CommentMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CommentMySuffix.
     */
    private convertItemFromServer(comment: CommentMySuffix): CommentMySuffix {
        const copy: CommentMySuffix = Object.assign({}, comment);
        return copy;
    }

    /**
     * Convert a CommentMySuffix to a JSON which can be sent to the server.
     */
    private convert(comment: CommentMySuffix): CommentMySuffix {
        const copy: CommentMySuffix = Object.assign({}, comment);
        return copy;
    }
}
