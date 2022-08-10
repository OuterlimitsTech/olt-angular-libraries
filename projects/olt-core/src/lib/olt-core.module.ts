import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';

import { IMPORT_VIEW_COMPONENTS, EXPORT_VIEW_COMPONENTS } from './views/exports';
import { IMPORT_COMPONENTS, EXPORT_COMPONENTS } from './components/exports';
import { IMPORT_MODAL_COMPONENTS, EXPORT_MODAL_COMPONENTS } from './modals/exports';
import { EXPORT_PIPES, IMPORT_PIPES } from './pipes/exports';
import { EXPORT_DIRECTIVES, IMPORT_DIRECTIVES } from './directives/exports';


@NgModule({
    declarations: [
        IMPORT_COMPONENTS,
        IMPORT_DIRECTIVES,
        IMPORT_MODAL_COMPONENTS,
        IMPORT_PIPES,
        IMPORT_VIEW_COMPONENTS
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        TimepickerModule.forRoot(),
        BsDatepickerModule.forRoot(),
        ToastrModule.forRoot({
            preventDuplicates: true,
            positionClass: 'toast-top-full-width',
            progressBar: true,
            progressAnimation: 'increasing',
        }),
    ],
    exports: [
        ToastrModule,
        EXPORT_COMPONENTS,
        EXPORT_DIRECTIVES,
        EXPORT_MODAL_COMPONENTS,
        EXPORT_PIPES,
        EXPORT_VIEW_COMPONENTS
    ]
})
export class OltCoreModule { }
