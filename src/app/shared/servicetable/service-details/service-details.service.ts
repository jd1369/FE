import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; // You need to import Observable
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
  
export class ServiceDetailsService {
  baseUrl= environment.baseUrl;
  constructor(private http: HttpClient) {}

  // This method should return an Observable
  uploadFile(file: FormData): Observable<any> {
    return this.http.post<any>('/upload', file);  // The return type here should be Observable<any>
  }

  // Other methods
  saveStaticFields(serviceId: any, staticFields:any): Observable<any> {
    const formData = new FormData();
     const token = localStorage.getItem('authToken');
        console.log(token)
        const headers = new HttpHeaders({
          Token: `Bearer ${token}`,
        })
    return this.http.patch<any>(`${this.baseUrl}${serviceId}/updateServiceFields`, staticFields,{headers});
  }

  saveDynamicFields(serviceId: string, fields: any): Observable<any> {
    console.log('Fields being sent:', fields);  // Inspect the fields before sending
    
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);  // Ensure the token is correct
    
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
      'Content-Type': 'application/json',  // Ensure the correct Content-Type is set
    });
  
    // Send the PATCH request with the fields
    return this.http.patch<any>(`${this.baseUrl}${serviceId}/updateServiceMapFields`, fields, { headers });
  }
  

  deleteField(serviceId: string, key: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    return this.http.delete(`${this.baseUrl}deleteAMapFieldFromService/${serviceId}/${key}`,{headers});
  }
}
