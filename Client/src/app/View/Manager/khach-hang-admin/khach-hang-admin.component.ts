import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  // Các trường sửa
  public edit_user = "";
  public show_edit_user = false;
  public profileUserForm;

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

  public load_Edit_KhachHang(user) {
    this.edit_user = user;

    this.KHService.getKH(user).subscribe(data => {
      var edit_date = data.dateborn.toString().split('T')[0];
      var date = edit_date.split('-');
      date = date[2] + '/' + date[1] + '/' + date[0];

      this.profileUserForm = new FormGroup({
        user : new FormControl(data.user, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern("^[\\w]+$")
        ])),
        pass: new FormControl(data.pass, Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          // Validators.pattern("[^!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]")
        ])),
        repass : new FormControl(data.pass, Validators.compose([
          Validators.required
        ])),
        full_name : new FormControl(data.full_name, Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(60)
        ])),
        phone : new FormControl(data.phone, Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
          Validators.pattern("^[\\d]+$")
        ])),
        mail : new FormControl(data.mail, Validators.compose([
          Validators.required,
          Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
        ])),
        address : new FormControl(data.address, Validators.compose([
          Validators.required
        ])),
        sex : new FormControl(data.sex, Validators.compose([
          Validators.required
        ])),
        dateborn : new FormControl(edit_date, Validators.compose([
          Validators.required
        ])),
        status : new FormControl(data.status)
      });

      this.show_edit_user = true;
    });

    
  }

  public event_Huy_Sua() {
    this.show_edit_user = false;
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

  public submitSua() {
    const user = {};
    user["user"] = this.profileUserForm.controls["user"].value;
    user["pass"] = this.profileUserForm.controls["pass"].value;
    user["repass"] = this.profileUserForm.controls["repass"].value;
    user["full_name"] = this.profileUserForm.controls["full_name"].value;
    user["phone"] = this.profileUserForm.controls["phone"].value;
    user["mail"] = this.profileUserForm.controls["mail"].value;
    user["address"] = this.profileUserForm.controls["address"].value;
    user["sex"] = this.profileUserForm.controls["sex"].value;
    user["dateborn"] = this.profileUserForm.controls["dateborn"].value;
    user["status"] = this.profileUserForm.controls["status"].value;

    this.KHService.UpdateKH(user).subscribe(data => {
      Swal.fire({
        type : "success",
        title : "Sửa thông tin thành công!"
      }).then((result) => {
        this.loadKH();
        // location.reload();
      });
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

  // Lỗi Name
  public getErrorFull_name() {
    const full_name = this.profileUserForm.controls["full_name"];
    if(full_name.untouched) {
      return "";
    }

    if(full_name.errors == null) {
      return "";
    }
    // Có lỗi required
    if(full_name.errors.required != null) {
      return "Họ tên là bắt buộc";
    }

    // Có lỗi chiều dài
    if(full_name.errors.minlength != null || full_name.errors.maxlength != null) {
      return "Họ tên từ 2 đến 60 kí tự";
    }
  }

  public getErrorPhone() {
    const phone = this.profileUserForm.controls["phone"];
    if(phone.untouched) {
      return "";
    }

    if(phone.errors == null) {
      return "";
    }
    // Có lỗi required
    if(phone.errors.required != null) {
      return "Số điện thoại là bắt buộc";
    }

    // Có lỗi chiều dài
    if(phone.errors.minlength != null || phone.errors.maxlength != null) {
      return "Số điện thoại từ 10 đến 11 kí tự";
    }

    // Có lỗi pattern
    if(phone.errors.pattern) {
      return "Số điện thoại là các kí tự số";
    }
  }

  public getErrorMail() {
    const mail = this.profileUserForm.controls["mail"];
    if(mail.untouched) {
      return "";
    }

    if(mail.errors == null) {
      return "";
    }
    // Có lỗi required
    if(mail.errors.required != null) {
      return "Thư điện tử là bắt buộc";
    }

    // Có lỗi pattern
    if(mail.errors.pattern) {
      return "Lỗi định dạnh mail!";
    }
  }

  public getErrorAddress() {
    const address = this.profileUserForm.controls["address"];
    if(address.untouched) {
      return "";
    }

    if(address.errors == null) {
      return "";
    }
    // Có lỗi required
    if(address.errors.required != null) {
      return "Địa chỉ là bắt buộc";
    }
  }

  public getErrorSex() {
    const sex = this.profileUserForm.controls["sex"];
    if(sex.untouched) {
      return "";
    }

    if(sex.errors == null) {
      return "";
    }
    // Có lỗi required
    if(sex.errors.required != null) {
      return "Giới tính là bắt buộc";
    }
  }

  public getErrorDateBorn() {
    const dateborn = this.profileUserForm.controls["dateborn"];
    if(dateborn.untouched) {
      return "";
    }

    if(dateborn.errors == null) {
      return "";
    }
    // Có lỗi required
    if(dateborn.errors.required != null) {
      return "Ngày sinh là bắt buộc";
    }
  }

  // Lỗi Password
  public getErrorNewPass() {
    const pass = this.profileUserForm.controls["pass"];
    if(pass.untouched) {
      return "";
    }

    if(pass.errors == null) {
      return "";
    }
    // Có lỗi required
    if(pass.errors.required != null) {
      return "Mật khẩu là bắt buộc";
    }

    // Có lỗi chiều dài
    if(pass.errors.minlength != null || pass.errors.maxlength != null) {
      return "Mật khẩu từ 4 đến 20 kí tự";
    }
  }

  // Lỗi Repass
  public getErrorRepass() {
    const repass = this.profileUserForm.controls["repass"];
    if(repass.untouched) {
      return "";
    }

    if(repass.value != this.profileUserForm.controls["pass"].value) {
      repass.setErrors({pattern: true});
      return "Mật khẩu không trùng khớp!";
    }

    if(repass.errors == null) {
      return "";
    }
    // Có lỗi required
    if(repass.errors.required != null) {
      return "Mật khẩu là bắt buộc";
    }
    
  }
}
