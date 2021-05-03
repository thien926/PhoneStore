import { Component, OnInit } from '@angular/core';
import { QuyenService } from 'src/app/Services/quyen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {
  private CurrentNhanVien;
  public CurrentQuyen;
  public page = "";

  public per_sp = false;
  public per_nh = false;
  public per_nv = false;
  public per_hd = false;
  public per_kh = false;
  public per_pn = false;
  public per_ncc = false;
  public per_tk = false;
  public per_per = false;
  public per_tke = false;
  public per_lsp = false;

  constructor(private QService : QuyenService) { }

  ngOnInit(): void {
    var pathName = window.location.pathname;
    if(pathName.indexOf("/manager/bill") >= 0) {
      this.page = "bill";
    }
    if(pathName.indexOf("/manager/product") >= 0) {
      this.page = "product";
    }
    if(pathName.indexOf("/manager/permission") >= 0) {
      this.page = "permission";
    }
    if(pathName.indexOf("/manager/type") >= 0) {
      this.page = "type";
    }
    if(pathName.indexOf("/manager/customer") >= 0) {
      this.page = "customer";
    }
    if(pathName.indexOf("/manager/staff") >= 0) {
      this.page = "staff";
    }
    if(pathName.indexOf("/manager/user") >= 0) {
      this.page = "user";
    }

    this.CurrentNhanVien = JSON.parse(sessionStorage.getItem("CurrentNhanVien"));
    this.QService.getQ(this.CurrentNhanVien.permission_id).subscribe(data => {
      if(data) {
        this.CurrentQuyen = data;
        this.loadListMenu();
      }
      else {
        Swal.fire({
          type : "error",
          title : "Lỗi load quyền",
          html : "MenuAdminComponent"
        });
      }
    },
    error => {
      Swal.fire({
        type : "error",
        title : "Lỗi load quyền => MenuAdminComponent",
        html : error.responseText
      });
    });

    
  }

  public loadListMenu() {
    this.per_nh = this.checkQuyen('NhapHang');
    this.per_nv = this.checkQuyen('NhanVien');
    this.per_sp = this.checkQuyen('SanPham');
    this.per_hd = this.checkQuyen('HoaDon');
    this.per_kh = this.checkQuyen('KhachHang');
    this.per_pn = this.checkQuyen('PhieuNhap');
    this.per_ncc = this.checkQuyen('NCC');
    this.per_tk = this.checkQuyen('TaiKhoan');
    this.per_per = this.checkQuyen('Quyen');
    this.per_tke = this.checkQuyen('ThongKe');
    this.per_lsp = this.checkQuyen('LoaiSanPham');
    // console.log("QUyen: ", this.CurrentQuyen);
  }

  public checkQuyen(data) {
    if(this.CurrentQuyen.details.indexOf(data) >= 0) {
      return true;
    }
    return false;
  }

}
