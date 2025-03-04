import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessLoaderComponent } from './success-loader.component';

describe('SuccessLoaderComponent', () => {
  let component: SuccessLoaderComponent;
  let fixture: ComponentFixture<SuccessLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
