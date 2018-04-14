import { BaseEntity } from './../../shared';

export class DoListMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public checked?: boolean,
        public checkListId?: number,
    ) {
        this.checked = false;
    }
}
