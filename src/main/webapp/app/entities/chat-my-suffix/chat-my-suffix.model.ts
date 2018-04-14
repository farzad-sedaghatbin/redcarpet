import { BaseEntity } from './../../shared';

export class ChatMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public message?: string,
        public chatTime?: any,
    ) {
    }
}
