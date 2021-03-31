import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServerHttpService } from 'src/app/Services/server-http.service';

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

  constructor(private serverHttp : ServerHttpService) { }

  ngOnInit(): void {
    this.serverHttp.Login_getUser().subscribe(data => {
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

    this.serverHttp.Login_postUser(newProfileUser).subscribe(data => {
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
