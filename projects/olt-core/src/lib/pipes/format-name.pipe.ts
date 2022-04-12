import { OltUtility } from './../utilities/utility';
import { Pipe, PipeTransform } from '@angular/core';
import { FormatNameTypeEnum } from '../enums/format-name-type.enum';
import { IFullName, IName } from '../interfaces/name.interface';

@Pipe({
  name: 'formatName'
})
export class FormatNamePipe implements PipeTransform {

  private nameObject1(value: IName, type: FormatNameTypeEnum): string | null {
    const first = value.prefix ? `${value.prefix} ${value.first}` : value.first;
    const last = value.suffix ? `${value.last} ${value.suffix}` : value.last;
    if (first && last) {
      if (type === FormatNameTypeEnum.lastFirst) {
        return value.middle ? `${last}, ${first} ${value.middle}`.trim() : `${last}, ${first}`.trim();
      }
      return value.middle ? `${first} ${value.middle} ${last}`.trim() : `${first} ${last}`.trim();
    }
    return null;

  }

  private nameObject2(value: IFullName, type: FormatNameTypeEnum): string | null {
    const first = value.namePrefix ? `${value.namePrefix} ${value.firstName}` : value.firstName;
    const last = value.nameSuffix ? `${value.lastName} ${value.nameSuffix}` : value.lastName;
    if (first && last) {
      if (type === FormatNameTypeEnum.lastFirst) {
        return value.middleName ? `${last}, ${first} ${value.middleName}`.trim() : `${last}, ${first}`.trim();
      }
      return value.middleName ? `${first} ${value.middleName} ${last}`.trim() : `${first} ${last}`.trim();
    }
    return null;

  }

  transform(value: IName | IFullName | any, type?: FormatNameTypeEnum): string | null {
    try {
      if (value == null) {
        return null;
      }

      if (type == null) {
        type = FormatNameTypeEnum.firstLast;
      }

      if (OltUtility.hasProperty(value, 'first') && OltUtility.hasProperty(value, 'last')) {
        return this.nameObject1(value, type);
      }

      if (OltUtility.hasProperty(value, 'firstName') && OltUtility.hasProperty(value, 'lastName')) {
        return this.nameObject2(value, type);
      }
    } catch (error) {
      console.error(value, error);
      return value;
    }

    return value;
  }
}
