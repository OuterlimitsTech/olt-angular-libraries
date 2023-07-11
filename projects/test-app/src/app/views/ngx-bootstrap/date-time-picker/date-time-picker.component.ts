import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OltUtility } from '@olt-core';

@Component({
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent {
  entryForm = this.formGroup();
  

  formGroup(): FormGroup<any> {
    return new FormGroup<any>({
      date: new FormControl<Date | null>(null),
      date2: new FormControl<Date | null>(null),
      date3: new FormControl<Date | null>(new Date(), [Validators.required]),
      time: new FormControl<Date | null>(null)
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
