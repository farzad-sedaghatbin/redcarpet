import { BaseEntity } from './../../shared';

export const enum MerchatType {
    'MUSIC'
}

export const enum ClassType {
    'LOW',
    'MID',
    'HIGH',
    'LUXURY'
}

export class MerchantMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: MerchatType,
        public range?: ClassType,
        public logoId?: number,
        public ads?: BaseEntity[],
        public services?: BaseEntity[],
        public media?: BaseEntity[],
        public ratings?: BaseEntity[],
        public comments?: BaseEntity[],
    ) {
    }
}
