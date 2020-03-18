import { Component, OnInit } from '@angular/core';

/* Services */
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  displayedColumns: Array<string> = ['Product', 'Description', 'Quantity', 'Options', 'Total'];
  dataSourceProducts: Array<any> = [];
  totalCartPrice: number = 0;

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit() {
    this.localstorageValidation();
    this.subscribeCounter();
  }

  /* Validation/update from products-service */
  subscribeCounter(): void {
    this.productsService.productsCounter.subscribe(
      res => {
        this.dataSourceProducts = this.totalByProduct(res);
        this.totalCartPrice = this.totalByCart(this.dataSourceProducts);
      }
    );
  }

  /* Initial localstorage info validation */
  async localstorageValidation(): Promise<void> {
    const productList = await JSON.parse(localStorage.getItem('user-products'));
    if (productList !== null) {
      this.dataSourceProducts = this.totalByProduct(productList);
      this.totalCartPrice = this.totalByCart(this.dataSourceProducts);
    } else {
      localStorage.setItem('user-products', JSON.stringify([]));
    }
  }

  /* Calculates total price for the quantity of a product */
  totalByProduct(products: Array<any>): Array<any> {
    const totalProductPrice = products.map(element => {
      const totalPrice = element.price * element.quantity;
      const product = { ...element, totalPrice };
      return product;
    });
    return totalProductPrice;
  }

  /* Calculates the total price of the cart */
  totalByCart(products: Array<any>): number {
    let totalCartPrice: number = 0;
    products.forEach(product => {
      totalCartPrice += parseInt(product.totalPrice, 10);
    });
    return totalCartPrice;
  }

  /* Emits the added/deleted product */
  productEmitter(prodInfo: object, type: string) {
    const product = { ...prodInfo, type };
    this.productsService.manageCart(product);
  }
}
