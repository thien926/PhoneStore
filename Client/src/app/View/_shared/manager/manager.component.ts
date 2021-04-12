import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  public status_login = false;
  constructor() { }

  ngOnInit(): void {
    this.loadCssHead();
    
    var tk = JSON.parse(sessionStorage.getItem("CurrentNhanVien"));
    if(tk != null) {
      this.status_login = true;
    }
    else {
      this.status_login = false;
    }
    
  }

  public loadCssHead() {
    const head = document.head;
    const temp = document.createElement('link');

    temp.innerHTML = `<link href="assets/assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/assets/css/animate.min.css" rel="stylesheet" />
    <link href="assets/assets/css/light-bootstrap-dashboard.css?v=1.4.0" rel="stylesheet" />
    <link href="assets/assets/css/demo.css" rel="stylesheet" />
    <link href="assets/assets/css/font-awesome.min.css" rel="stylesheet" />
    <link href="assets/assets/css/css.css" rel="stylesheet" />
    <link href="assets/assets/css/pe-icon-7-stroke.css" rel="stylesheet" />`;
    while (temp.firstChild) {
        head.appendChild(temp.firstChild);
    }

  }
}
