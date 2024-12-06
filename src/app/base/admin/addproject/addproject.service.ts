import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AddprojectService {
  baseUrl= environment.baseUrl;
  constructor(private http: HttpClient) { }
  
  addProject(data: FormData): Observable<any> {
    return this.http.post(this.baseUrl+'postProject', data);
  }

  uploadImage(file:FormData){
    return this.http.post(this.baseUrl+'upload',file)
  }
}
