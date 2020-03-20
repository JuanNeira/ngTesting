import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes, ActivatedRoute } from '@angular/router';
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
import { ProductDetailComponent } from './product-detail.component';
import { ToClpPipe } from '../../pipes/to-clp.pipe';

/* Mocks */
import { MockHeaderComponent } from '../../mocks/mock-components/header.mock';
import { MockProductListComponent } from '../../mocks/mock-components/product-list.mock';
import { MockProductDetailComponent } from '../../mocks/mock-components/product-detail.mock';
import { productMock } from 'src/app/mocks/mock-data/product-mock';

const routes: Routes = [
  { path: 'products', component: MockProductListComponent },
  { path: 'products/:code', component: MockProductDetailComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
];

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  let router: Router;
  let route: ActivatedRoute;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductDetailComponent,
        MockHeaderComponent,
        MockProductListComponent,
        MockProductDetailComponent,
        ToClpPipe,
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDividerModule,
        MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule,
        MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatToolbarModule,
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          params: of(productMock)
        },
      }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.debugElement.componentInstance;

    location = fixture.debugElement.injector.get(Location);
    router = fixture.debugElement.injector.get(Router);
    route = fixture.debugElement.injector.get(ActivatedRoute);

    fixture.detectChanges();
  });

  it('TEST 0a: should create a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('TEST 0b: should create a router, ActivatedRoute and location instance ', () => {
    expect(router).toBeTruthy();
    expect(route).toBeTruthy();
    expect(location).toBeTruthy();
  });

  it('TEST 1: should call onInit methods ', () => {
    const spyGet = spyOn(component, 'getProduct');
    component.ngOnInit();
    expect(spyGet).toHaveBeenCalled();
  });

  it('TEST 2: should get product info from route params ', () => {
    /* route.params.subscribe(res => expect(res).toEqual(productMock)); */

    component.getProduct();
    fixture.detectChanges();

    const product = component.prodInfo;
    expect(product).toEqual(productMock);
  });

  it('TEST 3: should call goBack method ', () => {
    const spyBack = spyOn(component, 'goBack');

    component.goBack();
    fixture.detectChanges();

    expect(spyBack).toHaveBeenCalled();
  });
});
