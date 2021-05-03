import { Component, OnInit } from '@angular/core';
import { KhachHangService } from 'src/app/Services/khach-hang.service';
import { QuyenService } from 'src/app/Services/quyen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-khach-hang-admin',
  templateUrl: './khach-hang-admin.component.html',
  styleUrls: ['./khach-hang-admin.component.scss']
})
export class KhachHangAdminComponent implements OnInit {
  public title = "";
  public tool = false;    // tool = true có quyền sửa

  public CurrentNhanVien;
  public CurrentQuyen;
  public ListKH;

  public type = "all";
  public input = "";

  constructor(private QService : QuyenService, private KHService : KhachHangService) { }

  ngOnInit(): void {
    this.CurrentNhanVien = JSON.parse(sessionStorage.getItem("CurrentNhanVien"));

    // Load Quyền
    this.QService.getQ(this.CurrentNhanVien.permission_id).subscribe(data => {
      if(data) {
        this.CurrentQuyen = data;
        if(data.details.indexOf("qlKhachHang") >= 0) {
          this.title = "Quản lý khách hàng";
          this.tool = true;
        }
        else if(data.details.indexOf("xemKhachHang") >= 0) {
          this.title = "Xem khách hàng";
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
          html : "KhachHangAdminComponent"
        });
      }
    },
    error => {
      Swal.fire({
        type : "error",
        title : "Lỗi load quyền => KhachHangAdminComponent",
        html : error.responseText
      });
    });

    this.loadKH();
  }

  public loadKH() {
    // Load khách hàng
    this.KHService.getKHs().subscribe(data => {
      if(data) {
        this.ListKH = data;
      }
      else {
        Swal.fire({
          type: "error",
          title : "lỗi load khách hàng",
          html : "KhachHangAdminComponent"
        });
      }
    }, error => {
      Swal.fire({
        type: "error",
        title : "Lỗi load khách hàng => KhachHangAdminComponent",
        html : error.responseText
      });
    });
  }

  public checkStatus(status : number) {
    if(status == 1) {
      return "Hiện";
    }

    return "Ẩn";
  }

  public eventLogout() {
    sessionStorage.removeItem("CurrentNhanVien");
    location.reload();
  }

  public eventTimKiem() {
    const newProfile = {
      type : this.type,
      input : this.input
    };

    this.KHService.manager_khTimKiem(newProfile).subscribe(data => {
      this.ListKH = data;
      // console.log("Khách hàng: ", data);
    },
    error => {
      Swal.fire({
        type : "error",
        title : "Lỗi tìm kiếm",
        html : error.responseText
      })
    });
  }

  public RemoveKH(user) {
    Swal.fire({
      type: "question",
      title: "Xác nhận",
      text: "Bạn có muốn khóa tài khoản "+ user +"?",
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.value) {
          this.KHService.getKH(user).subscribe(data => {
            data.status = 0;

            this.KHService.UpdateKH(data).subscribe(data => {
              Swal.fire({
                type: 'success',
                title: 'Đã khóa thành công'
              }).then(result => {
                this.loadKH();
              });
            }, error => {
              Swal.fire({
                type: 'error',
                title: 'Lỗi khóa tài khoản này',
                html: error.responseText
              });
            });
          });
        }
    });
  }

  public BackKH(user) {
    Swal.fire({
      type: "question",
      title: "Xác nhận",
      text: "Bạn có muốn mở khóa tài khoản "+ user +"?",
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.value) {
          this.KHService.getKH(user).subscribe(data => {
            data.status = 1;

            this.KHService.UpdateKH(data).subscribe(data => {
              Swal.fire({
                type: 'success',
                title: 'Đã mở khóa thành công'
              }).then(result => {
                this.loadKH();
              });
            }, error => {
              Swal.fire({
                type: 'error',
                title: 'Lỗi mở khóa tài khoản này',
                html: error.responseText
              });
            });
          });
        }
    });
  }
}
