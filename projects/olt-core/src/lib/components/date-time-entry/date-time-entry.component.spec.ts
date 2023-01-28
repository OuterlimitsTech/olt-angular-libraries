import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeEntryComponent } from './date-time-entry.component';

describe('DateTimeEntryComponent', () => {
  let component: DateTimeEntryComponent;
  let fixture: ComponentFixture<DateTimeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateTimeEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateTimeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
