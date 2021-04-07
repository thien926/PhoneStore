import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CartService } from 'src/app/Services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public SPforCart;
  public totalSP = 0;
  public totalCart = 0;

  public isAddress = "dcmacdinh";
  constructor(private httpCart : CartService, private appCome : AppComponent) { }

  ngOnInit(): void {
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

  public dec_soluong(product_id : number) {
    var DonHang;
    DonHang = localStorage.getItem('DonHang');

    if(DonHang != null && DonHang != "") {
      if(DonHang.indexOf(product_id + '-') != -1) {

        var dauVa = DonHang.split("&");
        var dauNgang;

        for(let i = 0; i < dauVa.length - 1; ++i) {
          dauNgang = dauVa[i].split("-");

          if(Number(dauNgang[0]) == product_id) {
            var soluong = (Number(dauNgang[1]) - 1);
            if(soluong < 1) {
              soluong = 1;
            }
            dauVa[i] = product_id + "-" + soluong;
            break;
          }
        }

        DonHang = "";
        for(let i = 0; i < dauVa.length - 1; ++i) {
          DonHang += dauVa[i] + "&";
        }

        localStorage.setItem("DonHang", DonHang);
        this.LoadSPforCart(); 
        this.appCome.LoadSPforCart();
      }
      
    }
    
  }

  public inc_soluong(product_id : number) {
    var DonHang;
    DonHang = localStorage.getItem('DonHang');

    if(DonHang != null && DonHang != "") {
      if(DonHang.indexOf(product_id + '-') != -1) {

        var dauVa = DonHang.split("&");
        var dauNgang;

        for(let i = 0; i < dauVa.length - 1; ++i) {
          dauNgang = dauVa[i].split("-");
          if(Number(dauNgang[0]) == product_id) {
            dauVa[i] = product_id + "-" + (Number(dauNgang[1]) + 1);
            break;
          }
        }

        DonHang = "";
        for(let i = 0; i < dauVa.length - 1; ++i) {
          DonHang += dauVa[i] + "&";
        }

        localStorage.setItem("DonHang", DonHang);
        this.LoadSPforCart();
        this.appCome.LoadSPforCart();
      }
      
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

        localStorage.setItem("DonHang", DonHang);
        this.LoadSPforCart();
        this.appCome.LoadSPforCart();
      }
    }
  }

  // public chang_address(aa) {
  //   alert(aa.value);
  // }
}
