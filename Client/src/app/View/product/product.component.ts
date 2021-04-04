import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaiSanPhamService } from 'src/app/Services/loai-san-pham.service';
import { SanPhamService } from 'src/app/Services/san-pham.service';

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
  constructor(private httpSP : SanPhamService, private route : ActivatedRoute, private httpLSP : LoaiSanPhamService) { }

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

}
