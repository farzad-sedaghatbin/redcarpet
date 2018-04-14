import { BaseEntity } from './../../shared';

export class FactorMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public cost?: number,
        public eventTime?: any,
        public done?: boolean,
        public uid?: string,
        public marketObjectId?: number,
    ) {
        this.done = false;
    }
}
