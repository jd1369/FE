import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubservicemodalService {
baseUrl= environment.baseUrl;
  constructor(private http: HttpClient) { }
 
  saveStaticFields(subServiceId:any,serviceId: any, staticFields:any): Observable<any> {
    const formData = new FormData();
     const token = localStorage.getItem('authToken');
        console.log(token)
        const headers = new HttpHeaders({
          Token: `Bearer ${token}`,
        })
    return this.http.patch<any>(`${this.baseUrl}${subServiceId}/${serviceId}/updateSubServiceFields`, staticFields,{headers});
  }


  saveDynamicFields(serviceId: string, subServiceId:any,fields: any): Observable<any> {
    const token = localStorage.getItem('authToken');
        console.log(token)
        const headers = new HttpHeaders({
          Token: `Bearer ${token}`,
        });
    return this.http.patch<any>(`${serviceId}/updateServiceMapFields/${subServiceId}`, fields,{headers});
  }

  deleteField(serviceId: string,subServiceId:any, key: string): Observable<any> {
    const token = localStorage.getItem('authToken')
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    return this.http.delete(`${this.baseUrl}deleteAMapFieldFromSubService/${serviceId}/sub-services/${subServiceId}/fields/${key}`,{headers});
  }
}