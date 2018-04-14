import { BaseEntity } from './../../shared';

export class ServiceMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public price?: number,
        public merchantId?: number,
    ) {
    }
}
