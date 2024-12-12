import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  baseUrl=environment.baseUrl;
  constructor(
    private http: HttpClient,
    private shareservice:SharedserviceService
  ) { }



  getProjectList() {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    console.log(headers)
    return this.http.get(`${this.baseUrl}fetchAllProjectContent`, { headers });
  }
}