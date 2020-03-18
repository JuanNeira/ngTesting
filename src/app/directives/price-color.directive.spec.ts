import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PriceColorDirective } from './price-color.directive';
import { MockPriceColorComponent } from '../mocks/mock-components/price-color.mock';

describe('PriceColorDirective', () => {
  let fixture: ComponentFixture<MockPriceColorComponent>;
  let component: MockPriceColorComponent;
  let spanDe: DebugElement;
  let span: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PriceColorDirective,
        MockPriceColorComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockPriceColorComponent);
    component = fixture.debugElement.componentInstance;
    spanDe = fixture.debugElement.query(By.css('#span'));
    span = spanDe.nativeElement;

    fixture.detectChanges();
  });

  it('TEST 0: should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('TEST 1: should paint a red text', () => {
    component.mockValue = 'N/A';
    fixture.detectChanges();

    expect(span.style.color).toBe('red');
  });

  it('TEST 2: should paint a green text', () => {
    component.mockValue = '1000';
    fixture.detectChanges();

    expect(span.style.color).toBe('green');
  });
});
