import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RedcarpetRegionModule } from './region/region.module';
import { RedcarpetCountryModule } from './country/country.module';
import { RedcarpetLocationModule } from './location/location.module';
import { RedcarpetDepartmentModule } from './department/department.module';
import { RedcarpetTaskModule } from './task/task.module';
import { RedcarpetEmployeeModule } from './employee/employee.module';
import { RedcarpetJobModule } from './job/job.module';
import { RedcarpetJobHistoryModule } from './job-history/job-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        RedcarpetRegionModule,
        RedcarpetCountryModule,
        RedcarpetLocationModule,
        RedcarpetDepartmentModule,
        RedcarpetTaskModule,
        RedcarpetEmployeeModule,
        RedcarpetJobModule,
        RedcarpetJobHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RedcarpetEntityModule {}
