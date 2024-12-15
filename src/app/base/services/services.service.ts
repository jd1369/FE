import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();
  admin:any
  user:any
  baseUrl=environment.baseUrl;
  constructor(
    private http: HttpClient,
    private shareservice:SharedserviceService
  ) {
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.user= JSON.parse(localStorage.getItem('user') || '{}');
   }

  // getServiceList() {
  //   return this.http.get('assets/data2.json')
  // }


 

  getServiceList() {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
  
    const headers = token
      ? new HttpHeaders({ Token: `Bearer ${token}` })
      : new HttpHeaders({Token:`Bearer `});
      console.log("AbortController",headers)
    if (this.admin || this.user) {
      return this.http.get(`${this.baseUrl}fetchAllServices`, { headers });
    } else {
      return this.http.get(`${this.baseUrl}fetchAllServices`, { headers });
    }
  }
}
