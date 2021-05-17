import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestloadfileComponent } from './testloadfile.component';

describe('TestloadfileComponent', () => {
  let component: TestloadfileComponent;
  let fixture: ComponentFixture<TestloadfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestloadfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestloadfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
