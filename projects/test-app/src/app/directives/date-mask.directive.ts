import { Directive, Input, HostListener, ElementRef } from '@angular/core';


  


// https://medium.com/@victor.loh95/create-date-masking-custom-directive-for-ngbdatepicker-ff4cc73097c1



@Directive({
  selector: '[dateMaskInput]'
})
export class DateMaskInputDirective {
@Input() dateMaskValue: string | Date | null = null;

constructor(
      private elRef: ElementRef,
    ) { }

@HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    console.log(this.dateMaskValue, event);
    console.log(this.elRef.nativeElement)    
    // if ((this.dateMaskValue?.length === 2 || this.dateMaskValue?.length === 5) && event.key !== 'Backspace') {
    //   this.renderer.setProperty(this.elRef.nativeElement, 'value', this.dateMaskValue + '/');
    // }
  }
}

