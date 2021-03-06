import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HoaDonService } from 'src/app/Services/hoa-don.service';
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

  public ListDonHang;

  constructor(private httpKH : KhachHangService, private HDService : HoaDonService) { }

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

        // Load Don Hang
        this.HDService.getHDsByKH(data).subscribe(data => {
          if(data) {
            this.ListDonHang = data;
          }
        });
      });
    }
    else {
      location.href = window.location.origin + "/login";
    }
  }

  public onSubmit_EditPass() {
    this.user["pass"] = this.profilePassForm.controls["edit_newpass"].value;
    
    this.httpKH.UpdateKH(this.user).subscribe(data => {
      sessionStorage.setItem("CurrentUser", JSON.stringify(this.user));
      Swal.fire({
        type : "success",
        title : "S???a m???t kh???u th??nh c??ng!"
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
        title : "S???a th??ng tin th??nh c??ng!"
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

  public eventDangXuat() {
    sessionStorage.removeItem("CurrentUser");
    location.reload();
  }

  // L???i User
  public getErrorUser() {
    const user = this.profileUserForm.controls["user"];
    if(user.untouched) {
      return "";
    }

    if(user.errors == null) {
      return "";
    }
    // C?? l???i required
    if(user.errors.required != null) {
      return "T??i kho???n l?? b???t bu???c";
    }

    // C?? l???i chi???u d??i
    if(user.errors.minlength != null || user.errors.maxlength != null) {
      return "T??i kho???n t??? 3 ?????n 20 k?? t???";
    }

    // C?? l???i pattern
    // console.log("Pattern: " + JSON.stringify(user.errors.pattern));
    if(user.errors.pattern) {
      return "T??i kho???n l?? c??c k?? t??? ch??? v?? s???";
    }
  }

  // L???i Name
  public getErrorFull_name() {
    const full_name = this.profileUserForm.controls["full_name"];
    if(full_name.untouched) {
      return "";
    }

    if(full_name.errors == null) {
      return "";
    }
    // C?? l???i required
    if(full_name.errors.required != null) {
      return "H??? t??n l?? b???t bu???c";
    }

    // C?? l???i chi???u d??i
    if(full_name.errors.minlength != null || full_name.errors.maxlength != null) {
      return "H??? t??n t??? 2 ?????n 60 k?? t???";
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
    // C?? l???i required
    if(phone.errors.required != null) {
      return "S??? ??i???n tho???i l?? b???t bu???c";
    }

    // C?? l???i chi???u d??i
    if(phone.errors.minlength != null || phone.errors.maxlength != null) {
      return "S??? ??i???n tho???i t??? 10 ?????n 11 k?? t???";
    }

    // C?? l???i pattern
    if(phone.errors.pattern) {
      return "S??? ??i???n tho???i l?? c??c k?? t??? s???";
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
    // C?? l???i required
    if(mail.errors.required != null) {
      return "Th?? ??i???n t??? l?? b???t bu???c";
    }

    // C?? l???i pattern
    if(mail.errors.pattern) {
      return "L???i ?????nh d???nh mail!";
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
    // C?? l???i required
    if(address.errors.required != null) {
      return "?????a ch??? l?? b???t bu???c";
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
    // C?? l???i required
    if(sex.errors.required != null) {
      return "Gi???i t??nh l?? b???t bu???c";
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
    // C?? l???i required
    if(dateborn.errors.required != null) {
      return "Ng??y sinh l?? b???t bu???c";
    }
  }

  // Ph???n s???a m???t kh???u
  // L???i Password
  public getErrorPass() {
    const pass = this.profilePassForm.controls["edit_pass"];
    if(pass.untouched) {
      return "";
    }

    if(pass.value != this.user.pass) {
      pass.setErrors({Pass: true});
      return "M???t kh???u kh??ng ????ng!";
    }

    if(pass.errors == null) {
      return "";
    }
    // C?? l???i required
    if(pass.errors.required != null) {
      return "M???t kh???u l?? b???t bu???c";
    }

    // C?? l???i chi???u d??i
    if(pass.errors.minlength != null || pass.errors.maxlength != null) {
      return "M???t kh???u t??? 4 ?????n 20 k?? t???";
    }
  }

  // L???i Password
  public getErrorNewPass() {
    const pass = this.profilePassForm.controls["edit_newpass"];
    if(pass.untouched) {
      return "";
    }

    if(pass.errors == null) {
      return "";
    }
    // C?? l???i required
    if(pass.errors.required != null) {
      return "M???t kh???u l?? b???t bu???c";
    }

    // C?? l???i chi???u d??i
    if(pass.errors.minlength != null || pass.errors.maxlength != null) {
      return "M???t kh???u t??? 4 ?????n 20 k?? t???";
    }
  }

  // L???i Repass
  public getErrorRepass() {
    const repass = this.profilePassForm.controls["edit_repass"];
    if(repass.untouched) {
      return "";
    }

    if(repass.value != this.profilePassForm.controls["edit_newpass"].value) {
      repass.setErrors({pattern: true});
      return "M???t kh???u kh??ng tr??ng kh???p!";
    }

    if(repass.errors == null) {
      return "";
    }
    // C?? l???i required
    if(repass.errors.required != null) {
      return "M???t kh???u l?? b???t bu???c";
    }
    
  }

  public changeSex(sss) {
    this.profileUserForm.controls["sex"].setValue(sss);
  }

  public changeType(type) {
    this.type = type;
  }
  
}
