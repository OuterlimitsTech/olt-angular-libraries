import { Type } from '@angular/core';

export class OltDynamicAngularTemplate {
  constructor(public component: Type<any>, public templateName: string) { }
}
