import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewContentComponent } from './product-view-content.component';

describe('ProductViewContentComponent', () => {
  let component: ProductViewContentComponent;
  let fixture: ComponentFixture<ProductViewContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductViewContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
