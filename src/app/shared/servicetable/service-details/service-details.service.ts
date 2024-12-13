import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceDetailsService {
baseUrl= environment.baseUrl;
private staticFieldsApiUrl = 'http://localhost:1369/{serviceId}/updateServiceFields';
private dynamicFieldsApiUrl = 'http://localhost:1369/{serviceId}/updateServiceMapFields';
  constructor(private http: HttpClient) { }
  
  saveService(projectData: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    return this.http.put(this.baseUrl+'updateProject', projectData,{headers});
  }

  uploadImage(formData: any) {
    return this.http.post(this.baseUrl+'upload', formData);
  }
  saveStaticFields(serviceId: string, data: any): Observable<any> {
     const url = this.staticFieldsApiUrl.replace('{serviceId}', serviceId);
   
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    return this.http.patch(url, data,{headers});
  }

  // Save dynamic fields (FormArray fields)
  saveDynamicFields(serviceId:any,data: any): Observable<any> {
    const url = this.dynamicFieldsApiUrl.replace('{serviceId}', serviceId);
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    return this.http.patch(url, data,{headers});
  }
}