import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
import { ProductListComponent } from './product-list.component';

/* Services */
import { ProductsService } from '../../services/products.service';

/* Mocks */
import { MockHeaderComponent } from '../../mocks/mock-components/header.mock';
import { MockProductCardComponent } from '../../mocks/mock-components/product-card.mock';
import { MockProductsService } from '../../mocks/mock-services/product.service.mock';
import { productListMock } from 'src/app/mocks/mock-data/products-mock';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let service: ProductsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductListComponent,
        MockHeaderComponent,
        MockProductCardComponent,
      ],
      imports: [
        MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDividerModule,
        MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule,
        MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatToolbarModule,
      ],
      providers: [{
        provide: ProductsService, useClass: MockProductsService
      }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    service = fixture.debugElement.injector.get(ProductsService);
    component = fixture.debugElement.componentInstance;
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
    const spyGet = spyOn(component, 'getProducts');
    component.ngOnInit();
    expect(spyGet).toHaveBeenCalled();
  });

  it('TEST 2: should call getProducts >> if branch', () => {
    localStorage.setItem('products-list', JSON.stringify(productListMock));
    fixture.detectChanges();

    const products = JSON.parse(localStorage.getItem('products-list'));
    const spyGet = spyOn(component, 'getProducts');

    component.getProducts();
    fixture.detectChanges();

    expect(products).not.toBeNull();
    expect(spyGet).toHaveBeenCalled();
  });

  it('TEST 3: should call getProducts >> else branch', async () => {
    localStorage.clear();
    fixture.detectChanges();

    let products = JSON.parse(localStorage.getItem('products-list'));
    const spyGet = spyOn(component, 'getProducts').and.callThrough();
    expect(products).toBeNull();

    await component.getProducts();
    fixture.detectChanges();
    products = await JSON.parse(localStorage.getItem('products-list'));

    expect(products).toEqual([]);
    expect(spyGet).toHaveBeenCalled();
  });

  it('TEST 4: should call handleProductToCart and its service', () => {
    const spyHandler = spyOn(component, 'handleProductToCart').and.callThrough();
    const spyService = spyOn(service, 'manageCart').and.callThrough();
    const spyEmitter = spyOn(service.productsCounter, 'emit').and.callThrough();

    component.handleProductToCart({});

    expect(spyHandler).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalled();
    expect(spyEmitter).toHaveBeenCalled();
  });
});
