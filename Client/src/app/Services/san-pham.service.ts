import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SanPhamService {
  url = `${environment.apiUrl}sanpham/`;
  urlImage = `${environment.apiUrl}imageupload/`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    })
  };
  private httpOptionsImage = {
    headers: new HttpHeaders({
      'Content-Type':  'mulipart/form-data',
      // Authorization: 'my-auth-token'
    })
  };
  constructor(private httpClient : HttpClient) { }

  public getSPs() {
    return this.httpClient.get<any>(this.url, this.httpOptions);
  }

  public getSP(id: number) {
    return this.httpClient.get<any>(this.url + id, this.httpOptions);
  }

  public AddSP(data) {
    return this.httpClient.post<any>(this.url, data, this.httpOptions);
  }

  public UpdateSP(data) {
    return this.httpClient.put<any>(this.url, data, this.httpOptions);
  }

  public DeleteSP(id : number) {
    return this.httpClient.delete<any>(this.url + id, this.httpOptions);
  } 

  // ====================================== Shop ==========================
  // Bên shop
  public SanPham_Filter(data) {
    return this.httpClient.post<any>(this.url + "shop", data, this.httpOptions);
  }

  // ===================================== Home =========================
  // Sản phẩm bán chạy bên home
  public Home_SPBanChay() {
    return this.httpClient.get<any>(this.url + 'home-spbanchay', this.httpOptions);
  }

  // Sản phẩm bán chạy bên home
  public Home_SPHot() {
    return this.httpClient.get<any>(this.url + 'home-sphot', this.httpOptions);
  }

  // ===================================== ADMIN - SanPham ==========================
  // TÌm kiếm bên admin sản phẩm
  public manager_spTimKiem(data) {
    return this.httpClient.post<any>(this.url + "manager_spsearch", data, this.httpOptions);
  }

  // TÌm kiếm bên admin sản phẩm
  public manager_Lock_ListSP(data) {
    return this.httpClient.post<any>(this.url + "lock_listsp", data, this.httpOptions);
  }

  // thêm ảnh
  public postImage(data) {
    return this.httpClient.post<any>(this.urlImage, data);
  }
}
