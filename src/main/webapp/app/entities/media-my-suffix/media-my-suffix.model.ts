import { BaseEntity } from './../../shared';

export class MediaMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public path?: string,
        public contentType?: string,
        public merchantId?: number,
    ) {
    }
}
