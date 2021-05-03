import { Component, OnInit } from '@angular/core';
import { QuyenService } from 'src/app/Services/quyen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quyen-admin',
  templateUrl: './quyen-admin.component.html',
  styleUrls: ['./quyen-admin.component.scss']
})
export class QuyenAdminComponent implements OnInit {
  public title = "";
  public tool = false;    // tool = true có quyền sửa

  public CurrentNhanVien;
  public CurrentQuyen;

  public ListQ;

  public type = "all";
  public input = "";

  constructor(private QService : QuyenService) { }

  ngOnInit(): void {
    this.CurrentNhanVien = JSON.parse(sessionStorage.getItem("CurrentNhanVien"));

    // Load Quyền
    this.QService.getQ(this.CurrentNhanVien.permission_id).subscribe(data => {
      if(data) {
        this.CurrentQuyen = data;
        if(data.details.indexOf("qlQuyen") >= 0) {
          this.title = "Quản lý quyền";
          this.tool = true;
        }
        else if(data.details.indexOf("xemQuyen") >= 0){
          this.title = "Xem quyền";
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
          html : "QuyenAdminComponent"
        });
      }
    },
    error => {
      Swal.fire({
        type : "error",
        title : "Lỗi load quyền => QuyenAdminComponent",
        html : error.responseText
      });
    });

    // Load danh sách quyền
    this.QService.getQs().subscribe(data => {
      if(data) {
        this.ListQ = data;
      } else {
        Swal.fire({
          type: "error",
          title : "lỗi load quyền",
          html : "QuyenAdminComponent"
        });
      }
    }, error => {
      Swal.fire({
        type: "error",
        title : "Lỗi load quyền => QuyenAdminComponent",
        html : error.responseText
      });
    });
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

    this.QService.manager_qTimKiem(newProfile).subscribe(data => {
      this.ListQ = data;
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
}
