import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogdetailsService {
private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  baseUrl=environment.baseUrl;
  constructor(
    private http: HttpClient,
    private shareservice:SharedserviceService
  ) { }



  getBlogDetails(blogId:any): Observable<any> {
      const token = localStorage.getItem('authToken');
      const headers = new HttpHeaders({
        Token: `Bearer `,
      });
      return this.http.get(this.baseUrl+'fetchBlogById/'+blogId, {headers});
    }
  
    uploadImage(formData: any) {
      return this.http.post(this.baseUrl+'upload', formData);
    }
}