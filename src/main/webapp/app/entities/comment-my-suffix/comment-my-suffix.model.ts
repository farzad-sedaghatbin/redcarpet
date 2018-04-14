import { BaseEntity } from './../../shared';

export class CommentMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public message?: string,
        public merchants?: BaseEntity[],
    ) {
    }
}
