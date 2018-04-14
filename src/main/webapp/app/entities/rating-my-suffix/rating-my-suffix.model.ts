import { BaseEntity } from './../../shared';

export class RatingMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public value?: number,
        public merchants?: BaseEntity[],
    ) {
    }
}
