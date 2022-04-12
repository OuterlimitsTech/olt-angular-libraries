import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticPhoneEntryComponent } from './domestic-phone-entry.component';

describe('DomesticPhoneEntryComponent', () => {
  let component: DomesticPhoneEntryComponent;
  let fixture: ComponentFixture<DomesticPhoneEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomesticPhoneEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticPhoneEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
