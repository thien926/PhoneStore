import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  // Các trường sửa
  public edit_user = "";
  public show_edit_user = false;
  public show_add_user = false;
  public profileUserForm;
  public profileUserAddForm;

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
    user["permission_id"] = this.profileUserForm.controls["permission_id"].value;
    user["status"] = this.profileUserForm.controls["status"].value;

    this.NVService.updateNV(user).subscribe(data => {
      Swal.fire({
        type : "success",
        title : "Sửa thông tin thành công!"
      }).then((result) => {
        this.loadNV();
        // location.reload();
      });
    });
  }

  public submitAdd() {
    const user = {};
    user["user"] = this.profileUserAddForm.controls["user"].value;
    user["pass"] = this.profileUserAddForm.controls["pass"].value;
    user["repass"] = this.profileUserAddForm.controls["repass"].value;
    user["full_name"] = this.profileUserAddForm.controls["full_name"].value;
    user["phone"] = this.profileUserAddForm.controls["phone"].value;
    user["mail"] = this.profileUserAddForm.controls["mail"].value;
    user["address"] = this.profileUserAddForm.controls["address"].value;
    user["sex"] = this.profileUserAddForm.controls["sex"].value;
    user["dateborn"] = this.profileUserAddForm.controls["dateborn"].value;
    user["permission_id"] = this.profileUserAddForm.controls["permission_id"].value;
    user["status"] = this.profileUserAddForm.controls["status"].value;

    this.NVService.getNV(user["user"]).subscribe(data => {
      if(data != null) {
        Swal.fire({
          type : "error",
          title : "Tài khoản đã tồn tại"
        });
      }
      else {
        this.NVService.addNV(user).subscribe(data => {
          Swal.fire({
            type : "success",
            title : "Đã thêm thành công"
          }).then((result) => {
            this.loadNV();
            // location.reload();
          });
        })
      }
    });
  }

  public load_Edit_NhanVien(user) {
    this.edit_user = user;

    this.NVService.getNV(user).subscribe(data => {
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
        permission_id : new FormControl(data.permission_id, Validators.compose([
          Validators.required
        ])),
        status : new FormControl(data.status)
      });

      this.show_edit_user = true;
      this.show_add_user = false;
    });
  }

  public event_Huy_Sua() {
    this.show_edit_user = false;
  }

  public event_Huy_Add() {
    this.show_add_user = false;
  }

  public load_Add_NhanVien() {
    this.profileUserAddForm = new FormGroup({
      user : new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("^[\\w]+$")
      ])),
      pass: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        // Validators.pattern("[^!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]")
      ])),
      repass : new FormControl("", Validators.compose([
        Validators.required
      ])),
      full_name : new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60)
      ])),
      phone : new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.pattern("^[\\d]+$")
      ])),
      mail : new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
      ])),
      address : new FormControl("", Validators.compose([
        Validators.required
      ])),
      sex : new FormControl("Nam", Validators.compose([
        Validators.required
      ])),
      dateborn : new FormControl("", Validators.compose([
        Validators.required
      ])),
      permission_id : new FormControl(1, Validators.compose([
        Validators.required
      ])),
      status : new FormControl(1)
    });

    this.show_add_user = true;
    this.show_edit_user = false;
  }

  // Get lỗi cho phần Add Tài khoản nhân viên
  // Lỗi User
  public getErrorUserAdd() {
    const user = this.profileUserAddForm.controls["user"];
    if(user.untouched) {
      return "";
    }

    if(user.errors == null) {
      return "";
    }
    // Có lỗi required
    if(user.errors.required != null) {
      return "Tài khoản là bắt buộc";
    }

    // Có lỗi chiều dài
    if(user.errors.minlength != null || user.errors.maxlength != null) {
      return "Tài khoản từ 3 đến 20 kí tự";
    }

    // Có lỗi pattern
    // console.log("Pattern: " + JSON.stringify(user.errors.pattern));
    if(user.errors.pattern) {
      return "Tài khoản là các kí tự chữ và số";
    }
  }
  // Lỗi Name
  public getErrorFull_nameAdd() {
    const full_name = this.profileUserAddForm.controls["full_name"];
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

  public getErrorPhoneAdd() {
    const phone = this.profileUserAddForm.controls["phone"];
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

  public getErrorMailAdd() {
    const mail = this.profileUserAddForm.controls["mail"];
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

  public getErrorAddressAdd() {
    const address = this.profileUserAddForm.controls["address"];
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

  public getErrorSexAdd() {
    const sex = this.profileUserAddForm.controls["sex"];
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

  public getErrorDateBornAdd() {
    const dateborn = this.profileUserAddForm.controls["dateborn"];
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
  public getErrorNewPassAdd() {
    const pass = this.profileUserAddForm.controls["pass"];
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
  public getErrorRepassAdd() {
    const repass = this.profileUserAddForm.controls["repass"];
    if(repass.untouched) {
      return "";
    }

    if(repass.value != this.profileUserAddForm.controls["pass"].value) {
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

  // Get lỗi cho phần Edit Tài khoản nhân viên
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
