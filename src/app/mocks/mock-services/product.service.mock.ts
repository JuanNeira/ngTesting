import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

import { productListMock } from '../mock-data/products-mock';

@Injectable({
  providedIn: 'root'
})
export class MockProductsService {
  @Output() productsCounter = new EventEmitter<any>();

  constructor() { }

  manageCart() {
    localStorage.setItem('user-products', JSON.stringify(productListMock));
    this.productsCounter.emit(productListMock);
  }

  getData(): Observable<object> {
    return of(productListMock);
  }
}
