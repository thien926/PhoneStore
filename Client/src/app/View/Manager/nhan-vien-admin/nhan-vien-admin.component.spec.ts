import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanVienAdminComponent } from './nhan-vien-admin.component';

describe('NhanVienAdminComponent', () => {
  let component: NhanVienAdminComponent;
  let fixture: ComponentFixture<NhanVienAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhanVienAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NhanVienAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
