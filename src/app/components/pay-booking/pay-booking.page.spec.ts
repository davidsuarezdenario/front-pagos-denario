import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayBookingPage } from './pay-booking.page';

describe('PayBookingPage', () => {
  let component: PayBookingPage;
  let fixture: ComponentFixture<PayBookingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PayBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
