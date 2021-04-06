import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url = `${environment.apiUrl}cart`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  constructor(private httpClient : HttpClient) { }

  public LoadSPForCart(data) {
    return this.httpClient.get<any>(this.url + '/' + data, this.httpOptions);
  }
}
