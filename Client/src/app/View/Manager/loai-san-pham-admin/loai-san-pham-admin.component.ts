import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaiSanPhamService } from 'src/app/Services/loai-san-pham.service';
import { QuyenService } from 'src/app/Services/quyen.service';
import { SanPhamService } from 'src/app/Services/san-pham.service';
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

  public type = "all";
  public input = "";

  // Các trường thêm loại sản phẩm
  public show_add_lsp = false;
  public profileAdd;

  // Các trường sửa loại sản phẩm
  public show_edit_lsp = false;
  public profileEdit;

  constructor(private QService : QuyenService, private LSPService : LoaiSanPhamService,
    private SPService : SanPhamService) { }

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

    this.load_LSP();
  }

  public load_LSP() {
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

  public event_Huy_Sua() {
    this.show_edit_lsp = false;
  }

  public event_Huy_Add() {
    this.show_add_lsp = false;
  }

  public load_Edit_LSP(product_type_id) {
    this.LSPService.getLSP(product_type_id).subscribe(data => {
      if(data) {
        this.profileEdit = new FormGroup({
          product_type_id : new FormControl(data.product_type_id, Validators.compose([
            Validators.required
          ])),
          name : new FormControl(data.name, Validators.compose([
            Validators.required
          ])),
          description : new FormControl(data.description, Validators.compose([
            Validators.required
          ])),
          status : new FormControl(data.status, Validators.compose([
            Validators.required
          ]))
        });

        this.show_edit_lsp = true;
        this.show_add_lsp = false;
      }
    })
  }

  public load_Add_LSP() {
    this.LSPService.GetMaxId().subscribe(data => {
      if(data) {
        this.profileAdd = new FormGroup({
          product_type_id : new FormControl(data + 1, Validators.compose([
            Validators.required
          ])),
          name : new FormControl("", Validators.compose([
            Validators.required
          ])),
          description : new FormControl("", Validators.compose([
            Validators.required
          ]))
        });
    
        this.show_edit_lsp = false;
        this.show_add_lsp = true;
      }
    });
  }

  public submitSua() {
    const newprofile = {
      product_type_id : this.profileEdit.controls['product_type_id'].value,
      name : this.profileEdit.controls['name'].value,
      description : this.profileEdit.controls['description'].value,
      status : this.profileEdit.controls['status'].value
    };

    this.LSPService.UpdateLSP(newprofile).subscribe(data => {
      Swal.fire({
        type : "success",
        title : "Sửa thông tin thành công!"
      }).then((result) => {
        this.load_LSP();
        // location.reload();
      });
    }, error => {
      Swal.fire({
        type : "error",
        title : "Sửa thông tin thất bại!",
        html : error.responseText
      });
    });
  }

  public submitAdd() {
    const newprofile = {
      product_type_id : this.profileAdd.controls['product_type_id'].value,
      name : this.profileAdd.controls['name'].value,
      description : this.profileAdd.controls['description'].value,
      status : 1
    };

    this.LSPService.getLSP(newprofile['product_type_id']).subscribe(data => {
      if(data) {
        Swal.fire({
          type : "error",
          title : "Mã loại sản phẩm đã tòn tại!"
        });
      }
      else {
        this.LSPService.AddLSP(newprofile).subscribe(data => {
          Swal.fire({
            type : "success",
            title : "Thêm loại sản phẩm thành công!"
          }).then((result) => {
            this.load_LSP();
            // location.reload();
          });
        }, error => {
          Swal.fire({
            type : "error",
            title : "Thêm loại sản phẩm thất bại!",
            html : error.responseText
          });
        });
      }
    });
  }

  public Lock_LSP(product_type_id) {
    Swal.fire({
      type: "question",
      title: "Xác nhận",
      text: "Bạn có muốn KHÓA loại sản phẩm "+ product_type_id +" và các sản phẩm thuộc loại sản phẩm này?",
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.value) {
          this.LSPService.getLSP(product_type_id).subscribe(data => {
            data.status = 0;

            this.LSPService.UpdateLSP(data).subscribe(data => {
              Swal.fire({
                type: 'success',
                title: 'Đã KHÓA thành công'
              }).then(result => {
                this.load_LSP();
                const profile = {};
                profile['product_type_id'] = product_type_id;
                profile['status'] = 0;
                this.SPService.manager_Lock_ListSP(profile).subscribe(data => {}, error => {
                  Swal.fire({
                    type: 'error',
                    title: 'KHÓA danh sách sản phẩm thất bại',
                    html : error.responseText
                  })
                })
              });
            }, error => {
              Swal.fire({
                type: 'error',
                title: 'Lỗi KHÓA loại sản phẩm này',
                html: error.responseText
              });
            });
          });
        }
    });
  }

  public UnLock_LSP(product_type_id) {
    Swal.fire({
      type: "question",
      title: "Xác nhận",
      text: "Bạn có muốn MỞ khóa loại sản phẩm "+ product_type_id +" và các sản phẩm thuộc loại sản phẩm này?",
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.value) {
          this.LSPService.getLSP(product_type_id).subscribe(data => {
            data.status = 1;

            this.LSPService.UpdateLSP(data).subscribe(data => {
              Swal.fire({
                type: 'success',
                title: 'Đã MỞ khóa thành công'
              }).then(result => {
                this.load_LSP();
                const profile = {};
                profile['product_type_id'] = product_type_id;
                profile['status'] = 1;
                this.SPService.manager_Lock_ListSP(profile).subscribe(data => {}, error => {
                  Swal.fire({
                    type: 'error',
                    title: 'MỞ khóa danh sách sản phẩm thất bại',
                    html : error.responseText
                  })
                })
              });
            }, error => {
              Swal.fire({
                type: 'error',
                title: 'Lỗi MỞ khóa loại sản phẩm này',
                html: error.responseText
              });
            });
          });
        }
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

    this.LSPService.manager_lspTimKiem(newProfile).subscribe(data => {
      this.ListLSP = data;
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

  // ================ Lỗi cho phần Sửa loại sản phẩm ===============
  // Lỗi Product_type_id
  public getErrorProduct_type_id() {
    const product_type_id = this.profileEdit.controls["product_type_id"];
    if(product_type_id.untouched) {
      return "";
    }

    if(product_type_id.errors == null) {
      return "";
    }
    // Có lỗi required
    if(product_type_id.errors.required != null) {
      return "Mã loại sản phẩm là bắt buộc";
    }
  }

  // Lỗi Name
  public getErrorName() {
    const name = this.profileEdit.controls["name"];
    if(name.untouched) {
      return "";
    }

    if(name.errors == null) {
      return "";
    }
    // Có lỗi required
    if(name.errors.required != null) {
      return "Tên loại sản phẩm là bắt buộc";
    }
  }

  // Lỗi Description
  public getErrorDescription() {
    const description = this.profileEdit.controls["description"];
    if(description.untouched) {
      return "";
    }

    if(description.errors == null) {
      return "";
    }
    // Có lỗi required
    if(description.errors.required != null) {
      return "Mô tả là bắt buộc";
    }
  }

  // Lỗi Status
  public getErrorStatus() {
    const status = this.profileEdit.controls["status"];
    if(status.untouched) {
      return "";
    }

    if(status.errors == null) {
      return "";
    }
    // Có lỗi required
    if(status.errors.required != null) {
      return "Trạng thái là bắt buộc";
    }
  }

  // ================ Lỗi cho phần Thêm loại sản phẩm ===============
  // Lỗi Product_type_id
  public getErrorProduct_type_id_Add() {
    const product_type_id = this.profileAdd.controls["product_type_id"];
    if(product_type_id.untouched) {
      return "";
    }

    if(product_type_id.errors == null) {
      return "";
    }
    // Có lỗi required
    if(product_type_id.errors.required != null) {
      return "Mã loại sản phẩm là bắt buộc";
    }
  }

  // Lỗi Name
  public getErrorName_Add() {
    const name = this.profileAdd.controls["name"];
    if(name.untouched) {
      return "";
    }

    if(name.errors == null) {
      return "";
    }
    // Có lỗi required
    if(name.errors.required != null) {
      return "Tên loại sản phẩm là bắt buộc";
    }
  }

  // Lỗi Description
  public getErrorDescription_Add() {
    const description = this.profileAdd.controls["description"];
    if(description.untouched) {
      return "";
    }

    if(description.errors == null) {
      return "";
    }
    // Có lỗi required
    if(description.errors.required != null) {
      return "Mô tả là bắt buộc";
    }
  }
}
