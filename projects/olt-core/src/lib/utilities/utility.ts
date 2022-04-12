import { IOltCursorPositionFormatted } from '../interfaces/cursor-position-formatted.interface';
import { Func } from '../interfaces/deletgates.interface';
declare let dayjs: any;


export class OltUtility {

    public static findProp(obj: any, prop: any, defval: any): any {
        if (typeof defval === undefined) {
            defval = null;
        }
        prop = prop.split('.');
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < prop.length; i++) {
            if (typeof obj[prop[i]] === undefined) {
                return defval;
            }
            obj = obj[prop[i]];
        }
        return obj;
    }

    public static hasProperty(obj: object, property: string): boolean {
        if (this.isObjectEmpty(obj)) {
            return false;
        }
        // tslint:disable-next-line: triple-equals
        const prop = Object.keys(obj).find(key => key == property);
        return prop != null;
    }

    public static isObjectEmpty(obj: object): boolean {
        return Object.keys(obj).length === 0;
    }

    public static isNumber(value: any): boolean {
        return ((value != null) && !isNaN(Number(value.toString())));
    }

    public static isArray(value: any): boolean {
        if (value == null || value === undefined) {
            return false;
        }
        return Array.isArray(value);
    }

    public static isNullOrEmptyOrUndefined(value: any): boolean {
        if (value == null || value === undefined) {
            return true;
        }
        if (this.isArray(value)) {
            return ((value as Array<any>).length === 0);
        }
        return (value === '' || value.length === 0);
    }

    public static isNotNullOrEmptyOrUndefined(value: any): boolean {
        return this.isNullOrEmptyOrUndefined(value) === false;
    }

    public static hasValue(value: any): boolean {
        return this.isNotNullOrEmptyOrUndefined(value);
    }

    public static checkValidDateStr(str: string): boolean {
        return str.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
    }

    public static isDate(date: Date | any | string): boolean {
        return this.toDate(date) != null;
    }

    public static toDate(date: Date | any | string): Date | null {
        if (date instanceof Date) {
            return date;
        }

        if (typeof date === 'string') {
            if (this.checkValidDateStr(date)) {
                return dayjs(date).toDate();
            } else {
                return null;
            }
        } else if (dayjs.isDayjs(date)) {
            const dateString = dayjs(date).format('YYYY-MM-DD');
            if (this.checkValidDateStr(dateString)) {
                return dayjs(date).toDate();
            }
        }
        return null;
    }


    public static isInt(value: any): boolean {
        if (!this.isNumber(value)) {
            return false;
        }
        const x = parseFloat(value);
        // noinspection TsLint
        // tslint:disable-next-line:no-bitwise
        return (x | 0) === x;
    }

    public static toInt(value: any, defaultVal?: number): number {
        if (this.isInt(value)) {
            return parseInt(value, 10);
        }
        return defaultVal != null ? defaultVal : NaN;
    }

    public static toNumber(value: any, defaultVal?: number): number {
        if (this.isNumber(value)) {
            return parseFloat(value);
        }
        return defaultVal != null ? defaultVal : NaN;
    }

    public static isBoolean(value: any): boolean {
        if (typeof value === 'boolean') {
            return true;
        }

        if (this.isNullOrEmptyOrUndefined(value)) {
            return false;
        }

        return false;
    }

    public static toBoolean(value: any, defaultVal?: boolean | null): boolean | null | undefined {
        if (this.isNullOrEmptyOrUndefined(value)) {
            return defaultVal;
        }

        if (this.isBoolean(value)) {
            return value;
        }

        if (value === 'true') {
            return true;
        }

        if (value === 'false') {
            return false;
        }

        return defaultVal;
    }

    public static getHashFragmentParams(customHashFragment?: string): any {
        let hash = customHashFragment || window.location.hash;

        hash = decodeURIComponent(hash);

        if (hash.indexOf('#') !== 0) {
            return {};
        }

        const questionMarkPosition = hash.indexOf('?');

        if (questionMarkPosition > -1) {
            hash = hash.substr(questionMarkPosition + 1);
        } else {
            hash = hash.substr(1);
        }

        return this.parseQueryString(hash);
    }

    public static parseQueryString(queryString: string): any {
        return JSON.parse('{"' + decodeURI(queryString.replace(/&/g, '","').replace(/=/g, '":"')) + '"}');
    }


    // public static setTouched(form: FormGroup | FormArray): void {
    //     Object.keys(form.controls).map((controlName: string) => {
    //         const control = form.get(controlName);
    //         if (control instanceof FormGroup) {
    //             this.setTouched(control);
    //         }
    //         if (control instanceof FormArray) {
    //             const formArray = control as FormArray;
    //             this.setTouched(formArray);
    //         }
    //         if (form.get(controlName)?.valid) {
    //             // if (form.get(controlName).value) {
    //             //     form.get(controlName).markAsTouched({ onlySelf: true });
    //             // }
    //         } else {
    //             form.get(controlName)?.markAsTouched({ onlySelf: true });
    //         }
    //     });
    // }



    public static cursorPositionFormatMask(value: string | null, formatMasks: string[], cleanString: Func<string | null, string | null | undefined>): IOltCursorPositionFormatted | null {
        let lastCharIndex = 0;
        const cleanValue = cleanString(value);
        if (cleanValue == null) {
            return null;
        }
        const charCount = cleanValue.replace(/\^/gm, '').length;
        if (charCount === 0) {
            return null;
        }
        const mask = formatMasks[charCount - 1];
        if (charCount > 1 && !mask) {
            return null;
        }
        let position;
        const formatted = mask
            .split('')
            .map((c, i) => {
                if (c === '1') {
                    // tslint:disable-next-line:triple-equals
                    if (cleanValue[lastCharIndex] == '^') {
                        position = i + 1;
                        lastCharIndex++;
                    }

                    lastCharIndex++;
                    return cleanValue[lastCharIndex - 1];
                } else {
                    return c;
                }
            })
            .join('');

        if (!position) {
            position = formatted.length;
        }

        position++; // because of '+'

        return {
            // formatted: `+${formatted}`,
            formatted: `${formatted}`,
            cursorPosition: position
        };
    }

}
