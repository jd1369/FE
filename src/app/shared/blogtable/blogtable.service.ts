import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BlogtableService {
  baseUrl=environment.baseUrl;
  constructor(private http: HttpClient) { }
  getBlogList() {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    console.log(headers)
    return this.http.get(`${this.baseUrl}fetchAllBlogContent`, { headers });
  }

  updateProject(blogData: any) {
     const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    return this.http.put(`${this.baseUrl}/updateBlog`,blogData,{headers}); 
  }
  deleteProject(blogId: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    return this.http.delete<void>(`${this.baseUrl}deleteBlogById/${blogId}`,{headers});  }
}
