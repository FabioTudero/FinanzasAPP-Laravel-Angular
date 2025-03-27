import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancePerMonthComponent } from './balance-per-month.component';

describe('BalancePerMonthComponent', () => {
  let component: BalancePerMonthComponent;
  let fixture: ComponentFixture<BalancePerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalancePerMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalancePerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
