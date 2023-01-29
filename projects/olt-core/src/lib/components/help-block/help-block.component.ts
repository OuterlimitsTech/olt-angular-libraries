import { Component, Input } from '@angular/core';

@Component({
  selector: 'olt-help-block',
  templateUrl: './help-block.component.html',
  styleUrls: ['./help-block.component.scss']
})
export class HelpBlockComponent {
  @Input() message!: string | null | undefined;

  constructor() { }

  get visible(): boolean {
    return this.message != undefined && this.message?.length > 0;
  }

}
