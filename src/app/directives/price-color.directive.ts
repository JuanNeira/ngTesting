import { Directive, ElementRef, Renderer2, OnChanges, Input } from '@angular/core';

@Directive({
  selector: '[appPriceColor]'
})
export class PriceColorDirective implements OnChanges {
  @Input('appPriceColor') price: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnChanges() {
    this.isValidPrice();
  }

  isValidPrice(): void {
    const price = parseInt(this.price, 10);
    const color: string = isNaN(price) ? 'red' : 'green';
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
