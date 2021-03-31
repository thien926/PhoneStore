import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public profileUserForm = new FormGroup({
    user : new FormControl(''),
    password : new FormControl(''),
  });

  constructor(private loginHttp : LoginService) { }

  ngOnInit(): void {
    this.loginHttp.getUser().subscribe(data => {
      console.log(data);
    });
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
        alert("Đăng nhập thành công!");
        location.reload();
      }
      else {
        
        sessionStorage.removeItem("CurrentUser");
        alert("Tài khoản hoặc mật khẩu không chính xác!!!");
      }
    },
    error => {
      alert("Lỗi nhập");
    });
  }

}
