import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubserviceDetailsService {
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
  updateProject(project: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/projects/${project.customerID}`, project); // Replace `customerID` with your unique identifier field
  }
  deleteProject(subServiceId: any,serviceId:any): Observable<void> {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    return this.http.delete<void>(`${this.baseUrl}deleteSubServiceById/${serviceId}/${subServiceId}`,{headers});
  }
}