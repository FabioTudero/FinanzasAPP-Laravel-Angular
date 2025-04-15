import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitPerCategoryComponent } from './limit-per-category.component';

describe('LimitPerCategoryComponent', () => {
  let component: LimitPerCategoryComponent;
  let fixture: ComponentFixture<LimitPerCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimitPerCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimitPerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
