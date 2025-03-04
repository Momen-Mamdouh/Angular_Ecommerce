import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHeadingComponent } from './form-heading.component';

describe('FormHeadingComponent', () => {
  let component: FormHeadingComponent;
  let fixture: ComponentFixture<FormHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHeadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
