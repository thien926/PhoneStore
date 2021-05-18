import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChiTietHoaDonService } from 'src/app/Services/chi-tiet-hoa-don.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detailbill',
  templateUrl: './detailbill.component.html',
  styleUrls: ['./detailbill.component.scss']
})
export class DetailbillComponent implements OnInit {
  public ListCTHD;
  public totalSP = 0;
  public totalMoney = 0;

  public param;
  constructor(private CTHDService : ChiTietHoaDonService) { }

  ngOnInit(): void {
    let url = location.href;
    url = url.replace(window.location.origin + window.location.pathname, "");
    this.param = url.replace("?bill_id=", "");
    // alert(this.param);

    this.CTHDService.getCTHDBy_BillID(this.param).subscribe(data => {
      if(data) {
        this.ListCTHD = data;
        for(let item of data) {
          this.totalSP = this.totalSP + item.amount;
          this.totalMoney = this.totalMoney + item.amount * item.price;
        }
      }
      else {
        Swal.fire({
          type : "error",
          title : "Load chi tiết hóa đơn thất bại"
        });
      }
    }, error => {
      Swal.fire({
        type : "error",
        title : "Load chi tiết hóa đơn thất bại"
      });
    });
  }

}
