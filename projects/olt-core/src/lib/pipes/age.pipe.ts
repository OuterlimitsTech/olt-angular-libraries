import { Pipe, PipeTransform } from '@angular/core';
declare let dayjs: any;


@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  formatResponse(response: number, type: string): string {
    return `${response} ${type}${response > 1 ? 's' : ''}`;
  }

  transform(value: Date | any): any {

    try {

      if (!value) {
        return value;
      }

      let response = dayjs().diff(value, 'years');

      if (response > 0) {
        return this.formatResponse(response, 'year');
      }

      response = dayjs().diff(value, 'months');

      if (response > 0) {
        return this.formatResponse(response, 'month');
      }

      return this.formatResponse(dayjs().diff(value, 'days'), 'day');

    } catch (error) {
      console.error(value, error);
      return null;
    }


  }
}
