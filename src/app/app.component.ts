import { Component, OnInit } from '@angular/core';

import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  products: Array<object> = [
    { code: 1, name: 'AD', description: 'Some AD product description', price: '1500', quantity: 0 },
    { code: 2, name: 'B', description: 'Some B product description', price: '2490', quantity: 0 },
    { code: 3, name: 'AB', description: 'Some AB product description', price: '3990', quantity: 0 },
    { code: 4, name: 'D', description: 'Some D product description', price: '2000', quantity: 0 },
    { code: 5, name: 'C', description: 'Some C product description', price: '2100', quantity: 0 },
    { code: 6, name: 'CD', description: 'Some CD product description', price: 'q', quantity: 0 },
    { code: 7, name: 'H', description: 'Some H product description', price: '', quantity: 0 },
    { code: 8, name: 'J', description: 'Some J product description', price: '9990', quantity: 0 },
    { code: 9, name: 'HB', description: 'Some HB product description', price: '490', quantity: 0 },
  ];

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit() {
    this.setProducts();
  }

  /* TESTING METHOD */
  async setProducts() {
    const productList = await JSON.parse(localStorage.getItem('products-list'));
    if (productList === null) {
      // this.productsService.getData().subscribe(res => console.log(res));
      localStorage.setItem('products-list', JSON.stringify(this.products));
    }
  }
}
