import { BaseEntity } from './../../shared';

export const enum CermonyType {
    'WEDDING',
    'BIRTHDAY',
    'ENGAGE'
}

export class OrdersMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public guestNo?: number,
        public cermonyType?: CermonyType,
        public location?: string,
        public description?: string,
        public budget?: string,
    ) {
    }
}
