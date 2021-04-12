import { Component, OnInit } from '@angular/core';
import { QuyenService } from 'src/app/Services/quyen.service';
import { SanPhamService } from 'src/app/Services/san-pham.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-san-pham-admin',
  templateUrl: './san-pham-admin.component.html',
  styleUrls: ['./san-pham-admin.component.scss']
})
export class SanPhamAdminComponent implements OnInit {
  public title = "";
  public tool = false;    // tool = true có quyền sửa

  public CurrentNhanVien;
  public CurrentQuyen;

  public ListSP;
  constructor(private QService : QuyenService, private SPService : SanPhamService) { }

  ngOnInit(): void {
    this.CurrentNhanVien = JSON.parse(sessionStorage.getItem("CurrentNhanVien"));

    // Load Quyền
    this.QService.getQ(this.CurrentNhanVien.permission_id).subscribe(data => {
      if(data) {
        this.CurrentQuyen = data;
        if(data.details.indexOf("qlSanPham") >= 0) {
          this.title = "Quản lý sản phẩm";
          this.tool = true;
        }
        else if(data.details.indexOf("xemSanPham") >= 0){
          this.title = "Xem sản phẩm";
          this.tool = false;
        }
        else {
          location.href = window.location.origin + "/manager";
        }
      }
      else {
        Swal.fire({
          type : "error",
          title : "Lỗi load quyền",
          html : "SanPhamAdminComponent"
        });
      }
    },
    error => {
      Swal.fire({
        type : "error",
        title : "Lỗi load quyền => SanPhamAdminComponent",
        html : error.responseText
      });
    });

    // Load Sản Phẩm
    this.SPService.getSPs().subscribe(data => {
      if(data) {
        this.ListSP = data;
      }
      else {
        Swal.fire({
          type: "error",
          title : "lỗi load sản phẩm",
          html : "SanPhamAdminComponent"
        });
      }
    }, error => {
      Swal.fire({
        type: "error",
        title : "Lỗi load sản phẩm => SanPhamAdminComponent",
        html : error.responseText
      });
    });
  }

  public eventLogout() {
    sessionStorage.removeItem("CurrentNhanVien");
    location.reload();
  }

  public checkStatus(status : number) {
    if(status == 1) {
      return "Còn bán";
    }

    return "Hết bán";
  }
}
