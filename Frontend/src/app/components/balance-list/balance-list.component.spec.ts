import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceListComponent } from './balance-list.component';

describe('BalanceListComponent', () => {
  let component: BalanceListComponent;
  let fixture: ComponentFixture<BalanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
