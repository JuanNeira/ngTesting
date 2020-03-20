/* Product details mock component */
import { Component } from '@angular/core';
import { productMock } from '../mock-data/product-mock';

@Component({
    selector: 'app-product-detail',
    template: `
    <h4>{{prodInfo.name}}</h4>
    <span>{{prodInfo.description}}</span>
    <span>{{prodInfo.price}}</span>
  `
})
export class MockProductDetailComponent {
    prodInfo = productMock;
}

