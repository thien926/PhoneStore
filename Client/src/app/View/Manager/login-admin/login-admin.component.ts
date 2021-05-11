import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NhanVienService } from 'src/app/Services/nhan-vien.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  public profileFormNV = new FormGroup({
    user : new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern("^[\\w]+$")
    ])),
    password : new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]))
  });
  constructor(private NVService : NhanVienService) { }

  ngOnInit(): void {
    this.loadCssHead();
  }

  public eventLoginAdmin() {
    const newProfile = {};

    for(const controlname in this.profileFormNV.controls) {
      if(controlname) {
        newProfile[controlname] = this.profileFormNV.controls[controlname].value;
      }
    }

    this.NVService.login_admin(newProfile).subscribe(data => {
      if(data) {
        sessionStorage.setItem("CurrentNhanVien", JSON.stringify(data));
        Swal.fire({
          type : "success",
          title : "Đăng nhập thành công!!!",
          html : "Chào " + data.full_name
        }).then(result => {
          location.href = window.location.origin + "/manager/user";
        });
      }
      else {
        sessionStorage.removeItem("CurrentNhanVien");
        Swal.fire({
          type: "error",
          title : "Đăng nhập thất bại!!!"
        });
      }
    },
    error => {
      Swal.fire({
        type: "error",
        title: "Lỗi đăng nhập",
        html: error.responseText
      });
    });
  }

  // Hiện thông báo lỗi bên phần User
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

  public getErrorPass() {
    const pass = this.profileFormNV.controls["password"];
    if(pass.untouched) {
      return "";
    }
    if(pass.errors == null) {
      return "";
    }
    // Có lỗi required
    if(pass.errors.required) {
      return "Mật khẩu là bắt buộc";
    }
    
    // Có lỗi chiều dài
    if(pass.errors.minlength || pass.errors.maxlength) {
      
      return "Mật khẩu từ 4 đến 20 kí tự";
    }

    // if(pass.errors.pattern) {
    //   return "Mật khẩu không chứa các kí tự đặc biệt";
    // }
  }

  public loadCssHead() {
    const head = document.head;
    const temp = document.createElement('link');

    temp.innerHTML = `<link href="assets/css/admin/login/style.css" rel="stylesheet" />`;
    while (temp.firstChild) {
        head.appendChild(temp.firstChild);
    }
  }
}
