import { async, ComponentFixture, TestBed } from '@angular/core/testing';

/* Angular Material Declarations */
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDividerModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatToolbarModule, MatTableModule,
} from '@angular/material';

/* Components */
import { ShoppingCartComponent } from './shopping-cart.component';
import { ToClpPipe } from '../../pipes/to-clp.pipe';

/* Services */
import { ProductsService } from 'src/app/services/products.service';

/* Mocks */
import { MockHeaderComponent } from '../../mocks/mock-components/header.mock';
import { MockProductsService } from '../../mocks/mock-services/product.service.mock';
import { productMock } from '../../mocks/mock-data/product-mock';
import { productListMock } from '../../mocks/mock-data/products-mock';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let service: ProductsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShoppingCartComponent,
        MockHeaderComponent,
        ToClpPipe,
      ],
      imports: [
        MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDividerModule,
        MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule,
        MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatToolbarModule, MatTableModule,
      ],
      providers: [{
        provide: ProductsService, useClass: MockProductsService
      }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    service = fixture.debugElement.injector.get(ProductsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('TEST 0a: should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('TEST 0b: should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('TEST 1: should call onInit methods', () => {
    const spySubscriber = spyOn(component, 'subscribeCounter');
    const spyValidation = spyOn(component, 'localstorageValidation');
    component.ngOnInit();
    expect(spySubscriber).toHaveBeenCalled();
    expect(spyValidation).toHaveBeenCalled();
  });

  it('TEST 2: should call localstorageValidation method >> if branch', async () => {
    localStorage.setItem('user-products', JSON.stringify(productListMock));
    fixture.detectChanges();

    const products = JSON.parse(localStorage.getItem('user-products'));
    const spyValidation = spyOn(component, 'localstorageValidation').and.callThrough();
    const spyByProduct = spyOn(component, 'totalByProduct').and.callThrough();
    const spyByCart = spyOn(component, 'totalByCart').and.callThrough();
    expect(products).not.toBeNull();

    await component.localstorageValidation();
    fixture.detectChanges();

    expect(component.dataSourceProducts.length).toEqual(9);
    expect(component.totalCartPrice).toEqual(1800);
    expect(spyValidation).toHaveBeenCalled();
    expect(spyByProduct).toHaveBeenCalled();
    expect(spyByCart).toHaveBeenCalled();
  });

  it('TEST 3: should call localstorageValidation method >> else branch', async () => {
    localStorage.clear();
    fixture.detectChanges();

    const spyValidation = spyOn(component, 'localstorageValidation').and.callThrough();
    let products = JSON.parse(localStorage.getItem('user-products'));
    expect(products).toBeNull();

    await component.localstorageValidation();
    fixture.detectChanges();
    products = await JSON.parse(localStorage.getItem('user-products'));

    expect(products).toEqual([]);
    expect(spyValidation).toHaveBeenCalled();
  });

  it('TEST 4: should call subscribeCounter method', () => {
    const spySubscriber = spyOn(component, 'subscribeCounter').and.callThrough();
    const spyCounter = spyOn(service.productsCounter, 'emit').and.callThrough();
    const spyByProduct = spyOn(component, 'totalByProduct').and.callThrough();
    const spyByCart = spyOn(component, 'totalByCart').and.callThrough();

    component.subscribeCounter();
    service.productsCounter.emit(productListMock);
    fixture.detectChanges();

    expect(component.dataSourceProducts.length).toEqual(9);
    expect(component.totalCartPrice).toEqual(1800);
    expect(spySubscriber).toHaveBeenCalled();
    expect(spyByProduct).toHaveBeenCalled();
    expect(spyByCart).toHaveBeenCalled();
    expect(spyCounter).toHaveBeenCalled();
  });

  it('TEST 5: should call totalByProduct method', () => {
    const spyByProduct = spyOn(component, 'totalByProduct').and.callThrough();
    const totalByProduct = component.totalByProduct(productListMock);
    fixture.detectChanges();

    totalByProduct.forEach(element => {
      expect(element.totalPrice).toEqual(200);
    });
    expect(spyByProduct).toHaveBeenCalled();
  });

  it('TEST 6: should call totalByCart method', async () => {
    const spyByProduct = spyOn(component, 'totalByProduct').and.callThrough();
    const spyByCart = spyOn(component, 'totalByCart').and.callThrough();

    const totalByProduct = component.totalByProduct(productListMock);
    const totalByCart = component.totalByCart(totalByProduct);
    fixture.detectChanges();

    expect(totalByCart).toEqual(1800);
    expect(spyByCart).toHaveBeenCalled();
    expect(spyByProduct).toHaveBeenCalled();
  });

  it('TEST 7: should call productEmitter method', async () => {
    const spyEmitter = spyOn(component, 'productEmitter').and.callThrough();
    const spySetter = spyOn(service, 'manageCart').and.callThrough();
    const spyCounter = spyOn(service.productsCounter, 'emit').and.callThrough();

    service.productsCounter.subscribe(res => expect(res).toBeTruthy());
    component.productEmitter(productMock, '');
    fixture.detectChanges();

    expect(spyEmitter).toHaveBeenCalled();
    expect(spySetter).toHaveBeenCalled();
    expect(spyCounter).toHaveBeenCalled();
  });
});
