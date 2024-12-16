import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubservicesService {
 baseUrl= environment.baseUrl;
  constructor(private http: HttpClient) { }
  
  getSubServiceList(serviceId:any) {
    const token = localStorage.getItem('authToken');
    console.log(serviceId)
    
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    console.log(headers)
    return this.http.get(`${this.baseUrl}${serviceId}/fetchAllSubServicesForAService`, { headers });
  }

  uploadImage(formData: any) {
    return this.http.post(this.baseUrl+'upload', formData);
  }
}
