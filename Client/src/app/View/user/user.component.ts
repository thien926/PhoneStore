import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KhachHangService } from 'src/app/Services/khach-hang.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user;
  public type = "detail";
  public date;
  public edit_date;
  public profileUserForm;
  public profilePassForm;

  constructor(private httpKH : KhachHangService) { }

  ngOnInit(): void {
    // Load CurrentUser
    var CurrentUser = sessionStorage.getItem("CurrentUser");
    CurrentUser = JSON.parse(CurrentUser);
    
    if(CurrentUser) {
      this.httpKH.getKH(CurrentUser['user']).subscribe(data => {
        this.user = data;
        console.log("user: ", data);
        this.edit_date = data.dateborn.toString().split('T')[0];
        this.date = this.edit_date.split('-');
        this.date = this.date[2] + '/' + this.date[1] + '/' + this.date[0];

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
          dateborn : new FormControl(this.edit_date, Validators.compose([
            Validators.required
          ])),
          status : new FormControl(data.status)
        });

        this.profilePassForm = new FormGroup({
          edit_pass: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
            // Validators.pattern("[^!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]")
          ])),
          edit_newpass: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
            // Validators.pattern("[^!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]")
          ])),
          edit_repass : new FormControl('', Validators.compose([
            Validators.required
          ]))
        });
      });
    }
  }

  public onSubmit_EditPass() {
    this.user["pass"] = this.profilePassForm.controls["edit_newpass"].value;
    
    this.httpKH.UpdateKH(this.user).subscribe(data => {
      sessionStorage.setItem("CurrentUser", JSON.stringify(this.user));
      Swal.fire({
        type : "success",
        title : "Sửa mật khẩu thành công!"
      }).then((result) => {
        // location.reload();
      });
    });

    this.profilePassForm = new FormGroup({
      edit_pass: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        // Validators.pattern("[^!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]")
      ])),
      edit_newpass: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        // Validators.pattern("[^!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]")
      ])),
      edit_repass : new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  public onSubmit_Edit() {
    this.update_information_edit();
    this.httpKH.UpdateKH(this.user).subscribe(data => {
      sessionStorage.setItem("CurrentUser", JSON.stringify(this.user));
      Swal.fire({
        type : "success",
        title : "Sửa thông tin thành công!"
      }).then((result) => {
        // location.reload();
      });
    });
  }

  public update_information_edit() {
    this.user["user"] = this.profileUserForm.controls["user"].value;
    this.user["pass"] = this.profileUserForm.controls["pass"].value;
    this.user["repass"] = this.profileUserForm.controls["repass"].value;
    this.user["full_name"] = this.profileUserForm.controls["full_name"].value;
    this.user["phone"] = this.profileUserForm.controls["phone"].value;
    this.user["mail"] = this.profileUserForm.controls["mail"].value;
    this.user["address"] = this.profileUserForm.controls["address"].value;
    this.user["sex"] = this.profileUserForm.controls["sex"].value;
    this.user["dateborn"] = this.profileUserForm.controls["dateborn"].value;
    this.user["status"] = this.profileUserForm.controls["status"].value;
  }

  // Lỗi User
  public getErrorUser() {
    const user = this.profileUserForm.controls["user"];
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

  // Phần sửa mật khẩu
  // Lỗi Password
  public getErrorPass() {
    const pass = this.profilePassForm.controls["edit_pass"];
    if(pass.untouched) {
      return "";
    }

    if(pass.value != this.user.pass) {
      pass.setErrors({Pass: true});
      return "Mật khẩu không đúng!";
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

  // Lỗi Password
  public getErrorNewPass() {
    const pass = this.profilePassForm.controls["edit_newpass"];
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
    const repass = this.profilePassForm.controls["edit_repass"];
    if(repass.untouched) {
      return "";
    }

    if(repass.value != this.profilePassForm.controls["edit_newpass"].value) {
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

  public changeSex(sss) {
    this.profileUserForm.controls["sex"].setValue(sss);
  }

  public changeType(type) {
    this.type = type;
  }
  
}
