import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  baseUrl=environment.baseUrl;
  constructor(
    private http: HttpClient
  ) { }

  // getServiceList() {
  //   return this.http.get('assets/data2.json')
  // }
  getServiceList() {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    console.log(headers)
    return this.http.get(`${this.baseUrl}fetchAllServices`, { headers });
  }
}
