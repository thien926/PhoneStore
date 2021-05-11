import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HoaDonService {
  url = `${environment.apiUrl}hoadon/`;
  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  }
  constructor(private httpClient : HttpClient) { }
  public getHDs() {
    return this.httpClient.get<any>(this.url, this.httpOptions);
  }

  public getHD(id: number) {
    return this.httpClient.get<any>(this.url + id, this.httpOptions);
  }

  public AddHD(data) {
    return this.httpClient.post<any>(this.url, data, this.httpOptions);
  }

  public UpdateHD(data) {
    return this.httpClient.put<any>(this.url, data, this.httpOptions);
  }

  public DeleteHD(id : number) {
    return this.httpClient.delete<any>(this.url + id, this.httpOptions);
  }

  // Tìm kiếm hóa đơn trong admin
  public manager_billTimKiem(data) {
    return this.httpClient.post<any>(this.url + "manager_billsearch", data, this.httpOptions);
  }

  // Sửa trạng thái hóa đơn trong admin
  public manager_billSua(data) {
    return this.httpClient.post<any>(this.url + "manager_billrepaire", data, this.httpOptions);
  }

  // GetMaxId HoaDon
  public GetMaxId() {
    return this.httpClient.get<any>(this.url + "GetMaxId", this.httpOptions);
  }
}
