import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public profileUserForm = new FormGroup({
    user : new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      // Validators.pattern("^[a-zA-Z]|[\w]*$"),
      Validators.pattern("^[\\w]+$")
      
    ])),
    password : new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
      // Validators.pattern("[^!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]")
    ])),
  });

  constructor(private loginHttp : LoginService) { }

  ngOnInit(): void {
  }

  public postLogin() {
    const newProfileUser = {};

    for(const controlname in this.profileUserForm.controls) {
      if(controlname) {
        newProfileUser[controlname] = this.profileUserForm.controls[controlname].value;
      }
    }

    this.loginHttp.postUser(newProfileUser).subscribe(data => {
      console.log("data: ",data);
      if(data) {
        sessionStorage.setItem("CurrentUser", JSON.stringify(data));
        Swal.fire({
          type: "success",
          title : "Đăng nhập thành công",
          text : "Chào " + data.full_name
        }).then((result) => {
          location.reload();
        });
        
      }
      else {
        sessionStorage.removeItem("CurrentUser");
        Swal.fire({
          type: "error",
          title : "Tài khoản hoặc mật khẩu không chính xác"
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

  public getErrorPass() {
    const pass = this.profileUserForm.controls["password"];
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
      
      return "Tài khoản từ 3 đến 20 kí tự";
    }

    // if(pass.errors.pattern) {
    //   return "Mật khẩu không chứa các kí tự đặc biệt";
    // }
  }
}
