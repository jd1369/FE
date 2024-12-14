import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicetableService {
  private baseUrl = 'http://localhost:1369';

  constructor(private http: HttpClient) {}

  getServiceList() {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    console.log(headers)
    return this.http.get(`${this.baseUrl}fetchAllServices`, { headers });
  }
  addService(service: any): Observable<any> {
    return this.http.post(`${this.baseUrl}addService`, service);
  }

  updateService(service: any): Observable<any> {
    return this.http.put(`${this.baseUrl}updateService/${service.id}`, service);
  }

  deleteService(serviceId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}deleteServiceById/${serviceId}`);
  }

  addSubService(subService: any): Observable<any> {
    return this.http.post(`${this.baseUrl}addSubService`, subService);
  }

  updateSubService(subService: any): Observable<any> {
    return this.http.put(`${this.baseUrl}updateSubService/${subService.id}`, subService);
  }

  deleteSubService(subServiceId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}deleteSubServiceById/${subServiceId}`);
  }
}
