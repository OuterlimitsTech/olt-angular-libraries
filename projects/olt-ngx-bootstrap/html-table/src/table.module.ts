import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { OltCoreModule } from '@olt-core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DynamicTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
    OltCoreModule
  ],
  exports: [
    DynamicTableComponent
  ]
})
export class OltNgxTableModule { }
