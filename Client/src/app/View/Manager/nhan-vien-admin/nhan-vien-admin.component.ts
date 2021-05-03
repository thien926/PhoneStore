import { Component, OnInit } from '@angular/core';
import { NhanVienService } from 'src/app/Services/nhan-vien.service';
import { QuyenService } from 'src/app/Services/quyen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nhan-vien-admin',
  templateUrl: './nhan-vien-admin.component.html',
  styleUrls: ['./nhan-vien-admin.component.scss']
})
export class NhanVienAdminComponent implements OnInit {
  public title = "";
  public tool = false;    // tool = true có quyền sửa

  public CurrentNhanVien;
  public CurrentQuyen;
  public ListNV;

  public type = "all";
  public input = "";

  constructor(private QService : QuyenService, private NVService : NhanVienService) { }

  ngOnInit(): void {
    this.CurrentNhanVien = JSON.parse(sessionStorage.getItem("CurrentNhanVien"));

    // Load Quyền
    this.QService.getQ(this.CurrentNhanVien.permission_id).subscribe(data => {
      if(data) {
        this.CurrentQuyen = data;
        if(data.details.indexOf("qlNhanVien") >= 0) {
          this.title = "Quản lý nhân viên";
          this.tool = true;
        }
        else if(data.details.indexOf("xemNhanVien") >= 0) {
          this.title = "Xem nhân viên";
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
          html : "NhanVienAdminComponent"
        });
      }
    },
    error => {
      Swal.fire({
        type : "error",
        title : "Lỗi load quyền => NhanVienAdminComponent",
        html : error.responseText
      });
    });

    this.loadNV();
  }

  public loadNV() {
    // Load nhân viên
    this.NVService.getNVs().subscribe(data => {
      if(data) {
        this.ListNV = data;
      }
      else {
        Swal.fire({
          type: "error",
          title : "lỗi load nhân viên",
          html : "NhanVienAdminComponent"
        });
      }
    }, error => {
      Swal.fire({
        type: "error",
        title : "Lỗi load nhân viên => NhanVienAdminComponent",
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

    this.NVService.manager_nvTimKiem(newProfile).subscribe(data => {
      this.ListNV = data;
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

  public RemoveNV(user) {
    Swal.fire({
      type: "question",
      title: "Xác nhận",
      text: "Bạn có muốn khóa tài khoản "+ user +" này?",
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.value) {
          this.NVService.getNV(user).subscribe(data => {
            data.status = 0;

            this.NVService.updateNV(data).subscribe(data => {
              Swal.fire({
                type: 'success',
                title: 'Đã khóa thành công'
              }).then(result => {
                this.loadNV();
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

  public BackNV(user) {
    Swal.fire({
      type: "question",
      title: "Xác nhận",
      text: "Bạn có muốn mở khóa tài khoản "+ user +"?",
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.value) {
          this.NVService.getNV(user).subscribe(data => {
            data.status = 1;

            this.NVService.updateNV(data).subscribe(data => {
              Swal.fire({
                type: 'success',
                title: 'Đã mở khóa thành công'
              }).then(result => {
                this.loadNV();
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
