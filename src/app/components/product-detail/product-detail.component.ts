import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  prodInfo;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private location: Location,
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.route.params.subscribe(res => this.prodInfo = res);
  }

  goBack() {
    this.router.navigate(['/products']);
    // this.location.back();
  }
}
