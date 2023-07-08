import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OltNgxBootstrapModule } from '@olt-ngx-bootstrap';
import { OltCoreModule } from '@olt-core';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DateTimePickerComponent } from './views/ngx-bootstrap/date-time-picker/date-time-picker.component';
import { LandingComponent } from './views/landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    DateTimePickerComponent,
    LandingComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OltCoreModule,
    OltNgxBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
