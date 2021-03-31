import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerHttpService {
  URL = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    })
  };
  constructor(private httpClient : HttpClient) { }

  public Login_postUser(data){
    const url = `${this.URL}login`;
    return this.httpClient.post<any>(url, data, this.httpOptions);
  }

  public Login_getUser(){
    const url = `${this.URL}login`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
}
