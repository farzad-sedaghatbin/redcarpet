import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ChatMySuffix } from './chat-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ChatMySuffix>;

@Injectable()
export class ChatMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/chats';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/chats';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(chat: ChatMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(chat);
        return this.http.post<ChatMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(chat: ChatMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(chat);
        return this.http.put<ChatMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ChatMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ChatMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChatMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChatMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ChatMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChatMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChatMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ChatMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ChatMySuffix[]>): HttpResponse<ChatMySuffix[]> {
        const jsonResponse: ChatMySuffix[] = res.body;
        const body: ChatMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ChatMySuffix.
     */
    private convertItemFromServer(chat: ChatMySuffix): ChatMySuffix {
        const copy: ChatMySuffix = Object.assign({}, chat);
        copy.chatTime = this.dateUtils
            .convertDateTimeFromServer(chat.chatTime);
        return copy;
    }

    /**
     * Convert a ChatMySuffix to a JSON which can be sent to the server.
     */
    private convert(chat: ChatMySuffix): ChatMySuffix {
        const copy: ChatMySuffix = Object.assign({}, chat);

        copy.chatTime = this.dateUtils.toDate(chat.chatTime);
        return copy;
    }
}
