import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

/* Services */
import { ProductsService } from './services/products.service';

/* Mocks */
import { MockProductsService } from './mocks/mock-services/product.service.mock';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let service: ProductsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule,
      ],
      providers: [{
        provide: ProductsService, useClass: MockProductsService
      }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    service = fixture.debugElement.injector.get(ProductsService);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('TEST 0a: should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('TEST 0b: should create the service', () => {
    expect(component).toBeTruthy();
  });

  it('TEST 1: should call method', () => {
    const products = [
      { code: 1, name: 'AD', description: 'Some AD product description', price: '1500', quantity: 0 },
      { code: 2, name: 'B', description: 'Some B product description', price: '2490', quantity: 0 },
    ];

    component.products = products;
    fixture.detectChanges();

    expect(component.products).toEqual(products);
  });

  it('TEST 2: should call onInit method/s', () => {
    const spy = spyOn(component, 'setProducts');

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('TEST 3: should call method', async () => {
    localStorage.clear();
    fixture.detectChanges();

    const spy = spyOn(component, 'setProducts').and.callThrough();
    let products = await JSON.parse(localStorage.getItem('products-list'));
    expect(products).toBeNull();

    await component.setProducts();
    fixture.detectChanges();
    products = await JSON.parse(localStorage.getItem('products-list'));

    expect(spy).toHaveBeenCalled();
    expect(products).not.toBeNull();
  });
});
