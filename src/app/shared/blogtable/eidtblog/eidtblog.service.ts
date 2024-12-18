import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EidtblogService {
baseUrl= environment.baseUrl;
  constructor(private http: HttpClient) { }
  
  saveProject(formData: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    return this.http.put(this.baseUrl+'updateBlog', formData,{headers});
  }

  uploadImage(formData: any) {
    return this.http.post(this.baseUrl+'upload', formData);
  }
  deleteProject(customerID: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    return this.http.delete<void>(`${this.baseUrl}deleteBlogById/${customerID}`,{headers});
  }
}