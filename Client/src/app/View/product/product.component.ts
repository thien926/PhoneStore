import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaiSanPhamService } from 'src/app/Services/loai-san-pham.service';
import { SanPhamService } from 'src/app/Services/san-pham.service';
import Swal from 'sweetalert2';
import { DefaultComponent } from '../_shared/default/default.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public product_id;
  public sanpham;
  public loaiSanPham;

  public soluong = 1;
  constructor(private httpSP : SanPhamService, private route : ActivatedRoute, private httpLSP : LoaiSanPhamService,
    private defaultCome : DefaultComponent) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.product_id = params['product_id'];
    });

    if(this.product_id == "" || this.product_id == null) {
      return;
    }

    // Lấy dữ liệu LSP phải có sản phẩm trước mới lấy được nên mới bỏ httpLSP trong httpSP
    // Không thể chạy cùng cấp thông thường được
    this.httpSP.getSP(this.product_id).subscribe(data => {
      this.sanpham = data;
      this.is_TonKho();
      this.httpLSP.getLSP(this.sanpham.product_type_id).subscribe(data => {
        this.loaiSanPham = data;
      });
    });

    this.loadSoLuongInCart();
  }

  public dec_soluong() {
    --this.soluong;
    if(this.soluong < 1) {
      this.soluong = 1;
    }
    this.is_TonKho();
  }

  public inc_soluong() {
    ++this.soluong;
    this.is_TonKho();
  }

  public is_TonKho() {
    if(this.soluong > this.sanpham.amount) {
      this.soluong = this.sanpham.amount;
    }
  }

  public change_Soluong() {
    if(this.soluong == null) {
      this.soluong = 1;
    }
    if(this.soluong < 1) {
      this.soluong = 1;
    }
    this.is_TonKho();
  }

  public loadSoLuongInCart() {
    var DonHang = localStorage.getItem("DonHang");
    if(DonHang != null && DonHang != "") {
      if(DonHang.indexOf(this.product_id + '-') != -1) {

        var dauVa = DonHang.split("&");
        var dauNgang;

        for(let i = 0; i < dauVa.length - 1; ++i) {
          dauNgang = dauVa[i].split("-");

          if(Number(dauNgang[0]) == this.product_id) {
            this.soluong = Number(dauNgang[1]);
            break;
          }
        }
      }
      
    }
  }

  public addSP() {
    var DonHang;
    DonHang = localStorage.getItem('DonHang');

    if(DonHang == null || DonHang == "") {
      DonHang = this.product_id + "-" + this.soluong + "&";
      localStorage.setItem("DonHang", DonHang);
      Swal.fire({
        type : "success",
        title : "Thêm sản phẩm thành công!"
      }).then(result => {
        this.defaultCome.LoadSPforCart();
      });
      return;
    }

    if(DonHang.indexOf(this.product_id + '-') != -1) {
      var dauVa = DonHang.split("&");
      var dauNgang;
      for(let i = 0; i < dauVa.length - 1; ++i) {
        dauNgang = dauVa[i].split("-");
        if(Number(dauNgang[0]) == this.product_id) {
          dauVa[i] = this.product_id + "-" + this.soluong;
          break;
        }
      }

      DonHang = "";
      for(let i = 0; i < dauVa.length - 1; ++i) {
        DonHang += dauVa[i] + "&";
      }
      localStorage.setItem("DonHang", DonHang);
      Swal.fire({
        type : "success",
        title : "Số lượng mua sản phẩm đã được cập nhật!"
      }).then(result => {
        this.defaultCome.LoadSPforCart();
      });
      return;
    }

    DonHang += this.product_id + "-" + this.soluong + "&";
    localStorage.setItem("DonHang", DonHang);
    Swal.fire({
      type : "success",
      title : "Thêm sản phẩm thành công"
    }).then(result => {
      this.defaultCome.LoadSPforCart();
    });
  }
}
