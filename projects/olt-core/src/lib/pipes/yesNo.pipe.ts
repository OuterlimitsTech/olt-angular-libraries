import { Pipe, PipeTransform } from '@angular/core';
import { FormatBooleanPipe } from './format-boolean.pipe';

@Pipe({
    name: 'yesNo',
    standalone: false
})
export class YesNoPipe extends FormatBooleanPipe implements PipeTransform {
  transform(value: any): string | null {
    return super.transform(value, 'Yes', 'No', null);
  }
}
