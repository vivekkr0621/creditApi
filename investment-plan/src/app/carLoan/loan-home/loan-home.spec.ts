import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanHome } from './loan-home';

describe('LoanHome', () => {
  let component: LoanHome;
  let fixture: ComponentFixture<LoanHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
