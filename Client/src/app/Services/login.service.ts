import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = `${environment.apiUrl}khachhang/`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    })
  };
  constructor(private httpClient : HttpClient) { }

  public postUser(data){
    return this.httpClient.post<any>(this.url + "login", data, this.httpOptions);
  }
}
