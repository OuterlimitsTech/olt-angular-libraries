import { DecimalPipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { IPaged } from '../interfaces/paged.interface';

@Pipe({
  name: 'paginationSummary'
})
export class PaginationSummaryPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) public locale: string) { }

  transform(value: IPaged<any>): string | null {
    if (value == null) {
      return null;
    }

    if (!(value.count > 0)) {
      return null;
    }

    const pageNumber = value.page ? value.page : 1;
    const itemsPerPage = value.size ? value.size : 10;
    const displayLower = pageNumber * itemsPerPage - itemsPerPage + 1;
    let displayUpper = pageNumber * itemsPerPage;

    if (displayUpper > value.count) {
      displayUpper = value.count;
    }

    const decimalPipe = new DecimalPipe(this.locale);

    return `Showing records ${displayLower} to ${displayUpper} of ${decimalPipe.transform(value.count, '1.0')}`;
  }
}
