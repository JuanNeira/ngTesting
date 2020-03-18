import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() prodInfo;
  @Output() productToCart = new EventEmitter<any>();
  @ViewChild('productPrice') productPrice: ElementRef;
  isNotClickable: boolean = true;

  constructor() { }

  ngOnInit() {
    this.setIsClickable();
  }

  productEmitter(type: string) {
    const product = { ...this.prodInfo, type };
    this.productToCart.emit(product);
  }

  setIsClickable() {
    setTimeout(() => {
      const text = this.productPrice.nativeElement.innerText;
      this.isNotClickable = text === 'Price: N/A';
    }, 0.5);
  }
}
