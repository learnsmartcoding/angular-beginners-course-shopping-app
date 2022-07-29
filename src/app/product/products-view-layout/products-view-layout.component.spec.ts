import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsViewLayoutComponent } from './products-view-layout.component';

describe('ProductsViewLayoutComponent', () => {
  let component: ProductsViewLayoutComponent;
  let fixture: ComponentFixture<ProductsViewLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsViewLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsViewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
