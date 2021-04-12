import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhachHangAdminComponent } from './khach-hang-admin.component';

describe('KhachHangAdminComponent', () => {
  let component: KhachHangAdminComponent;
  let fixture: ComponentFixture<KhachHangAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhachHangAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhachHangAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
