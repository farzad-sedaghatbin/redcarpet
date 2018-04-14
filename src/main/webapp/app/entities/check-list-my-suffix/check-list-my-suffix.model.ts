import { BaseEntity } from './../../shared';

export class CheckListMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public item?: string,
        public cermonyId?: number,
    ) {
    }
}
