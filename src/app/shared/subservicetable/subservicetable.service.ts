import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubservicetableService {
  baseUrl= environment.baseUrl;
  constructor(private http: HttpClient) { }
  getSubserviceList() {
    return this.http.get('assets/data1.json')
  }
  updateProject(project: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/projects/${project.customerID}`, project); // Replace `customerID` with your unique identifier field
  }
  deleteProject(customerID: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/projects/${customerID}`);
  }
}
