import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContactustableService {
  baseUrl =environment.baseUrl;
  constructor(  
    private http: HttpClient
  ) { }

  getContactList() {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    console.log(headers)
    return this.http.get(`${this.baseUrl}fetchAllCustomersRequestedForService`, { headers });
  }
}