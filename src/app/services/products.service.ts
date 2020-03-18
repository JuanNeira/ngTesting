import { Injectable, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';

import { productListMock } from '../mocks/mock-data/products-mock';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  @Output() productsCounter = new EventEmitter<any>();

  constructor(
    // private http: HttpClient,
  ) { }

  manageCart(product) {
    const productList = JSON.parse(localStorage.getItem('user-products')) || []; // Validate that the list of products is not null
    let newProductList: Array<object>;

    /* 1. Add elements/ Count quantities */
    if (product.type === 'add') {
      newProductList = this.addProducts(product, productList);
    }

    /* 2. Delete elements/ Substract quantities */
    if (product.type === 'delete') {
      newProductList = this.deleteProducts(product, productList);
    }

    /* 3. Delete all elements */
    if (product.type === 'deleteAll') {
      newProductList = this.deleteAllProducts(product, productList);
    }

    /* 4. Sets new localstorage element and emits it */
    localStorage.setItem('user-products', JSON.stringify(newProductList));
    this.productsCounter.emit(newProductList);
  }

  addProducts(product, productList): Array<object> {
    const exists = productList.filter(p => p.code === product.code);
    if (exists.length > 0) {
      productList.map(p => {
        p.quantity = p.code === product.code ? p.quantity + 1 : p.quantity;
        return p;
      });
    } else {
      product.quantity += 1;
      productList.push(product);
    }
    return productList;
  }

  deleteProducts(product, productList): Array<object> {
    const filteredProduct = productList.find(p => p.code === product.code); // Validate that the filtered product is not undefined
    let filteredProducts: Array<object> = [];
    if (filteredProduct !== undefined) {
      if (filteredProduct.quantity === 1) {
        filteredProducts = productList.filter(p => p.code !== product.code);
      }
      if (filteredProduct.quantity > 1) {
        filteredProducts = productList.map(p => {
          p.quantity = p.code === filteredProduct.code ? p.quantity - 1 : p.quantity;
          return p;
        });
      }
      productList = filteredProducts;
    }
    return productList;
  }

  deleteAllProducts(product, productList): Array<object> {
    const filteredProducts: Array<object> = productList.filter(p => p.code !== product.code);
    return filteredProducts;
  }

  /* Returns some data */
  getData() {
    /*
    *  Por ejemplo:
    *  const headers = new HttpHeaders().append('Content-type', 'application/json');
    *  this.http.get('https://ejemplo.com/api/ms-mkay', { headers });
    *
    *  Suscripción en el componente:
    *  Observable >> this.getData().subscribe( res => { alert(res); }, err => { alert(err); });
    *  Promise    >> this.getData().toPromise().then( res => { alert(res); }, err => { alert(err); });
    */

    return of(productListMock);
  }
}
