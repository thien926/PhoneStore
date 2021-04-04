import { Component, OnInit } from '@angular/core';
import { SanPhamService } from 'src/app/Services/san-pham.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public spBanChay;
  public spHot;
  constructor(private spService : SanPhamService) { }

  ngOnInit(): void {
    this.spService.Home_SPBanChay().subscribe(data => {
      this.spBanChay = data;
      console.log("SpBanChay: ", data);
    });

    this.spService.Home_SPHot().subscribe(data => {
      this.spHot = data;
      console.log("SpHot: ", data);
    })
  }

}
