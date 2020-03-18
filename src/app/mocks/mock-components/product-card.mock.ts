/* Product card mock component */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { productMock } from '../mock-data/product-mock';

@Component({
  selector: 'app-product-card',
  template: `<mat-card></mat-card>`
})
export class MockProductCardComponent {
  @Input() prodInfo;
  @Output() productToCart = new EventEmitter<any>();

  productEmitter(type: string) {
    const product = { ...productMock, type };
    this.productToCart.emit(product);
  }
}
