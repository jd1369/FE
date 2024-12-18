import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl= environment.baseUrl;
  constructor(
    private http: HttpClient
  ) { }
  getChartList() {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    console.log(headers)
    return this.http.get(`${this.baseUrl}serviceClickCounts-PieChart`, { headers });
  }
  
  getDropdown()
  {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    return this.http.get(`${this.baseUrl}namesOfServices`,{headers})
    
  }
  

  updateServiceList(serviceIds:any){
    {
      const token = localStorage.getItem('authToken');
      console.log(token)
      const headers = new HttpHeaders({
        Token: `Bearer `,
      });
      return this.http.post(`${this.baseUrl}topFiveServices`,serviceIds,{headers})

  }
}

}