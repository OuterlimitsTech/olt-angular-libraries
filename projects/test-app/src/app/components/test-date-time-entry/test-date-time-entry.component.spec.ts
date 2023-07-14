import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDateTimeEntryComponent } from './test-date-time-entry.component';

describe('TestDateTimeEntryComponent', () => {
  let component: TestDateTimeEntryComponent;
  let fixture: ComponentFixture<TestDateTimeEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDateTimeEntryComponent]
    });
    fixture = TestBed.createComponent(TestDateTimeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
