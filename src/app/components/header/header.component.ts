import { Component, OnInit } from '@angular/core';

/* Services */
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productsQuantity: number = 0;

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit() {
    this.localstorageValidation();
    this.subscribeCounter();
  }

  /* Validation/update from products-service */
  subscribeCounter() {
    this.productsService.productsCounter.subscribe(
      res => { this.productsQuantity = this.countProducts(res); }
    );
  }

  /* Initial localstorage info validation */
  async localstorageValidation() {
    const productList = await JSON.parse(localStorage.getItem('user-products'));
    if (productList !== null) {
      this.productsQuantity = this.countProducts(productList);
    } else {
      localStorage.setItem('user-products', JSON.stringify([]));
    }
  }

  countProducts(productList): number {
    let counter: number = 0;
    productList.forEach(element => {
      counter += element.quantity;
    });
    return counter;
  }
}
