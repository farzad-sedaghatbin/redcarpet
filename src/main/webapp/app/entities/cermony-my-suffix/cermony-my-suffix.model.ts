import { BaseEntity } from './../../shared';

export const enum CermonyType {
    'WEDDING',
    'BIRTHDAY',
    'ENGAGE'
}

export class CermonyMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public cermonyType?: CermonyType,
        public checkLists?: BaseEntity[],
    ) {
    }
}
