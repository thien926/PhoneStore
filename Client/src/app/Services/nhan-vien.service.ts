import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NhanVienService {
  url = `${environment.apiUrl}nhanvien/`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    })
  };
  constructor(private httpClient : HttpClient) { }

  public getNVs() {
    return this.httpClient.get<any>(this.url, this.httpOptions);
  }

  public getNV(user) {
    return this.httpClient.get<any>(this.url + user, this.httpOptions);
  }

  public addNV(data) {
    return this.httpClient.post<any>(this.url, data, this.httpOptions);
  }

  public updateNV(data) {
    return this.httpClient.put<any>(this.url, data, this.httpOptions);
  }

  public deleteNV(user : string) {
    return this.httpClient.delete<any>(this.url + user, this.httpOptions);
  }

  public login_admin(data) {
    return this.httpClient.post<any>(this.url + "login-admin", data, this.httpOptions);
  }

  // TÌm kiếm bên admin nhân viên
  public manager_nvTimKiem(data) {
    return this.httpClient.post<any>(this.url + "manager_nvsearch", data, this.httpOptions);
  }
}
