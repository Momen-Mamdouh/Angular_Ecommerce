import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayOutComponent } from './main-lay-out.component';

describe('MainLayOutComponent', () => {
  let component: MainLayOutComponent;
  let fixture: ComponentFixture<MainLayOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
