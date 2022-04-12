import { Pipe, PipeTransform } from '@angular/core';
import { OltUtility } from '../utilities';

const ordinals: string[] = ['th', 'st', 'nd', 'rd'];

@Pipe({
  name: 'ordinal'
})
export class OrdinalPipe implements PipeTransform {

  transform(n: number, keepNumber: boolean = true): number | string | null {

    try {

      if (OltUtility.isNumber(n)) {
        const val = n % 100;
        return (keepNumber ? n : '') + (ordinals[(val - 20) % 10] || ordinals[val] || ordinals[0]);
      }
      return n;

    } catch (error) {
      console.error(n, error);
      return null;
    }

  }

}
