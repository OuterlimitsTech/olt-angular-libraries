import { OltUtility } from './../utilities/utility';
import { Directive, Input, ElementRef, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[oltAutoFocus], [autofocus]'
})
export class AutoFocusDirective implements OnInit {
  private host: HTMLElement;
  private focused: Element | null;
  private autoFocus = true;

  @Input()
  set autofocus(value: string | boolean | null | undefined) {
    this.autoFocus = OltUtility.toBoolean(value, false) === true;
  }

  constructor(elRef: ElementRef, @Inject(DOCUMENT) document: any) {
    const doc = document as Document;
    this.host = elRef.nativeElement;
    this.focused = doc.activeElement;
  }

  ngOnInit(): void {
    if (this.autoFocus && this.host && this.host !== this.focused) {
      setTimeout(() => this.host.focus());
    }
  }
}
