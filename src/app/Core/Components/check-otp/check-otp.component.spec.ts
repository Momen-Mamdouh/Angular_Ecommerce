import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOTPComponent } from './check-otp.component';

describe('CheckOTPComponent', () => {
  let component: CheckOTPComponent;
  let fixture: ComponentFixture<CheckOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckOTPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
