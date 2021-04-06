import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from './Services/cart.service';
import { LoaiSanPhamService } from './Services/loai-san-pham.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public CurrentUser;
  public Danhmuc;

  public SPforCart;
  public totalCart = 0;

  public qSearch="";
  constructor (private LSPService : LoaiSanPhamService, private route : ActivatedRoute,
    private httpCart : CartService) {}

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

    // Load SP for Cart
    this.SPforCart = localStorage.getItem("SanPhamForCart");
    this.SPforCart = JSON.parse(this.SPforCart);
    if(this.SPforCart != null) {
      this.SPforCart.forEach(element => {
        this.totalCart += element.price * element.amount;
      });
    }
  }

  public remove(product_id : number) {
    var DonHang;
    DonHang = localStorage.getItem('DonHang');
    if(DonHang != null && DonHang != "") {
      if(DonHang.indexOf(product_id + '-') != -1) {
        var dauVa = DonHang.split("&");
        var dauNgang;
        DonHang = "";
        for(let i = 0; i < dauVa.length - 1; ++i) {
          dauNgang = dauVa[i].split("-");
          if(Number(dauNgang[0]) == product_id) {
            continue;
          }
          DonHang += dauNgang[0] + '-' + dauNgang[1] + '&';
        }
        if(DonHang == null || DonHang == "") {
          localStorage.setItem("DonHang", DonHang);
          localStorage.setItem("SanPhamForCart", JSON.stringify(null));
          this.SPforCart = null;
          this.totalCart = 0;
          return;
        }
        this.httpCart.LoadSPForCart(DonHang).subscribe(data => {
          this.SPforCart = data;
          localStorage.setItem("SanPhamForCart", JSON.stringify(this.SPforCart));
          this.SPforCart.forEach(element => {
            this.totalCart += element.price * element.amount;
          });
        });
        localStorage.setItem("DonHang", DonHang);
      }
    }
  }

  public qSearch_Submit() {
    location.href = "/shop?qSearch=" + this.qSearch;
  }
}
