import { UnknownPipe } from './unknown.pipe';
import { EmptyPipe } from './empty.pipe';
import { FormatAddressPipe } from './format-address.pipe';
import { FormatPhonePipe } from './format-phone.pipe';
import { PaginationSummaryPipe } from './pagination-summary.pipe';
import { FormatNamePipe } from './format-name.pipe';
import { AgePipe } from './age.pipe';
import { DaysPipe } from './days.pipe';
import { OrdinalPipe } from './ordinal.pipe';
import { SumPipe } from './sum.pipe';
import { FilterByPipe } from './filter-by.pipe';
import { FormatBooleanPipe } from './format-boolean.pipe';
import { YesNoPipe } from './yesNo.pipe';
import { OltDatePipe } from './olt-date.pipe';
import { OltShortDatePipe } from './short-date.pipe';


export const IMPORT_PIPES = [
  FormatBooleanPipe,
  YesNoPipe,
  OltDatePipe,
  OltShortDatePipe,
  FormatPhonePipe,
  PaginationSummaryPipe,
  FormatNamePipe,
  AgePipe,
  DaysPipe,
  OrdinalPipe,
  SumPipe,
  FilterByPipe,
  FormatAddressPipe,
  EmptyPipe,
  UnknownPipe,
];

export const EXPORT_PIPES = [
  FormatBooleanPipe,
  YesNoPipe,
  OltDatePipe,
  OltShortDatePipe,
  FormatPhonePipe,
  PaginationSummaryPipe,
  FormatNamePipe,
  AgePipe,
  DaysPipe,
  OrdinalPipe,
  SumPipe,
  FilterByPipe,
  FormatAddressPipe,
  EmptyPipe,
  UnknownPipe,
];
