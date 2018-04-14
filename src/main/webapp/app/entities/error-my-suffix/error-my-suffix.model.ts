import { BaseEntity } from './../../shared';

export class ErrorMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public moment?: any,
        public log?: string,
    ) {
    }
}
