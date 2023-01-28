import { FileDragDropDirective } from './file-drag-drop.directive';
import { IntEntryDirective } from './int-entry.directive';
import { WorkingButtonDirective } from './working-button.directive';
import { DecimalEntryDirective } from './decimal-entry.directive';
import { ZipcodeMaskDirective } from './zipcode-mask.directive';
import { AutoFocusDirective } from './auto-focus.directive';
import { PhoneMaskDirective } from './phone-mask.directive';
import { CanadaPostalcodeMaskDirective } from './canada-postalcode-mask.directive';
import { DynamicComponentHostDirective } from './dynamic-component-host.directive';
import { DateLessThanDirective } from './date-less-than.directive';
import { FormGroupStyleDirective } from './form-group-style.directive';

export const IMPORT_DIRECTIVES = [
  FileDragDropDirective,
  IntEntryDirective,
  WorkingButtonDirective,
  PhoneMaskDirective,
  CanadaPostalcodeMaskDirective,
  ZipcodeMaskDirective,
  DecimalEntryDirective,
  AutoFocusDirective,
  DynamicComponentHostDirective,
  DateLessThanDirective,
  FormGroupStyleDirective
];


export const EXPORT_DIRECTIVES = [
  AutoFocusDirective,
  FileDragDropDirective,
  IntEntryDirective,
  WorkingButtonDirective,
  PhoneMaskDirective,
  CanadaPostalcodeMaskDirective,
  ZipcodeMaskDirective,
  DecimalEntryDirective,
  DynamicComponentHostDirective,
  DateLessThanDirective,
  FormGroupStyleDirective
];
