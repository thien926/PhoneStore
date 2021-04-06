import { Component, OnInit } from '@angular/core';
import { KhachHangService } from 'src/app/Services/khach-hang.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user;
  public type = "detail";
  public date;

  constructor(private httpKH : KhachHangService) { }

  ngOnInit(): void {
    // Load CurrentUser
    var CurrentUser = sessionStorage.getItem("CurrentUser");
    CurrentUser = JSON.parse(CurrentUser);

    this.httpKH.getKH(CurrentUser['user']).subscribe(data => {
      this.user = data;
      this.date = data.dateborn.toString().split('T')[0];
      this.date = this.date.split('-');
      this.date = this.date[2] + '-' + this.date[1] + '-' + this.date[0];
      console.log("User: ", this.user);
      console.log("date: ", this.date);
    });
  }

  public changeType(type) {
    this.type = type;
  }
  
}
