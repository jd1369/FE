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

  baseUrl=environment.baseUrl;
  constructor(
    private http: HttpClient,
    private shareservice:SharedserviceService
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
