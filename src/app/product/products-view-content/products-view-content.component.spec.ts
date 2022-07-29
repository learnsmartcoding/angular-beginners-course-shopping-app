import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsViewContentComponent } from './products-view-content.component';

describe('ProductsViewContentComponent', () => {
  let component: ProductsViewContentComponent;
  let fixture: ComponentFixture<ProductsViewContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsViewContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsViewContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
