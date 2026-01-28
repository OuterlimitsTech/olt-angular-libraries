import { OltUtility } from './../utilities/utility';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'unknown',
    standalone: false
})
export class UnknownPipe implements PipeTransform {

  transform(value: any, defaultText?: string): string | null {
    try {
      if (OltUtility.isNumber(value)) {
        return value;
      }
      if (OltUtility.isDate(value)) {
        return value;
      }
      if (OltUtility.isNullOrEmptyOrUndefined(value) || value === '' || value?.trim()?.length === 0) {
        return defaultText != null ? defaultText : 'Unknown';
      }
      return value;
    } catch (error) {
      console.error(value, error);
      return value;
    }
  }

}
