import { async, ComponentFixture, TestBed } from '@angular/core/testing';

/* Angular Material Declarations */
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDividerModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatToolbarModule,
} from '@angular/material';

/* Components */
import { ProductDetailComponent } from './product-detail.component';

/* Mocks */
import { MockHeaderComponent } from '../../mocks/mock-components/header.mock';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductDetailComponent,
        MockHeaderComponent,
      ],
      imports: [
        MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDividerModule,
        MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule,
        MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatToolbarModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
