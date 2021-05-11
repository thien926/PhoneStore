import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoaiSanPhamService {
  url = `${environment.apiUrl}loaisanpham/`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    })
  };
  constructor(private httpClient : HttpClient) { }

  public getLSPs() {
    return this.httpClient.get<any>(this.url, this.httpOptions);
  }

  public getLSP(id: number) {
    return this.httpClient.get<any>(this.url + id, this.httpOptions);
  }

  public AddLSP(data) {
    return this.httpClient.post<any>(this.url, data, this.httpOptions);
  }

  public UpdateLSP(data) {
    return this.httpClient.put<any>(this.url, data, this.httpOptions);
  }

  public DeleteLSP(id : number) {
    return this.httpClient.delete<any>(this.url + id, this.httpOptions);
  }
  // TÌm kiếm bên admin loại sản phẩm
  public manager_lspTimKiem(data) {
    return this.httpClient.post<any>(this.url + "manager_lspsearch", data, this.httpOptions);
  }

  // GetMaxId Loai san pham
  public GetMaxId() {
    return this.httpClient.get<any>(this.url + "GetMaxId", this.httpOptions);
  }
}
