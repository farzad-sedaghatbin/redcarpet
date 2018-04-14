import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RedcarpetMerchantMySuffixModule } from './merchant-my-suffix/merchant-my-suffix.module';
import { RedcarpetOrdersMySuffixModule } from './orders-my-suffix/orders-my-suffix.module';
import { RedcarpetMarketObjectMySuffixModule } from './market-object-my-suffix/market-object-my-suffix.module';
import { RedcarpetAdsMySuffixModule } from './ads-my-suffix/ads-my-suffix.module';
import { RedcarpetErrorMySuffixModule } from './error-my-suffix/error-my-suffix.module';
import { RedcarpetServiceMySuffixModule } from './service-my-suffix/service-my-suffix.module';
import { RedcarpetSettingMySuffixModule } from './setting-my-suffix/setting-my-suffix.module';
import { RedcarpetFactorMySuffixModule } from './factor-my-suffix/factor-my-suffix.module';
import { RedcarpetRatingMySuffixModule } from './rating-my-suffix/rating-my-suffix.module';
import { RedcarpetCommentMySuffixModule } from './comment-my-suffix/comment-my-suffix.module';
import { RedcarpetMediaMySuffixModule } from './media-my-suffix/media-my-suffix.module';
import { RedcarpetChatMySuffixModule } from './chat-my-suffix/chat-my-suffix.module';
import { RedcarpetCermonyMySuffixModule } from './cermony-my-suffix/cermony-my-suffix.module';
import { RedcarpetCheckListMySuffixModule } from './check-list-my-suffix/check-list-my-suffix.module';
import { RedcarpetDoListMySuffixModule } from './do-list-my-suffix/do-list-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        RedcarpetMerchantMySuffixModule,
        RedcarpetOrdersMySuffixModule,
        RedcarpetMarketObjectMySuffixModule,
        RedcarpetAdsMySuffixModule,
        RedcarpetErrorMySuffixModule,
        RedcarpetServiceMySuffixModule,
        RedcarpetSettingMySuffixModule,
        RedcarpetFactorMySuffixModule,
        RedcarpetRatingMySuffixModule,
        RedcarpetCommentMySuffixModule,
        RedcarpetMediaMySuffixModule,
        RedcarpetChatMySuffixModule,
        RedcarpetCermonyMySuffixModule,
        RedcarpetCheckListMySuffixModule,
        RedcarpetDoListMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetEntityModule {}
