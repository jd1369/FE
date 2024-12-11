import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl=environment.baseUrl;
  constructor(
    private http: HttpClient
  ) { }

  submitBaneer(formData:any){
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    return this.http.put(`${this.baseUrl}uploadBanner`,formData, { headers });
  }
}