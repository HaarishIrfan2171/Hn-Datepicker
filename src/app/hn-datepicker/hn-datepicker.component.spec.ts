import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgssDatepickerComponent } from './tgss-datepicker.component';

describe('TgssDatepickerComponent', () => {
  let component: TgssDatepickerComponent;
  let fixture: ComponentFixture<TgssDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgssDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgssDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
