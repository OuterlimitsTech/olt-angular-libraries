import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent {
  entryForm = this.formGroup();


  formGroup(): FormGroup<any> {
    return new FormGroup<any>({
      date: new FormControl<Date | null>(null),
      time: new FormControl<Date | null>(null)
    })
  }

}
