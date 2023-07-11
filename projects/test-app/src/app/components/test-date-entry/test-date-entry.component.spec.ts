import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDateEntryComponent } from './test-date-entry.component';

describe('TestDateEntryComponent', () => {
  let component: TestDateEntryComponent;
  let fixture: ComponentFixture<TestDateEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDateEntryComponent]
    });
    fixture = TestBed.createComponent(TestDateEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
