import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

/* Angular Material Declarations */
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDividerModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatToolbarModule,
} from '@angular/material';

/* Components */
import { HeaderComponent } from './header.component';

/* Services */
import { ProductsService } from '../../services/products.service';

/* Mocks */
import { MockProductsService } from '../../mocks/mock-services/product.service.mock';
import { productListMock } from '../../mocks/mock-data/products-mock';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: ProductsService;
  let element: DebugElement;
  let spanDe: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
      ],
      imports: [
        MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDividerModule,
        MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule,
        MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatToolbarModule,
      ],
      providers: [{
        provide: ProductsService, useClass: MockProductsService
      }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    service = fixture.debugElement.injector.get(ProductsService);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.query(By.css('#cart'));
    spanDe = element.nativeElement;

    fixture.detectChanges();
  });

  it('TEST 0a: should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('TEST 0b: should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('TEST 1: should call a subscribeCounter method', () => {
    const spyEmitter = spyOn(service.productsCounter, 'emit').and.callThrough();
    const spySubcriber = spyOn(component, 'subscribeCounter');
    const spyCounter = spyOn(component, 'countProducts');

    component.subscribeCounter();
    service.productsCounter.emit(productListMock);

    expect(spySubcriber).toHaveBeenCalled();
    expect(spyCounter).toHaveBeenCalled();
    expect(spyEmitter).toHaveBeenCalled();
  });

  it('TEST 2: should call localstorageValidation method >> if branch', async () => {
    const spyValidator = spyOn(component, 'localstorageValidation');
    const spyCounter = spyOn(component, 'countProducts');

    localStorage.setItem('user-products', JSON.stringify(productListMock));
    await component.localstorageValidation();

    expect(spyCounter).toHaveBeenCalled();
    expect(spyValidator).toHaveBeenCalled();
  });

  it('TEST 3: should call localstorageValidation method >> else branch', async () => {
    localStorage.clear();
    const spyValidator = spyOn(component, 'localstorageValidation').and.callThrough();
    await component.localstorageValidation();
    const storage = await JSON.parse(localStorage.getItem('user-products'));

    expect(storage).toEqual([]);
    expect(spyValidator).toHaveBeenCalled();
  });

  it('TEST 4: should call countProducts method', () => {
    const spyCounter = spyOn(component, 'countProducts').and.callThrough();
    const counter = component.countProducts(productListMock);

    // Each products has a quantity of 1 >> total 9
    expect(counter).toEqual(9);
    expect(spyCounter).toHaveBeenCalled();
  });

  it('TEST 5: should count products and show quantity in the cart button', () => {
    const spyCounter = spyOn(component, 'countProducts').and.callThrough();
    let buttonText: string;

    component.productsQuantity = component.countProducts(productListMock);
    fixture.detectChanges();

    buttonText = spanDe.innerText;

    // Each products has a quantity of 1 >> total 9
    expect(component.productsQuantity).toEqual(9);
    expect(buttonText).toEqual('Cart (9)');
    expect(spyCounter).toHaveBeenCalled();
  });
});
