import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toClpPipe'
})
export class ToClpPipe implements PipeTransform {
  transform(value: any): string {
    const price = parseInt(value, 10);

    if (price) {
      return `$${value}.-`;
    }
    return `N/A`;
  }
}
