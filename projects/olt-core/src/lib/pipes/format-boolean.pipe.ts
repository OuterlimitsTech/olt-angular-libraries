import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatBoolean',
    standalone: false
})
export class FormatBooleanPipe implements PipeTransform {
  transform(value: any, trueValue: string | null = 'Yes', falseValue: string | null = 'No', unknownValue: string | null = 'N/A'): string | null {


    try {

      if (value == null) {
        return unknownValue;
      }
      value = (value + '').toLowerCase();

      if (value) {
        if (['true', '1', 'yes'].indexOf(value) >= 0) {
          return trueValue;
        }
        if (['false', '0', 'no'].indexOf(value) >= 0) {
          return falseValue;
        }
      }

      return unknownValue;


    } catch (error) {
      console.error(value, error);
      return unknownValue;
    }
  }
}

