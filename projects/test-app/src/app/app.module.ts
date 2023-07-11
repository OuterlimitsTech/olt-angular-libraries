import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// import { OltNgxBootstrapModule } from '@olt-ngx-bootstrap';
import { OltNgxDatePickerModule } from '@olt-ngx-bootstrap/date-picker';
import { OltCoreModule } from '@olt-core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DateTimePickerComponent } from './views/ngx-bootstrap/date-time-picker/date-time-picker.component';
import { LandingComponent } from './views/landing/landing.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TestDateEntryComponent } from './components/test-date-entry/test-date-entry.component';
import { TestDateTimeEntryComponent } from './components/test-date-time-entry/test-date-time-entry.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DateMaskInputDirective } from './directives/date-mask.directive';
import { OltBsDatepickerDirective, OltNgxBsDatepickerInputDirective } from './directives/bs-datepicker.component';

export function getBsDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'M/D/YYYY',
    containerClass: 'theme-default',
    showWeekNumbers: false
  });
}

@NgModule({
  declarations: [
    AppComponent,
    DateTimePickerComponent,
    LandingComponent,
    SideBarComponent,
    NavBarComponent,
    TestDateEntryComponent,
    TestDateTimeEntryComponent,
    DateMaskInputDirective,
    OltNgxBsDatepickerInputDirective,
    OltBsDatepickerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    OltCoreModule,
    // OltNgxBootstrapModule,
    OltNgxDatePickerModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ],
  providers: [
    {
      provide: BsDatepickerConfig,
      useFactory: getBsDatepickerConfig
    },    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
