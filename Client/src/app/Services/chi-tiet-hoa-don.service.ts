import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChiTietHoaDonService {
  url = `${environment.apiUrl}ChiTietHD/`;
  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  }

  constructor(private httpClient :  HttpClient) { }

  public getCTHDBy_BillID(bill_id : number) {
    return this.httpClient.get<any>(this.url + bill_id, this.httpOptions);
  }

  public AddCTHDRange(data) {
    return this.httpClient.post<any>(this.url + "addRange", data, this.httpOptions);
  }
}
