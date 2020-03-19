import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Location } from '@angular/common';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() prodInfo;
  @Output() productToCart = new EventEmitter<any>();
  @ViewChild('productPrice', { static: true }) productPrice: ElementRef;
  isNotClickable: boolean = true;

  constructor(
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.setIsClickable();
  }

  productEmitter(type: string): void {
    const product = { ...this.prodInfo, type };
    this.productToCart.emit(product);
  }

  setIsClickable(): void {
    setTimeout(() => {
      const text = this.productPrice.nativeElement.innerText;
      this.isNotClickable = text === 'Price: N/A';
    }, 0.5);
  }

  goDetails(product): void {
    const url = `/products/${product.code}`;
    this.router.navigate([url, { ...product }]);
  }
}
