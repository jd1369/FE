import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubservicesService {
 baseUrl= environment.baseUrl;
  constructor(private http: HttpClient) { 
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.user= JSON.parse(localStorage.getItem('user') || '{}');
  }
  admin:any
  user:any
  getSubServiceList(serviceId:any) {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
  
    const headers = token
      ? new HttpHeaders({ Token: `Bearer ${token}` })
      : new HttpHeaders({Token:`Bearer `});
      console.log("AbortController",headers)
    if (this.admin || this.user) {
      return this.http.get(`${this.baseUrl}${serviceId}/fetchAllSubServicesForAService`, { headers });
    } else {
      return this.http.get(`${this.baseUrl}${serviceId}/fetchAllSubServicesForAService`, { headers });
    }
  }

  uploadImage(formData: any) {
    return this.http.post(this.baseUrl+'upload', formData);
  }
}
