import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanPhamAdminComponent } from './san-pham-admin.component';

describe('SanPhamAdminComponent', () => {
  let component: SanPhamAdminComponent;
  let fixture: ComponentFixture<SanPhamAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanPhamAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanPhamAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
