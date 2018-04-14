import { BaseEntity } from './../../shared';

export class SettingMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public variable?: string,
        public value?: string,
    ) {
    }
}
