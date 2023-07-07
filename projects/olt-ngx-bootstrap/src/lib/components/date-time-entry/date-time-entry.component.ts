import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, merge } from 'rxjs';
import { OltBaseFormGroupComponent, OltUtility } from '@olt-core';

@Component({
  selector: 'olt-date-time-entry, [formGroupName] olt-date-time-entry, [formGroup] olt-date-time-entry',
  templateUrl: './date-time-entry.component.html',
  styleUrls: ['./date-time-entry.component.scss']
})
export class DateTimeEntryComponent extends OltBaseFormGroupComponent implements OnInit {
  @Input() min: Date = new Date('0001-01-01T00:00:00Z');
  @Input() max: Date = new Date('9999-12-31T23:59:59Z');
  @Output() changed = new EventEmitter<Date | null>();

  constructor() { super(); }

  ngOnInit(): void {
    this.formGroup.addControl('dateTime', new FormControl<Date | null>(null));
    this.unsub = merge(
      this.formGroup.get('date')!.valueChanges.pipe(map((value) => ({ date: value, time: this.formGroup.get('time')?.value, timeChg: false }))),
      this.formGroup.get('time')!.valueChanges.pipe(map((value) => ({ date: this.formGroup.get('date')?.value, time: value, timeChg: true }))),
    ).subscribe(values => {
      if (OltUtility.isDate(values.date) && OltUtility.isDate(values.time)) {
        const dt = OltUtility.combineDateAndTime(values.date, values.time);
        this.formGroup.get('dateTime')?.setValue(dt, { emitEvent: false });

        if (values.timeChg === true) {
          this.formGroup.get('date')?.setValue(dt, { emitEvent: false });
          this.formGroup.get('date')?.updateValueAndValidity({ emitEvent: false });
        }
      } else {
        this.formGroup.get('dateTime')?.reset();
      }
    });
  }

  get firstError(): string | null {
    const errors = (OltUtility.getFormValidationErrors(this.formGroup, 'Date/Time') ?? []).filter(p => p.control == this.formGroup);
    return errors?.length > 0 ? errors[0].message : null;
  }

  get showError(): boolean {
    return (this.formGroup?.touched === true || this.formGroup?.dirty === true) && this.formGroup?.invalid === true;
  }

}
