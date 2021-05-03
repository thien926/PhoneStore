import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NhanVienService } from 'src/app/Services/nhan-vien.service';
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

  public profileFormNV = new FormGroup({
    
  });

  constructor(private NVService : NhanVienService) { }

  ngOnInit(): void {
    this.CurrentNhanVien = JSON.parse(sessionStorage.getItem("CurrentNhanVien"));

    this.NVService.getNV(this.CurrentNhanVien.user).subscribe(data => {
      if(data) {
        this.CurrentNhanVien = data;
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
  }

  public eventLogout() {
    sessionStorage.removeItem("CurrentNhanVien");
    location.reload();
  }

}
