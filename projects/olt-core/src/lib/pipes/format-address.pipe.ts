import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IAddress } from '../interfaces/address.interface';


@Pipe({
  name: 'formatAddress'
})
export class FormatAddressPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: IAddress): SafeHtml | null {
    if (value == null) {
      return null;
    }

    let address = '';
    if (value.line1 != null) {
      address = value.line1 + '<br>' + (value.line2 ? value.line2 + '<br>' : '');
    }

    let zip = value.zip;
    if (zip != null) {
      zip = zip.replace('-', '');
      if (zip.length === 9) {
        zip = `${zip.substring(0, 5)}-${zip.substring(5)}`;
      }
    }

    if (value.city != null && value.state != null && value.state != null && zip != null) {
      address += `${value.city}, ${value.state}  ${zip}`;
    }

    return this.sanitizer.bypassSecurityTrustHtml(address);


  }

}
