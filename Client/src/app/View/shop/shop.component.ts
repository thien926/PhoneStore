import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { LoaiSanPhamService } from 'src/app/Services/loai-san-pham.service';
import { SanPhamService } from 'src/app/Services/san-pham.service';
import Swal from 'sweetalert2';
import { DefaultComponent } from '../_shared/default/default.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  public qSearch = '';
  public price = '';
  public sort = '';
  public pageIndex = 1;
  public Type = '';
  public priceFrom = '';
  public priceTo = '';
  public IndexVSM = '';
  public Danhmuc = '';

  public page_min: number;
  public page_max: number;
  public phantrang = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpSP: SanPhamService,
    private httpLSP: LoaiSanPhamService,
    private httpCart: CartService,
    private defaultCome: DefaultComponent
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.Type = params['type'];
      this.qSearch = params['qSearch'];
      this.sort = params['sort'];
      this.price = params['price'];
      this.pageIndex = params['pageIndex'];
    });

    if (this.sort == null) {
      this.sort = '';
    }

    if (this.price != null && this.price != '') {
      var arr = this.price.split('-');
      this.priceFrom = arr[0];
      this.priceTo = arr[1];
    }

    if (this.pageIndex == null) {
      this.pageIndex = 1;
    }
    this.httpLSP.getLSPs().subscribe((data) => {
      this.Danhmuc = data;
    });

    this.loadSanPham();
  }

  public loadSanPham() {
    var newData = {};
    newData['Type'] = this.Type;
    newData['qSearch'] = this.qSearch;
    newData['price'] = this.price;
    newData['sort'] = this.sort;
    newData['pageIndex'] = this.pageIndex;

    this.httpSP.SanPham_Filter(newData).subscribe((data) => {
      this.IndexVSM = data;
      this.load_min_max_Phan_trang();
      this.phantrang = this.load_Phan_trang();
    });
  }

  public loadPrice() {
    if (
      this.priceFrom == null ||
      this.priceTo == null ||
      this.priceFrom == '' ||
      this.priceTo == ''
    ) {
      this.price = '';
    } else {
      this.price = this.priceFrom + '-' + this.priceTo;
    }
  }

  public LocSanPham() {
    var s = '/shop?';
    if (this.Type != null && this.Type != '') {
      s += 'type=' + this.Type;
    } else {
      if (this.qSearch != null && this.qSearch != '') {
        s += 'qSearch=' + this.qSearch;
      }
    }

    if (this.price != null && this.price != '') {
      s += '&price=' + this.price;
    }

    if (this.sort != null && this.sort != '') {
      s += '&sort=' + this.sort;
    }

    if (this.pageIndex != null) {
      s += '&pageIndex=' + this.pageIndex;
    }

    location.href = s;
    // var newurl = {};
    // if(this.price != null && this.price != ""){
    //   newurl['price'] = this.price;
    // }
    // if(this.Type != null && this.Type != ""){
    //   newurl['type'] = this.Type;
    // }
    // if(this.qSearch != null && this.qSearch != ""){
    //   newurl['qSearch'] = this.qSearch;
    // }
    // if(this.sort != null && this.sort != ""){
    //   newurl['sort'] = this.sort;
    // }
    // if(this.pageIndex != null){
    //   newurl['pageIndex'] = this.pageIndex;
    // }
    // this.router.navigate(['/shop', newurl]);
    // this.loadSanPham();
  }

  public getUrlPhanTrang(pageIndex) {
    var s = '/shop?';
    if (this.Type != null && this.Type != '') {
      s += 'type=' + this.Type;
    } else {
      if (this.qSearch != null && this.qSearch != '') {
        s += 'qSearch=' + this.qSearch;
      }
    }

    if (this.price != null && this.price != '') {
      s += '&price=' + this.price;
    }

    if (this.sort != null && this.sort != '') {
      s += '&sort=' + this.sort;
    }

    s += '&pageIndex=' + pageIndex;

    return s;
  }

  public load_min_max_Phan_trang() {
    var totalPage = this.IndexVSM['totalPages'];
    var range = this.IndexVSM['range'];
    var middle = totalPage / 2;
    console.log(
      'Total page: ' + totalPage + ', middle: ' + middle + ', range: ' + range
    );

    if (totalPage < range) {
      this.page_min = 1;
      this.page_max = totalPage;
    } else {
      if (this.pageIndex < middle) {
        if (this.pageIndex > range) {
          this.page_min = this.pageIndex - Math.floor(range / 2);
          this.page_max = this.pageIndex + Math.floor(range / 2);
        } else {
          this.page_min = 1;
          this.page_max = range;
        }
      } else {
        if (middle + range > totalPage) {
          this.page_min = totalPage - range;
          this.page_max = totalPage;
        } else {
          this.page_min = this.pageIndex - Math.floor(range / 2);
          this.page_max = this.pageIndex - 1 + 1 + Math.floor(range / 2);
        }
      }
    }
    if (this.page_max > totalPage) {
      this.page_max = totalPage;
      this.page_min = this.page_max - range + 1;
    }

    if (
      this.page_min < this.page_max - range + 1 ||
      this.page_min > this.page_max - range + 1
    ) {
      this.page_min = this.page_max - range + 1;
    }
    console.log('page min: ' + this.page_min + ', page max: ' + this.page_max);
  }

  public addSP(product_id: number) {
    var DonHang;
    DonHang = localStorage.getItem('DonHang');

    // Nếu danh sách đơn hàng đã tồn tại thì thay thêm 1 cho số lượng
    if (DonHang != null && DonHang != '') {
      if (DonHang.indexOf(product_id + '-') != -1) {
        var dauVa = DonHang.split('&');
        var dauNgang;

        for (let i = 0; i < dauVa.length - 1; ++i) {
          dauNgang = dauVa[i].split('-');
          if (Number(dauNgang[0]) == product_id) {
            dauVa[i] = product_id + '-' + (Number(dauNgang[1]) + 1);
            break;
          }
        }

        DonHang = '';
        for (let i = 0; i < dauVa.length - 1; ++i) {
          DonHang += dauVa[i] + '&';
        }
        localStorage.setItem('DonHang', DonHang);

        Swal.fire({
          type: 'success',
          title: 'Thêm sản phẩm thành công',
        }).then((result) => {
          this.defaultCome.LoadSPforCart();
        });
      } else {
        DonHang += product_id + '-' + 1 + '&';
        localStorage.setItem('DonHang', DonHang);
        Swal.fire({
          type: 'success',
          title: 'Thêm sản phẩm thành công',
        }).then((result) => {
          this.defaultCome.LoadSPforCart();
        });
      }
    } else {
      DonHang = '' + product_id + '-' + 1 + '&';
      localStorage.setItem('DonHang', DonHang);
      Swal.fire({
        type: 'success',
        title: 'Thêm sản phẩm thành công',
      }).then((result) => {
        this.defaultCome.LoadSPforCart();
      });
    }
  }

  public load_Phan_trang() {
    var s = '';
    for (let i = this.page_min; i <= this.page_max; ++i) {
      if (i != this.pageIndex) {
        s += '<a href="' + this.getUrlPhanTrang(i) + '">' + i + '</a>';
      } else {
        s +=
          '<a class="active" href="' +
          this.getUrlPhanTrang(i) +
          '">' +
          i +
          '</a>';
      }
    }
    return s;
  }
}
