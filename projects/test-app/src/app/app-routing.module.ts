import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './views/landing/landing.component';
import { DateTimePickerComponent } from './views/ngx-bootstrap/date-time-picker/date-time-picker.component';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'ngx-bootstrap',
    children: [
      {
        path: 'date-time-picker',
        component: DateTimePickerComponent,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
