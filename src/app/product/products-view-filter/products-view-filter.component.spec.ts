import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsViewFilterComponent } from './products-view-filter.component';

describe('ProductsViewFilterComponent', () => {
  let component: ProductsViewFilterComponent;
  let fixture: ComponentFixture<ProductsViewFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsViewFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsViewFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
