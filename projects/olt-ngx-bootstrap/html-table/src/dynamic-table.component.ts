import { Component, EventEmitter, ElementRef, Output, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IPaged, IPagerChangeEvent, PagerChangeEvent } from '@olt-core';
import { timer } from 'rxjs';

@Component({
  selector: 'olt-dynamic-table, olt-ngx-bootstrap-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnChanges {
  @Input() loading = false;
  @Input() showSizes = true;
  @Input() paged: IPaged<any> = { page: 1, size: 10, count: 0, data: [] };
  @Input() tableCss = 'table table-striped table-hover';
  @Input() tableResponsiveCss = 'table-responsive-xl';
  @Input() showPager = true;
  @Output() pagerChanged: EventEmitter<IPagerChangeEvent> = new EventEmitter<IPagerChangeEvent>();
  @Input() pageSizes: Array<number> = [10, 25, 50, 100];
  currentPage = 1;

  constructor(private elRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.paged?.currentValue?.page != null && changes.paged?.currentValue?.page != undefined) {
      const page = changes.paged.currentValue.page;
      if (this.currentPage !== page) {
        timer(0).subscribe(time => this.currentPage = page);
      }
    }
  }

  get columns(): number {
    const headers = this.elRef.nativeElement.querySelectorAll('[header] th').length;
    return headers;
  }

  get hasRecords(): boolean {
    return this.paged?.data?.length > 0;
  }

  get pagerColSpan(): number {
    return Math.round(this.columns / 2);
  }

  get summaryColSpan(): number {
    return Math.trunc(this.columns / 2);
  }

  get totalItems(): number {
    return this.paged?.count || 0;
  }

  get itemsPerPage(): number {
    return this.paged?.size || 10;
  }

  get showPagination(): boolean {
    if (this.showPager && this.paged != null && this.paged != undefined) {
      return this.paged.count > this.paged.size;
    }
    return false;
  }

  get sizesVisible(): boolean {
    return this.showSizes && this.showPagination;
  }
  pagerChange(page: number, size: number): void {
    this.pagerChanged.emit(new PagerChangeEvent(page, size));
  }

}
