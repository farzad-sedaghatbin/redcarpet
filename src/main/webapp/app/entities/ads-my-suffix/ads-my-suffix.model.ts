import { BaseEntity } from './../../shared';

export class AdsMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public merchantId?: number,
    ) {
    }
}
