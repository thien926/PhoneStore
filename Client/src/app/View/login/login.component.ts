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
      console.log(data);
    },
    error => {
      console.log("log: ",error);
      alert("Lỗi nhập");
    });
  }

}
