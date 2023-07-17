import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OltUtility } from '@outerlimitstech/ngx-app-core';

@Component({
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],  
})
export class DateTimePickerComponent implements OnInit {

  entryForm = this.formGroup();
  now = new Date();
  midnight = new Date();
  oneWeekAgo = new Date();

  ngOnInit(): void {
    this.midnight.setUTCHours(10, 0, 0, 0);
    this.oneWeekAgo.setDate(this.oneWeekAgo.getDate() - 7);
  }

  formGroup(): FormGroup<any> {
    return new FormGroup<any>({
      date: new FormControl<Date | null>(null),
      date2: new FormControl<Date | null>(null),
      date3: new FormControl<Date | null>(new Date(), [Validators.required]),
      dateTime1: new FormControl<Date | null>(new Date(), [Validators.required]),
      // dateTime2: new FormControl<Date | null>(null, [Validators.required]),
      dateTime2: new FormControl<Date | null>(null),
      timeOnly: new FormControl<Date | null>(null)
    })
  }

  save(): void {

    console.log(this.entryForm.value);

    if (this.entryForm.invalid) {
      OltUtility.triggerValidators(this.entryForm);
      return;
    }    
    
  }


}
