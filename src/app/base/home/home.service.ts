import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  admin:any
  user:any
  baseUrl= environment.baseUrl;
  constructor(private http: HttpClient) {
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.user= JSON.parse(localStorage.getItem('user') || '{}');
   }
 
  getBanner() {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    console.log(headers)
    return this.http.get(`${this.baseUrl}fetchBanner`);
  }

  updateBannerState(state:boolean) {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    console.log(headers)
    return this.http.put(`${this.baseUrl}uploadBanner`,state,{headers});
  }

  getAllServices(){
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
  
    const headers = token
      ? new HttpHeaders({ Token: `Bearer ${token}` })
      : new HttpHeaders({Token:`Bearer `});
      console.log("AbortController",headers)
    if (this.admin || this.user) {
      return this.http.get(`${this.baseUrl}topFiveServices`, { headers });
    } else {
      return this.http.get(`${this.baseUrl}topFiveServices`, { headers });
    }
  }
  }

 
  
