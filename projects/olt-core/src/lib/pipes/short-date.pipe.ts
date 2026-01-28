import { DatePipe } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'shortDate',
    standalone: false
})
@Injectable({
  providedIn: 'root'
})
export class OltShortDatePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) public locale: string) { }

  transform(value: any): string | null {
    const pipe = new DatePipe(this.locale);
    return pipe.transform(value, 'shortDate');
  }

}
