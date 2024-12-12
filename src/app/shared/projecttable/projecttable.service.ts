import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class ProjecttableService {
  private baseUrl= environment.baseUrl;
  constructor(private http: HttpClient) { }

  getProjectList() {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    console.log(headers)
    return this.http.get(`${this.baseUrl}fetchAllProjectContent`, { headers });
  }

  updateProject(project: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/projects/${project.customerID}`, project); // Replace `customerID` with your unique identifier field
  }
  deleteProject(projectId: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    return this.http.delete<void>(`${this.baseUrl}deleteProjectById/${projectId}`,{headers});
  }
}
