import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OltCoreModule } from '@outerlimitstech/ngx-app-core';

import { DECLARE_MODAL_COMPONENTS } from './modals/exports';

@NgModule({
  declarations: [
    DECLARE_MODAL_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    //PaginationModule.forRoot(),
    //TimepickerModule.forRoot(),
    //BsDatepickerModule.forRoot(),
    OltCoreModule
  ]  
})
export class OltNgxModalModule { }