import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuyenService {
  url = `${environment.apiUrl}quyen/`;
  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  }
  constructor(private httpClient : HttpClient) { }

  public getQs() {
    return this.httpClient.get<any>(this.url, this.httpOptions);
  }

  public getQ(id : number) {
    return this.httpClient.get<any>(this.url + id, this.httpOptions);
  }

  public addQ(data) {
    return this.httpClient.post<any>(this.url, data, this.httpOptions);
  }

  public updateQ(data) {
    return this.httpClient.put<any>(this.url, data, this.httpOptions);
  }

  public deleteQ(id : number) {
    return this.httpClient.delete<any>(this.url + id, this.httpOptions);
  }
  // TÌm kiếm bên admin quyền
  public manager_qTimKiem(data) {
    return this.httpClient.post<any>(this.url + "manager_qsearch", data, this.httpOptions);
  }

  // GetMaxId Quyền
  public GetMaxId() {
    return this.httpClient.get<any>(this.url + "GetMaxId", this.httpOptions);
  }
}
