import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OltCoreModule } from '@olt-core';

import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { DECLARE_MODAL_COMPONENTS, EXPORT_MODAL_COMPONENTS } from './modals/exports';
import { DECLARE_COMPONENTS, EXPORT_COMPONENTS } from './components/exports';


@NgModule({
  declarations: [
    DECLARE_COMPONENTS,
    DECLARE_MODAL_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    OltCoreModule
  ],
  exports: [
    EXPORT_COMPONENTS,
    EXPORT_MODAL_COMPONENTS
  ]
})
export class OltNgxBootstrapModule { }
