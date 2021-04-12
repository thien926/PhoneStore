import { Component, OnInit } from '@angular/core';
import { ChiTietHoaDonService } from 'src/app/Services/chi-tiet-hoa-don.service';
import { HoaDonService } from 'src/app/Services/hoa-don.service';
import { QuyenService } from 'src/app/Services/quyen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bill-admin',
  templateUrl: './bill-admin.component.html',
  styleUrls: ['./bill-admin.component.scss']
})
export class BillAdminComponent implements OnInit {
  public title = "";
  public tool = false;    // tool = true có quyền sửa

  public CurrentNhanVien;
  public CurrentQuyen;
  public ListHD;

  public ListCTHD;

  public cthd_thanhtien = 0;
  public cthd_code = null;

  constructor(private QService : QuyenService, private HDService : HoaDonService,
    private CTHDService : ChiTietHoaDonService) { }

  ngOnInit(): void {
    this.CurrentNhanVien = JSON.parse(sessionStorage.getItem("CurrentNhanVien"));

    // Load Quyền
    this.QService.getQ(this.CurrentNhanVien.permission_id).subscribe(data => {
      if(data) {
        this.CurrentQuyen = data;
        if(data.details.indexOf("qlHoaDon") >= 0) {
          this.title = "Quản lý hóa đơn";
          this.tool = true;
        }
        else if(data.details.indexOf("xemHoaDon") >= 0) {
          this.title = "Xem hóa đơn";
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
          html : "BillAdminComponent"
        });
      }
    },
    error => {
      Swal.fire({
        type : "error",
        title : "Lỗi load quyền => BillAdminComponent",
        html : error.responseText
      });
    });

    // Load Hóa đơn
    this.HDService.getHDs().subscribe(data => {
      if(data) {
        this.ListHD = data;
      }
      else {
        Swal.fire({
          type: "error",
          title : "lỗi load hóa đơn",
          html : "BillAdminComponent"
        });
      }
    }, error => {
      Swal.fire({
        type: "error",
        title : "Lỗi load hóa đơn => BillAdminComponent",
        html : error.responseText
      });
    });
  }

  public eventSeeMore(bill_id : number) {
    this.CTHDService.getCTHDBy_BillID(bill_id).subscribe(data => {
      if(data) {
        this.ListCTHD = data;
        // console.log("Chi tiết hóa đơn: ", data);
      }
      else {
        Swal.fire({
          type: "error",
          title : "Lỗi load chi tiết hóa đơn => data = null",
          html : "BillAdminComponent"
        });
      }
    }, error => {
      Swal.fire({
        type: "error",
        title : "Lỗi load chi tiết hóa đơn => BillAdminComponent",
        html : error.responseText
      });
    });

    this.cthd_code = bill_id;
    this.cthd_thanhtien = 0;
    this.ListHD.forEach(element => {
      if(element.bill_id == bill_id) {
        this.cthd_thanhtien = element.total;
      }
    });
  }

  public eventLogout() {
    sessionStorage.removeItem("CurrentNhanVien");
    location.reload();
  }

  public getStatus(status : number) {
    switch(status) {
      case 1 : {
        return "Đang xử lý";
      }
      case 2 : {
        return "Đang giao hàng";
      }
      case 3 : {
        return "Đã giao hàng";
      }
      case 4 : {
        return "Đã hủy đơn hàng";
      }
      default : return "";
    }
  }
}
