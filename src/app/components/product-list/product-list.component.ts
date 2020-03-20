import { Component, OnInit } from '@angular/core';

/* Services */
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Array<object> = [];

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  /* Add or delete elements to the cart */
  handleProductToCart(product) {
    this.productsService.manageCart(product);
  }

  /* Get all products */
  async getProducts() {
    const productList = await JSON.parse(localStorage.getItem('products-list'));

    // productList !== null ?
    //   this.products = JSON.parse(localStorage.getItem('products-list')) :
    //   localStorage.setItem('products-list', JSON.stringify([]));

    if (productList !== null) {
      this.products = productList;
    } else {
      this.productsService.getData().subscribe(res => {
        localStorage.setItem('products-list', JSON.stringify(res));
      });
    }
  }
}
