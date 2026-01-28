import { Pipe, PipeTransform, Injectable, LOCALE_ID, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'oltDate',
    standalone: false
})
@Injectable({
  providedIn: 'root'
})
export class OltDatePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) public locale: string) { }


  transform(value: Date | string | number): string | null;
  // transform(value: Date | string | number | any | Date | string | number | null | undefined): string | null;
  // transform(value: Date|string|number|null|undefined): string|null;

  transform(value: any | Date | string | number | undefined, format: string = 'short', timezone?: string, locale?: string): string | null {
    const datePipe = new DatePipe(this.locale);
    let result = datePipe.transform(value, format, timezone, locale);
    // do other formatting and return the value
    if (result != null) {
      result = result.replace(',', '');  // Removes the comma between date & time
    }
    return result;

  }
}
