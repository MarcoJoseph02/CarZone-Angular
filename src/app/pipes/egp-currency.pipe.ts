import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'egpCurrency',
})
export class EgpCurrencyPipe implements PipeTransform {
  transform(value: number | undefined, ...args: unknown[]): unknown {
    if (value) {
      value = Math.ceil(value);
      let strValue = value.toString();

      let strArr = Array.from(strValue);
      strArr.reverse();

      for (let i = 0; i < strArr.length; i++) {
        if (i % 4 === 0) {
          strArr.splice(i, 0, ' ');
        }
      }
      strArr.reverse().pop();
      strValue = strArr.toString().replaceAll(',', '').replaceAll(' ', ',');

      strValue += ' EGP';
      return strValue;
    } else {
      return null;
    }
  }
}
