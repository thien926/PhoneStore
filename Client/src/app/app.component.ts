import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public CurrentUser;
  ngOnInit(): void {
    this.CurrentUser = sessionStorage.getItem("CurrentUser");
    this.CurrentUser = JSON.parse(this.CurrentUser);
    console.log("AppComponent: ", this.CurrentUser);
  }
}
