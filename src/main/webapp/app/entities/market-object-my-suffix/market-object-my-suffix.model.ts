import { BaseEntity } from './../../shared';

export const enum MarketType {
    'SUBSCRIPTION',
    'ADS'
}

export class MarketObjectMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public price?: number,
        public marketType?: MarketType,
        public discount?: number,
    ) {
    }
}
