import { HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SanPhamService } from 'src/app/Services/san-pham.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testloadfile',
  templateUrl: './testloadfile.component.html',
  styleUrls: ['./testloadfile.component.scss']
})
export class TestloadfileComponent implements OnInit {
  constructor(private spService : SanPhamService) { }

  ngOnInit(): void {
  }

  public uploadPhoto(files) {
    if(files.length === 0) return;
    const formData = new FormData();
    for(let file of files) {
      console.log("NameImage: " + file.name);
      formData.append(file.name, file);
    }

    this.spService.postImage(formData).subscribe(data => {
      if(data) {
        Swal.fire({
          type : "success",
          title : "Thành công"
        })
      }
      else {
        Swal.fire({
          type : "error",
          title : "Thất bại 1"
        })
      }
    }, error => {
      Swal.fire({
        type : "error",
        title : "Thất bại 2"
      })
    });
  }

}
