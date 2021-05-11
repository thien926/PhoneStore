import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuyenService } from 'src/app/Services/quyen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quyen-admin',
  templateUrl: './quyen-admin.component.html',
  styleUrls: ['./quyen-admin.component.scss']
})
export class QuyenAdminComponent implements OnInit {
  public title = "";
  public tool = false;    // tool = true có quyền sửa

  public CurrentNhanVien;
  public CurrentQuyen;

  public ListQ;

  public type = "all";
  public input = "";

  // Các trường add
  public show_add_quyen = false;
  public profileAdd;

  // Các trường sửa
  public show_edit_quyen = false;
  public profileEdit;
  public details = "";

  public NhapHang = "";
  public NhanVien = "";
  public SanPham = "";
  public HoaDon = "";
  public KhachHang = "";
  public PhieuNhap = "";
  public NCC = "";
  public Quyen = "";
  public LoaiSanPham = "";
  public ThongKe = "";

  constructor(private QService : QuyenService) { }

  ngOnInit(): void {
    this.CurrentNhanVien = JSON.parse(sessionStorage.getItem("CurrentNhanVien"));

    // Load Quyền
    this.QService.getQ(this.CurrentNhanVien.permission_id).subscribe(data => {
      if(data) {
        this.CurrentQuyen = data;
        if(data.details.indexOf("qlQuyen") >= 0) {
          this.title = "Quản lý quyền";
          this.tool = true;
        }
        else if(data.details.indexOf("xemQuyen") >= 0){
          this.title = "Xem quyền";
          this.tool = false;
        }
        else {
          location.href = window.location.origin + "/manager";
        }
      }
      else {
        Swal.fire({
          type : "error",
          title : "Lỗi load quyền",
          html : "QuyenAdminComponent"
        });
      }
    },
    error => {
      Swal.fire({
        type : "error",
        title : "Lỗi load quyền => QuyenAdminComponent",
        html : error.responseText
      });
    });

    this.load_List_Q();
  }

  public load_List_Q() {
    // Load danh sách quyền
    this.QService.getQs().subscribe(data => {
      if(data) {
        this.ListQ = data;
      } else {
        Swal.fire({
          type: "error",
          title : "lỗi load quyền",
          html : "QuyenAdminComponent"
        });
      }
    }, error => {
      Swal.fire({
        type: "error",
        title : "Lỗi load quyền => QuyenAdminComponent",
        html : error.responseText
      });
    });
  }

  public load_Edit_Quyen(permission_id) {
    this.QService.getQ(permission_id).subscribe(data => {
      this.profileEdit = new FormGroup({
        permission_id : new FormControl(data.permission_id, Validators.compose([
          Validators.required
        ])),
        name : new FormControl(data.name, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]))
      });
      this.details = data.details;

      this.NhapHang = "";
      this.NhanVien = "";
      this.SanPham = "";
      this.HoaDon = "";
      this.KhachHang = "";
      this.PhieuNhap = "";
      this.NCC = "";
      this.Quyen = "";
      this.LoaiSanPham = "";
      this.ThongKe = "";

      if(data.details.indexOf("xemNhapHang") >= 0) {
        this.NhapHang = "xemNhapHang";
      }
      else if(data.details.indexOf("qlNhapHang") >= 0) {
        this.NhapHang = "qlNhapHang";
      }

      if(data.details.indexOf("xemNhanVien") >= 0) {
        this.NhanVien = "xemNhanVien";
      }
      else if(data.details.indexOf("qlNhanVien") >= 0) {
        this.NhanVien = "qlNhanVien";
      }

      if(data.details.indexOf("xemSanPham") >= 0) {
        this.SanPham = "xemSanPham";
      }
      else if(data.details.indexOf("qlSanPham") >= 0) {
        this.SanPham = "qlSanPham";
      }

      if(data.details.indexOf("xemHoaDon") >= 0) {
        this.HoaDon = "xemHoaDon";
      }
      else if(data.details.indexOf("qlHoaDon") >= 0) {
        this.HoaDon = "qlHoaDon";
      }

      if(data.details.indexOf("xemKhachHang") >= 0) {
        this.KhachHang = "xemKhachHang";
      }
      else if(data.details.indexOf("qlKhachHang") >= 0) {
        this.KhachHang = "qlKhachHang";
      }

      if(data.details.indexOf("xemPhieuNhap") >= 0) {
        this.PhieuNhap = "xemPhieuNhap";
      }
      else if(data.details.indexOf("qlPhieuNhap") >= 0) {
        this.PhieuNhap = "qlPhieuNhap";
      }

      if(data.details.indexOf("xemNCC") >= 0) {
        this.NCC = "xemNCC";
      }
      else if(data.details.indexOf("qlNCC") >= 0) {
        this.NCC = "qlNCC";
      }

      if(data.details.indexOf("xemQuyen") >= 0) {
        this.Quyen = "xemQuyen";
      }
      else if(data.details.indexOf("qlQuyen") >= 0) {
        this.Quyen = "qlQuyen";
      }

      if(data.details.indexOf("xemLoaiSanPham") >= 0) {
        this.LoaiSanPham = "xemLoaiSanPham";
      }
      else if(data.details.indexOf("qlLoaiSanPham") >= 0) {
        this.LoaiSanPham = "qlLoaiSanPham";
      }

      if(data.details.indexOf("xemThongKe") >= 0) {
        this.ThongKe = "xemThongKe";
      }
      else if(data.details.indexOf("qlThongKe") >= 0) {
        this.ThongKe = "qlThongKe";
      }
      this.show_edit_quyen = true;
      this.show_add_quyen = false;
    });
  }

  public load_Add_Quyen() {
    this.QService.GetMaxId().subscribe(data => {
      this.profileAdd = new FormGroup({
        permission_id : new FormControl(data + 1, Validators.compose([
          Validators.required
        ])),
        name : new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]))
      });
      this.details = "";

      this.NhapHang = "";
      this.NhanVien = "";
      this.SanPham = "";
      this.HoaDon = "";
      this.KhachHang = "";
      this.PhieuNhap = "";
      this.NCC = "";
      this.Quyen = "";
      this.LoaiSanPham = "";
      this.ThongKe = "";

      this.show_edit_quyen = false;
      this.show_add_quyen = true;
    });
  }

  public select_Quyen() {
    var detail = "";
    if(this.NhapHang != "") {
      detail += this.NhapHang + "-";
    }

    if(this.NhanVien != "") {
      detail += this.NhanVien + "-";
    }

    if(this.SanPham != "") {
      detail += this.SanPham + "-";
    }

    if(this.HoaDon != "") {
      detail += this.HoaDon + "-";
    }

    if(this.KhachHang != "") {
      detail += this.KhachHang + "-";
    }

    if(this.PhieuNhap != "") {
      detail += this.PhieuNhap + "-";
    }

    if(this.NCC != "") {
      detail += this.NCC + "-";
    }

    if(this.Quyen != "") {
      detail += this.Quyen + "-";
    }

    if(this.ThongKe != "") {
      detail += this.ThongKe + "-";
    }

    if(this.LoaiSanPham != "") {
      detail += this.LoaiSanPham + "-";
    }

    detail = detail.slice(0, detail.length-1);
    this.details = detail;
  }

  public event_submit_Sua() {
    if(this.details == null || this.details == "") {
      return;
    }
    const newprofile = {};
    newprofile["permission_id"] = this.profileEdit.controls["permission_id"].value;
    newprofile["name"] = this.profileEdit.controls["name"].value;
    newprofile["details"] = this.details;

    this.QService.updateQ(newprofile).subscribe(data => {
      Swal.fire({
        type : "success",
        title : "Sửa thành công"
      }).then(result => {
        this.load_List_Q();
      });
    }, error => {
      Swal.fire({
        type : "error",
        title : "Sửa thất bại",
        html : error.responseText
      });
    });
  }

  public event_submit_Add() {
    if(this.details == null || this.details == "") {
      return;
    }
    const newprofile = {};
    newprofile["permission_id"] = this.profileAdd.controls["permission_id"].value;
    newprofile["name"] = this.profileAdd.controls["name"].value;
    newprofile["details"] = this.details;

    this.QService.getQ(newprofile["permission_id"]).subscribe(data => {
      if(data != null) {
        Swal.fire({
          type : "error",
          title : "Mã quyền đã tồn tại"
        }).then(result => {
          return;
        });
      }
      else {
        this.QService.addQ(newprofile).subscribe(data => {
          Swal.fire({
            type : "success",
            title : "Thêm thành công"
          }).then(result => {
            this.load_List_Q();
          });
        }, error => {
          Swal.fire({
            type : "error",
            title : "Thêm thất bại",
            html : error.responseText
          });
        });
      }
    })
  }

  public event_Huy_Sua() {
    this.show_edit_quyen = false;
  }

  public event_Huy_Add() {
    this.show_add_quyen = false;
  }

  public eventLogout() {
    sessionStorage.removeItem("CurrentNhanVien");
    location.reload();
  }

  public eventTimKiem() {
    const newProfile = {
      type : this.type,
      input : this.input
    };

    this.QService.manager_qTimKiem(newProfile).subscribe(data => {
      this.ListQ = data;
      // console.log("Khách hàng: ", data);
    },
    error => {
      Swal.fire({
        type : "error",
        title : "Lỗi tìm kiếm",
        html : error.responseText
      })
    });
  }

  //Load lỗi cho Add
  // Lỗi Mã quyền
  public getErrorAddPermission_id() {
    const permission_id = this.profileAdd.controls["permission_id"];
    if(permission_id.untouched) {
      return "";
    }

    if(permission_id.errors == null) {
      return "";
    }
    // Có lỗi required
    if(permission_id.errors.required != null) {
      return "Mã quyền là bắt buộc";
    }
  }

  // Lỗi Chi tiết quyền
  public getErrorAddDetails() {
    if(this.details == "" || this.details == null) {
      return "Chi tiết quyền là bắt buộc";
    }
  }

  // Lỗi Name
  public getErrorAddName() {
    const name = this.profileAdd.controls["name"];
    if(name.untouched) {
      return "";
    }

    if(name.errors == null) {
      return "";
    }
    // Có lỗi required
    if(name.errors.required != null) {
      return "Tên quyền là bắt buộc";
    }

    // Có lỗi chiều dài
    if(name.errors.minlength != null || name.errors.maxlength != null) {
      return "Tên quyền từ 3 đến 60 kí tự";
    }
  }


  // Load lỗi cho edit
  // Lỗi Mã quyền
  public getErrorPermission_id() {
    const permission_id = this.profileEdit.controls["permission_id"];
    if(permission_id.untouched) {
      return "";
    }

    if(permission_id.errors == null) {
      return "";
    }
    // Có lỗi required
    if(permission_id.errors.required != null) {
      return "Mã quyền là bắt buộc";
    }
  }

  // Lỗi Chi tiết quyền
  public getErrorDetails() {
    if(this.details == "" || this.details == null) {
      return "Chi tiết quyền là bắt buộc";
    }
  }

  // Lỗi Name
  public getErrorName() {
    const name = this.profileEdit.controls["name"];
    if(name.untouched) {
      return "";
    }

    if(name.errors == null) {
      return "";
    }
    // Có lỗi required
    if(name.errors.required != null) {
      return "Tên quyền là bắt buộc";
    }

    // Có lỗi chiều dài
    if(name.errors.minlength != null || name.errors.maxlength != null) {
      return "Tên quyền từ 3 đến 60 kí tự";
    }
  }
}
