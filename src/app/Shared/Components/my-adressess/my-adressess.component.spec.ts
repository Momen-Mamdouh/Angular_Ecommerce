import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdressessComponent } from './my-adressess.component';

describe('MyAdressessComponent', () => {
  let component: MyAdressessComponent;
  let fixture: ComponentFixture<MyAdressessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAdressessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAdressessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
