/* Mock class to test a directive */
import { Component } from '@angular/core';

@Component({
  template: `<span id="span" [appPriceColor]="mockValue"></span>`
})
export class MockPriceColorComponent {
  mockValue: string | number;
}
