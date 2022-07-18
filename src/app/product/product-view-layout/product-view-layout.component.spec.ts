import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewLayoutComponent } from './product-view-layout.component';

describe('ProductViewLayoutComponent', () => {
  let component: ProductViewLayoutComponent;
  let fixture: ComponentFixture<ProductViewLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductViewLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
