import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(items: any[], attr?: string): any {
    try {
      if (items != null) {
        if (attr != null) {
          return items.reduce((a, b) => a + b[attr], 0);
        }
        return items.reduce((a, b) => a + b, 0);
      }
      return null;
    } catch (error) {
      console.error(attr, items, error);
      return null;
    }
  }

}
