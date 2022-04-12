import { Pipe, PipeTransform } from '@angular/core';
import { IDomesticPhone } from '../interfaces';
import { OltUtility } from '../utilities/utility';

@Pipe({
  name: 'formatPhone'
})
export class FormatPhonePipe implements PipeTransform {

  format(value: string): string | null {
    if (value == null) {
      return null;
    }

    value = value.toString().trim().replace(/^\+/, '');

    let formatted = '';
    if (value.match(/[^0-9]/)) {
      return value;
    }

    let areaCode: string;
    let phoneNumber: string | null = null;

    switch (value.length) {
      case 1:
      case 2:
      case 3:
        areaCode = value;
        break;

      default:
        areaCode = value.slice(0, 3);
        phoneNumber = value.slice(3);
    }

    if (phoneNumber != null) {
      if (phoneNumber.length > 3) {
        phoneNumber = phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3, 7);
      }

      formatted = ('(' + areaCode + ') ' + phoneNumber).trim();
    } else {
      formatted = '(' + areaCode;
    }



    return formatted;
  }

  formatDomesticPhone(data: IDomesticPhone): string | null {
    if (data.number == null) {
      return null;
    }

    const phoneNumber = this.format(data.number);
    if (data.ext) {
      return `${phoneNumber} x${data.ext}`;
    }
    return phoneNumber;
  }


  transform(data: IDomesticPhone | any): string | null {
    try {

      if (data == null) {
        return null;
      }

      if (OltUtility.hasProperty(data, 'number')) {
        return this.formatDomesticPhone(data);
      }

      return this.format(data);

    } catch (error) {
      console.error(data, error);
      return null;
    }

  }


}
