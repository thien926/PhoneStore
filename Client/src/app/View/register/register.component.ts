import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KhachHangService } from 'src/app/Services/khach-hang.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public profileUserForm = new FormGroup({
    user : new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern("^[\\w]+$")
    ])),
    pass: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
      // Validators.pattern("[^!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]")
    ])),
    repass : new FormControl('', Validators.compose([
      Validators.required
    ])),
    full_name : new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(60)
    ])),
    phone : new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(11),
      Validators.pattern("^[\\d]+$")
    ])),
    mail : new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
    ])),
    address : new FormControl('', Validators.compose([
      Validators.required
    ])),
    sex : new FormControl('Nam', Validators.compose([
      Validators.required
    ])),
    dateborn : new FormControl('', Validators.compose([
      Validators.required
    ])),
    status : new FormControl('1')
  });
  constructor(private registerHttp : KhachHangService) { }

  ngOnInit(): void {
  }

  public addUser() {
    const newProfileUser = {};
    newProfileUser["user"] = this.profileUserForm.controls["user"].value;
    newProfileUser["pass"] = this.profileUserForm.controls["pass"].value;
    newProfileUser["repass"] = this.profileUserForm.controls["repass"].value;
    newProfileUser["full_name"] = this.profileUserForm.controls["full_name"].value;
    newProfileUser["phone"] = this.profileUserForm.controls["phone"].value;
    newProfileUser["mail"] = this.profileUserForm.controls["mail"].value;
    newProfileUser["address"] = this.profileUserForm.controls["address"].value;
    newProfileUser["sex"] = this.profileUserForm.controls["sex"].value;
    newProfileUser["dateborn"] = this.profileUserForm.controls["dateborn"].value;
    newProfileUser["status"] = this.profileUserForm.controls["status"].value;

    this.registerHttp.AddKH_Register(newProfileUser).subscribe(data => {
      console.log("Register - AddUser: ", data);
      if(data) {
        sessionStorage.setItem("CurrentUser", JSON.stringify(data));
        Swal.fire({
          type : "success",
          title : "Đăng kí thành công!",
          text : "Chào " + data.full_name
        }).then((result) => {
          location.reload();
        });
      }
      else {
        Swal.fire({
          type : "error",
          title : "Đăng kí thất bại!"
        });
      }
    });
    // console.log("user: " , this.profileUserForm.controls["user"].errors);
    // console.log("pass: " , this.profileUserForm.controls["pass"].errors);
    // console.log("repass: " , this.profileUserForm.controls["repass"].errors);
    // console.log("full_name: " , this.profileUserForm.controls["full_name"].errors);
    // console.log("phone: " , this.profileUserForm.controls["phone"].errors);
    // console.log("mail: " , this.profileUserForm.controls["mail"].errors);
    // console.log("address: " , this.profileUserForm.controls["address"].errors);
    // console.log("sex: " , this.profileUserForm.controls["sex"].errors);
    // console.log("dateborn: " , this.profileUserForm.controls["dateborn"].errors);
    // console.log("status: " , this.profileUserForm.controls["status"].errors);
    // console.log("profile: ", this.profileUserForm.valid);
    // alert("waite");
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

  // Lỗi Password
  public getErrorPass() {
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

  // Lỗi Password
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

  public changeSex(sss) {
    this.profileUserForm.controls["sex"].setValue(sss);
  }
}
