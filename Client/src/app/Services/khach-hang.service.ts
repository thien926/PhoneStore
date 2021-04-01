import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KhachHangService {
  url = `${environment.apiUrl}khachhang`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    })
  };
  constructor(private httpClient : HttpClient) { }

  public getKHs() {
    return this.httpClient.get<any>(this.url, this.httpOptions);
  }

  public getKH(user: string) {
    return this.httpClient.get<any>(this.url + "/" + user, this.httpOptions);
  }

  public AddKH(data) {
    return this.httpClient.post<any>(this.url, data, this.httpOptions);
  }

  public UpdateKH(data) {
    return this.httpClient.put<any>(this.url, data, this.httpOptions);
  }

  public DeleteKH(user : string) {
    return this.httpClient.delete<any>(this.url + "/" + user, this.httpOptions);
  }
}
