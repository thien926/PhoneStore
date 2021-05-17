import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaiSanPhamService } from 'src/app/Services/loai-san-pham.service';
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
  public ListLSP;
  
  public type = "all";
  public input = "";

  // Các trường sửa
  public show_edit_SP = false;
  public profileEdit;

  // Các trường add
  public show_add_SP = false;
  public profileAdd;

  constructor(private QService : QuyenService, private SPService : SanPhamService, private LSPService: LoaiSanPhamService) { }

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
    this.loadLSP();
  }

  public loadLSP() {
    // Load Loại Sản Phẩm
    this.LSPService.getLSPs().subscribe(data => {
      if(data) {
        this.ListLSP = data;
      }
      else {
        Swal.fire({
          type: "error",
          title : "lỗi load loại sản phẩm",
          html : "SanPhamAdminComponent"
        });
      }
    }, error => {
      Swal.fire({
        type: "error",
        title : "Lỗi load loại sản phẩm => SanPhamAdminComponent",
        html : error.responseText
      });
    });
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

  public load_Edit_SP(product_id) {
    this.SPService.getSP(product_id).subscribe(data => {
      this.profileEdit = new FormGroup({
        product_id : new FormControl(data.product_id, Validators.compose([
          Validators.required
        ])),
        product_type_id : new FormControl(data.product_type_id, Validators.compose([
          Validators.required
        ])),
        name : new FormControl(data.name, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ])),
        amount : new FormControl(data.amount, Validators.compose([
          Validators.required
        ])),
        price : new FormControl(data.price, Validators.compose([
          Validators.required
        ])),
        description : new FormControl(data.description, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ])),
        img : new FormControl(data.img, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ])),
        status : new FormControl(data.status, Validators.compose([
          Validators.required
        ]))
      });
      this.show_edit_SP = true;
      this.show_add_SP = false;
    });
  }

  public event_Huy_Sua() {
    this.show_edit_SP = false;
  }

  public event_Huy_Add() {
    this.show_add_SP = false;
  }

  // Lỗi Name
  public getErrorNameEdit() {
    const pass = this.profileEdit.controls["name"];
    if(pass.untouched) {
      return "";
    }

    if(pass.errors == null) {
      return "";
    }
    // Có lỗi required
    if(pass.errors.required != null) {
      return "Tên sản phẩm là bắt buộc";
    }

    // Có lỗi chiều dài
    if(pass.errors.minlength != null || pass.errors.maxlength != null) {
      return "Tên sản phẩm từ 3 đến 20 kí tự";
    }
  }

  // Lỗi Price
  public getErrorPriceEdit() {
    const pass = this.profileEdit.controls["price"];
    if(pass.untouched) {
      return "";
    }

    if(pass.errors == null) {
      return "";
    }
    // Có lỗi required
    if(pass.errors.required != null) {
      return "Giá là bắt buộc";
    }
  }
}
