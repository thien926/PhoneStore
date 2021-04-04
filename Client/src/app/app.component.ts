import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaiSanPhamService } from './Services/loai-san-pham.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public CurrentUser;
  public Danhmuc;

  public qSearch="";
  constructor (private LSPService : LoaiSanPhamService, private route : ActivatedRoute) {}

  ngOnInit(): void {
    // Load CurrentUser
    this.CurrentUser = sessionStorage.getItem("CurrentUser");
    this.CurrentUser = JSON.parse(this.CurrentUser);
    console.log("AppComponent: ", this.CurrentUser);

    // Load Danh muc
    this.LSPService.getLSPs().subscribe(data => {
      this.Danhmuc = data;
    });

    this.route.queryParams.subscribe(params => {
      this.qSearch = params['qSearch'];
    });
  }

  public qSearch_Submit() {
    location.href = "/shop?qSearch=" + this.qSearch;
  }
}
