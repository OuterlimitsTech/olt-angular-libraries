import { Directive, HostListener, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, SimpleChange } from '@angular/core';

@Directive({
  selector: '[oltWorkingButton]'
})
export class WorkingButtonDirective implements OnChanges {
  @Input() oltWorkingButton = false;

  defaultHtml: string | null | undefined = null;
  workingLabel = '<span class="olt-working-button-label">Working</span>';
  workingHtml = `<i aria-hidden="true" class="fa fa-spinner fa-spin"> </i> ${this.workingLabel}`;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click', ['$event'])
  clickEvent($event: any): void {
    if (this.oltWorkingButton === true) {
      $event.preventDefault();
    }
  }

  private get innerHtml(): string | null {
    if (this.el.nativeElement.innerHTML) {
      const html = this.el.nativeElement.innerHTML.trim();
      if (html.length > 0) {
        return html;
      }
    }
    return null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.oltWorkingButton) {
      const change = changes.oltWorkingButton as SimpleChange;

      const currentHtml = this.innerHtml;
      if (currentHtml &&
        currentHtml.trim() !== '' &&
        currentHtml.indexOf(this.workingLabel) === -1) {
        this.defaultHtml = this.innerHtml?.trim();
      }

      if (change.previousValue === false && change.currentValue === true) {
        this.renderer.setProperty(this.el.nativeElement, 'disabled', true);
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.workingHtml);
      } else if (change.previousValue === true && change.currentValue === false) {
        this.renderer.setProperty(this.el.nativeElement, 'disabled', false);
        if (this.defaultHtml != null) {
          this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.defaultHtml);
        }
      }
    }
  }
}
