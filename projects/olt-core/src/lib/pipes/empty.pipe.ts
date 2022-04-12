import { Pipe, PipeTransform } from '@angular/core';
import { UnknownPipe } from './unknown.pipe';

@Pipe({
  name: 'empty'
})
export class EmptyPipe implements PipeTransform {

  transform(value: any, defaultText?: string): string | null {
    try {
      const pipe = new UnknownPipe();
      return pipe.transform(value, defaultText || 'N/A');
    } catch (error) {
      console.error(value, error);
      return value;
    }
  }
}
