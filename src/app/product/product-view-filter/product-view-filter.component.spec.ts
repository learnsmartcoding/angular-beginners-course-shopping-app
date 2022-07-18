import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewFilterComponent } from './product-view-filter.component';

describe('ProductViewFilterComponent', () => {
  let component: ProductViewFilterComponent;
  let fixture: ComponentFixture<ProductViewFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductViewFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
