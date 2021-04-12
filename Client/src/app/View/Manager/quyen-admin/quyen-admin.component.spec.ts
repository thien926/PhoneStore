import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuyenAdminComponent } from './quyen-admin.component';

describe('QuyenAdminComponent', () => {
  let component: QuyenAdminComponent;
  let fixture: ComponentFixture<QuyenAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuyenAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuyenAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
