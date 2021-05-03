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
  
  public type = "all";
  public input = "";

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

    this.loadSP();
  }

  public loadSP() {
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

  public eventTimKiem() {
    const newProfile = {
      type : this.type,
      input : this.input
    };

    this.SPService.manager_spTimKiem(newProfile).subscribe(data => {
      this.ListSP = data;
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

  public RemoveSP(product_id) {
    Swal.fire({
      type: "question",
      title: "Xác nhận",
      text: "Bạn có muốn khóa sản phẩm "+ product_id +" này?",
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.value) {
          this.SPService.getSP(product_id).subscribe(data => {
            data.status = 0;

            this.SPService.UpdateSP(data).subscribe(data => {
              Swal.fire({
                type: 'success',
                title: 'Đã khóa thành công'
              }).then(result => {
                this.loadSP();
              });
            }, error => {
              Swal.fire({
                type: 'error',
                title: 'Lỗi khóa sản phẩm này',
                html: error.responseText
              });
            });
          });
        }
    });
  }

  public BackSP(product_id) {
    Swal.fire({
      type: "question",
      title: "Xác nhận",
      text: "Bạn có muốn mở khóa sản phẩm "+ product_id +" này?",
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.value) {
          this.SPService.getSP(product_id).subscribe(data => {
            data.status = 1;

            this.SPService.UpdateSP(data).subscribe(data => {
              Swal.fire({
                type: 'success',
                title: 'Đã mở khóa thành công'
              }).then(result => {
                this.loadSP();
              });
            }, error => {
              Swal.fire({
                type: 'error',
                title: 'Lỗi mở khóa sản phẩm này',
                html: error.responseText
              });
            });
          });
        }
    });
  }
}
