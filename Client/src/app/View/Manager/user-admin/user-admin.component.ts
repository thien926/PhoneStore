import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NhanVienService } from 'src/app/Services/nhan-vien.service';
import { QuyenService } from 'src/app/Services/quyen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  public title = "";
  public tool = false;    // tool = true có quyền sửa

  public CurrentNhanVien;
  public CurrentQ;

  public profileFormNV;

  public tool_sua = false;

  constructor(private NVService : NhanVienService, private QService : QuyenService) { }

  ngOnInit(): void {
    this.CurrentNhanVien = JSON.parse(sessionStorage.getItem("CurrentNhanVien"));

    this.NVService.getNV(this.CurrentNhanVien.user).subscribe(data => {
      if(data) {
        this.CurrentNhanVien = data;
        var edit_date = data.dateborn.toString().split('T')[0];
        var date = edit_date.split('-');
        date = date[2] + '/' + date[1] + '/' + date[0];

        this.profileFormNV = new FormGroup({
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
      }
      else {
        Swal.fire({
          type: "error",
          title : "lỗi load thông tin cá nhân",
          html : "UserAdminComponent"
        });
      }
    }, error => {
      Swal.fire({
        type: "error",
        title : "lỗi load thông tin cá nhân => UserAdminComponent",
        html : error.responseText
      });
    });

    this.QService.getQ(this.CurrentNhanVien.permission_id).subscribe(data => {
      this.CurrentQ = data;
    });
  }

  public eventLogout() {
    sessionStorage.removeItem("CurrentNhanVien");
    location.reload();
  }

  public loadSua() {
    this.tool_sua = true;
  }

  public event_huySua() {
    this.tool_sua = false;
  }

  public event_Luu_Sua() {
    const user = {};
    user["user"] = this.profileFormNV.controls["user"].value;
    user["pass"] = this.profileFormNV.controls["pass"].value;
    user["repass"] = this.profileFormNV.controls["repass"].value;
    user["full_name"] = this.profileFormNV.controls["full_name"].value;
    user["phone"] = this.profileFormNV.controls["phone"].value;
    user["mail"] = this.profileFormNV.controls["mail"].value;
    user["address"] = this.profileFormNV.controls["address"].value;
    user["sex"] = this.profileFormNV.controls["sex"].value;
    user["dateborn"] = this.profileFormNV.controls["dateborn"].value;
    user["permission_id"] = this.profileFormNV.controls["permission_id"].value;
    user["status"] = this.profileFormNV.controls["status"].value;

    this.NVService.updateNV(user).subscribe(data => {
      Swal.fire({
        type : "success",
        title : "Sửa thông tin thành công!"
      }).then((result) => {
        // this.loadNV();
        location.reload();
      });
    });
  }

  // Lỗi User
  public getErrorUser() {
    const user = this.profileFormNV.controls["user"];
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
  public getErrorFull_name() {
    const full_name = this.profileFormNV.controls["full_name"];
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
    const phone = this.profileFormNV.controls["phone"];
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
    const mail = this.profileFormNV.controls["mail"];
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
    const address = this.profileFormNV.controls["address"];
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
    const sex = this.profileFormNV.controls["sex"];
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
    const dateborn = this.profileFormNV.controls["dateborn"];
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
    const pass = this.profileFormNV.controls["pass"];
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
    const repass = this.profileFormNV.controls["repass"];
    if(repass.untouched) {
      return "";
    }

    if(repass.value != this.profileFormNV.controls["pass"].value) {
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
