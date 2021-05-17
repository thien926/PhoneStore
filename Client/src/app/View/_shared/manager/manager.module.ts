import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginAdminComponent } from '../../Manager/login-admin/login-admin.component';
import { BillAdminComponent } from '../../Manager/bill-admin/bill-admin.component';
import { MenuAdminComponent } from '../../Manager/menu-admin/menu-admin.component';
import { SanPhamAdminComponent } from '../../Manager/san-pham-admin/san-pham-admin.component';
import { QuyenAdminComponent } from '../../Manager/quyen-admin/quyen-admin.component';
import { LoaiSanPhamAdminComponent } from '../../Manager/loai-san-pham-admin/loai-san-pham-admin.component';
import { NhanVienAdminComponent } from '../../Manager/nhan-vien-admin/nhan-vien-admin.component';
import { KhachHangAdminComponent } from '../../Manager/khach-hang-admin/khach-hang-admin.component';
import { UserAdminComponent } from '../../Manager/user-admin/user-admin.component';



@NgModule({
  declarations: [
    ManagerComponent,
    LoginAdminComponent,
    BillAdminComponent,
    MenuAdminComponent,
    BillAdminComponent,
    SanPhamAdminComponent,
    QuyenAdminComponent,
    LoaiSanPhamAdminComponent,
    NhanVienAdminComponent,
    KhachHangAdminComponent,
    UserAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ManagerModule { }
