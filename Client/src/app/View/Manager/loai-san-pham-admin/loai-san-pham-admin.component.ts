import { Component, OnInit } from '@angular/core';
import { LoaiSanPhamService } from 'src/app/Services/loai-san-pham.service';
import { QuyenService } from 'src/app/Services/quyen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loai-san-pham-admin',
  templateUrl: './loai-san-pham-admin.component.html',
  styleUrls: ['./loai-san-pham-admin.component.scss']
})
export class LoaiSanPhamAdminComponent implements OnInit {
  public title = "";
  public tool = false;    // tool = true có quyền sửa

  public CurrentNhanVien;
  public CurrentQuyen;

  public ListLSP;
  constructor(private QService : QuyenService, private LSPService : LoaiSanPhamService) { }

  ngOnInit(): void {
    this.CurrentNhanVien = JSON.parse(sessionStorage.getItem("CurrentNhanVien"));

    // Load Quyền
    this.QService.getQ(this.CurrentNhanVien.permission_id).subscribe(data => {
      if(data) {
        this.CurrentQuyen = data;
        if(data.details.indexOf("qlSanPham") >= 0) {
          this.title = "Quản lý loại sản phẩm";
          this.tool = true;
        }
        else if(data.details.indexOf("xemSanPham") >= 0){
          this.title = "Xem loại sản phẩm";
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
          html : "LoaiSanPhamAdminComponent"
        });
      }
    },
    error => {
      Swal.fire({
        type : "error",
        title : "Lỗi load quyền => LoaiSanPhamAdminComponent",
        html : error.responseText
      });
    });

    // Load Loại Sản Phẩm
    this.LSPService.getLSPs().subscribe(data => {
      if(data) {
        this.ListLSP = data;
      }
      else {
        Swal.fire({
          type: "error",
          title : "lỗi load loại sản phẩm",
          html : "LoaiSanPhamAdminComponent"
        });
      }
    }, error => {
      Swal.fire({
        type: "error",
        title : "Lỗi load loại sản phẩm => LoaiSanPhamAdminComponent",
        html : error.responseText
      });
    });
  }

  public eventLogout() {
    sessionStorage.removeItem("CurrentNhanVien");
    location.reload();
  }

}
