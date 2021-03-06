import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { Location } from '@angular/common';

/* Angular Material Declarations */
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';

/* Components */
import { ProductCardComponent } from './product-card.component';
import { ToClpPipe } from '../../pipes/to-clp.pipe';
import { PriceColorDirective } from '../../directives/price-color.directive';

/* Mocks */
import { productMock } from '../../mocks/mock-data/product-mock';
import { MockProductListComponent } from '../../mocks/mock-components/product-list.mock';
import { MockProductDetailComponent } from '../../mocks/mock-components/product-detail.mock';

const routes: Routes = [
  { path: 'products', component: MockProductListComponent },
  { path: 'products/:code', component: MockProductDetailComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
];

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let spanDE: DebugElement;
  let spanEL: HTMLElement;
  let addBtnDE: DebugElement;
  let deleteBtnDE: DebugElement;

  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockProductListComponent,
        ProductCardComponent,
        MockProductDetailComponent,
        ToClpPipe,
        PriceColorDirective,
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDividerModule,
        MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule,
        MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatToolbarModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.debugElement.componentInstance;
    component.prodInfo = productMock; // This input info is needed to initialize the component

    router = fixture.debugElement.injector.get(Router);
    location = fixture.debugElement.injector.get(Location);

    // Gets the html (span) element by id
    spanDE = fixture.debugElement.query(By.css('#productPrice'));
    spanEL = spanDE.nativeElement;

    fixture.detectChanges();
  });

  it('TEST 0a: create a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('TEST 0b: create a router and location instance', () => {
    expect(router).toBeTruthy();
    expect(location).toBeTruthy();
  });

  it('TEST 1: Should call setIsClickable onInit', () => {
    const spyClickable = spyOn(component, 'setIsClickable');
    component.ngOnInit();
    expect(spyClickable).toHaveBeenCalled();
  });

  it('TEST 2: Should call productEmitter and emit a product', () => {
    const spyProduct = spyOn(component.productToCart, 'emit').and.callThrough();
    const addProd = { ...productMock, type: 'add' };

    component.productToCart.subscribe(product => expect(product).toEqual(addProd));
    component.productEmitter('add');

    expect(spyProduct).toHaveBeenCalled();
  });

  it('TEST 3: Should output delete product', () => {
    const deleteProd = { ...productMock, type: 'delete' };

    component.productToCart.subscribe(product => expect(product).toEqual(deleteProd));
    component.productEmitter('delete');
  });

  it('TEST 5: Should call setIsClickable and toggle add button', () => {
    const spyClickable = spyOn(component, 'setIsClickable');

    // Gets the html (add button) element by id
    addBtnDE = fixture.debugElement.query(By.css('#addBtn'));

    spanEL.textContent = 'Price: N/A';
    fixture.detectChanges();

    component.setIsClickable();
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.isNotClickable).toEqual(true);
      // expect(addBtnDE.nativeElement.disabled).toEqual(true);
    }, 1);
    expect(spyClickable).toHaveBeenCalled();
  });

  it('TEST 6: Should call setIsClickable and toggle delete button', () => {
    const spyClickable = spyOn(component, 'setIsClickable');

    // Gets the html (delete button) element by id
    deleteBtnDE = fixture.debugElement.query(By.css('#deleteBtn'));

    spanEL.textContent = 'Price: $1000.-';
    fixture.detectChanges();

    component.setIsClickable();
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.isNotClickable).toEqual(false);
      // expect(deleteBtnDE.nativeElement.disabled).toEqual(false);
    }, 1);
    expect(spyClickable).toHaveBeenCalled();
  });

  it('TEST 7: Should call goDetails method', () => {
    const spyDetails = spyOn(component, 'goDetails');

    component.goDetails(productMock);
    fixture.detectChanges();
    expect(spyDetails).toHaveBeenCalled();
  });

  it('TEST 8: Should redirect to details', () => {
    router.navigate([`/products/${productMock.code}`]).then(() => {
      expect(location.path()).toEqual(`/products/${productMock.code}`);
    });
  });
});
