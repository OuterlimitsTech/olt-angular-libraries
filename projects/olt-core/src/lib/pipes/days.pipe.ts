import { Pipe, PipeTransform } from '@angular/core';
declare let dayjs: any;
import { OltUtility } from '../utilities';


@Pipe({
  name: 'days'
})
export class DaysPipe implements PipeTransform {

  transform(date1: string | Date | any, date2: string | Date | any): any {
    try {

      if (!date1 || !OltUtility.isDate(date1)) {
        return null;
      }
      if (!date2 || !OltUtility.isDate(date2)) {
        return null;
      }
      const dayDiff = (Math.abs(dayjs(date1).diff(dayjs(date2), 'days'))) + 1;
      return dayDiff.toString() + (dayDiff > 1 ? ' days' : ' day');

    } catch (error) {
      console.error(date1, date2, error);
      return null;
    }

  }

}
