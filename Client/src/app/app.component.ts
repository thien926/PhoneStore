import { Component, OnInit } from '@angular/core';
import { LoaiSanPhamService } from './Services/loai-san-pham.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public CurrentUser;
  public Danhmuc;
  constructor (private LSPService : LoaiSanPhamService) {}

  ngOnInit(): void {
    // Load CurrentUser
    this.CurrentUser = sessionStorage.getItem("CurrentUser");
    this.CurrentUser = JSON.parse(this.CurrentUser);
    console.log("AppComponent: ", this.CurrentUser);

    // Load Danh muc
    this.LSPService.getLSPs().subscribe(data => {
      this.Danhmuc = data;
    });
  }
}
