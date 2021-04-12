import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { LoaiSanPhamService } from 'src/app/Services/loai-san-pham.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  public CurrentUser;
  public Danhmuc;

  public SPforCart;
  public totalCart = 0;
  public totalSP = 0;

  public qSearch="";
  constructor(private LSPService : LoaiSanPhamService, private route : ActivatedRoute,
    private httpCart : CartService) { }

  ngOnInit(): void {
    this.loadCssHead();
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
    
    this.LoadSPforCart();
  }

  public LoadSPforCart() {
    var DonHang = localStorage.getItem("DonHang");
    if(DonHang == null || DonHang == "") {
      this.SPforCart = null;
      this.totalCart = 0;
      this.totalSP = 0;
      return;
    }

    this.httpCart.LoadSPForCart(DonHang).subscribe(data => {
      this.SPforCart = data;
      if(this.SPforCart != null) {
        this.totalSP = 0;
        this.totalCart = 0;
        this.SPforCart.forEach(element => {
          this.totalSP += element.amount;
          this.totalCart += element.price * element.amount;
        });
      }
    });
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
        localStorage.setItem("DonHang", DonHang);
        this.LoadSPforCart();
        if(location.href.indexOf("/cart") != -1) {
          location.reload();
        }
        // location.reload();
        // this.cartCome.LoadSPforCart();
      }
    }
  }

  public qSearch_Submit() {
    location.href = "/shop?qSearch=" + this.qSearch;
  }

  public loadCssHead() {
    const head = document.head;
    const temp = document.createElement('link');

    temp.innerHTML = `<link href="assets/css/css.css" rel="stylesheet" />
    <link rel="stylesheet" href="assets/css/bootstrap.min.css" >
    <link rel="stylesheet" href="assets/css/font-awesome.min.css" >
    <link rel="stylesheet" href="assets/css/themify-icons.css" >
    <link rel="stylesheet" href="assets/css/elegant-icons.css" >
    <link rel="stylesheet" href="assets/css/owl.carousel.min.css" >
    <link rel="stylesheet" href="assets/css/nice-select.css" >
    <link rel="stylesheet" href="assets/css/jquery-ui.min.css" >
    <link rel="stylesheet" href="assets/css/slicknav.min.css" >
    <link rel="stylesheet" href="assets/css/style.css" >  `;
    while (temp.firstChild) {
        head.appendChild(temp.firstChild);
    }
  }

}
