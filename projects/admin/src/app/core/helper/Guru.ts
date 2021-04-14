export class Guru {
  static isValidObj(obj: any): boolean {
    return obj !== undefined && obj !== null;
  }
  static isValidList(obj: any): boolean {
    return this.isValidObj(obj) && obj.length > 0;
  }
  static isString(obj: any): boolean {
    return this.isValidObj(obj) && typeof obj === 'string';
  }
  static isNumber(obj: any): boolean {
    return this.isValidObj(obj) && typeof obj === 'number';
  }
  static isEmptyString(obj: any): boolean {
    return this.isString(obj) && obj === '';
  }
  static isValidString(obj: any): boolean {
    return this.isString(obj) && obj !== '';
  }
  static isValidNumber(obj: any): boolean {
    return this.isNumber(obj) && obj !== 0 && obj !== '';
  }
  static replaceSplChar(Text: string): string {
    return (this.isValidObj(Text) ? Text.trim() // Remove surrounding whitespace.
      .toLowerCase() // LowerCase.
      // tslint:disable-next-line: max-line-length
      .replace(/[^a-z0-9]+/g, '-')  // Find everything that is not a lowercase letter or number, one or more times, globally, and replace it with a dash.
      .replace(/^-+/, '') // Remove all dashes from the beginning of the string.
      .replace(/-+$/, '') // Remove all dashes from the end of the string.
      .toUpperCase() // UpperCase.
      : '');
  }
}
