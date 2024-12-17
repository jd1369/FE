import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubservicemodalService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  saveStaticFields(subServiceId: any, serviceId: any, staticFields: any): Observable<any> {
    const formData = new FormData();
    const token = localStorage.getItem('authToken');
    console.log(token)
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    })
    return this.http.patch<any>(`${this.baseUrl}${serviceId}/${subServiceId}/updateSubServiceFields`, staticFields, { headers });
  }



  // saveDynamicFields(serviceId: string, subServiceId: any, fields: any): Observable<any> {
  //   console.log('Fields being sent:', fields);  // Inspect the fields before sending

  //   const token = localStorage.getItem('authToken');
  //   console.log('Auth Token:', token);  // Ensure the token is correct

  //   const headers = new HttpHeaders({
  //     Token: `Bearer ${token}`,
  //       // Ensure the correct Content-Type is set
  //   });

  //   // Send the PATCH request with the fields
  //   return this.http.patch<any>(`${serviceId}/updateSubServiceFields/${subServiceId}/fields` , { headers });
  // }

//   saveDynamicFields(serviceId: string, subServiceId: string, fields: any): Observable<any> {
//     console.log('Fields being sent:', fields);
//     console.log(serviceId)
//     console.log(subServiceId)
//     let obj = JSON.stringify(fields)
//     console.log(obj)  // Inspect the fields before sending
//     const token = localStorage.getItem('authToken');
//     console.log('Auth Token:', token);
//     const headers = new HttpHeaders({
//       'Token': `Bearer ${token}`,
      
//     });
//     return this.http.patch<any>(`${this.baseUrl}${serviceId}/updateSubServiceMapFields/${subServiceId}/fields`,fields, { headers });  // Headers should be part of the options object
// }

saveDynamicFields(serviceId: string,subServiceId:string, fields: any): Observable<any> {
  console.log('Fields being sent:', fields);  // Inspect the fields before sending
  
  const token = localStorage.getItem('authToken');
  console.log('Auth Token:', token);  // Ensure the token is correct
  
  const headers = new HttpHeaders({
    Token: `Bearer ${token}`,
    'Content-Type': 'application/json',  // Ensure the correct Content-Type is set
  });

  // Send the PATCH request with the fields
  return this.http.patch<any>(`${this.baseUrl}${serviceId}/updateSubServiceFields/${subServiceId}/fields`,fields, { headers });
}


  // saveDynamicFields(serviceId: string, subServiceId:any,fields: any): Observable<any> {
  //   const token = localStorage.getItem('authToken');
  //       console.log(token)
  //       const headers = new HttpHeaders({
  //         Token: `Bearer ${token}`,
  //       });
  //   return this.http.patch<any>(`${serviceId}/updateServiceMapFields/${subServiceId}`, fields,{headers});
  // }

  deleteField(serviceId: string, subServiceId: any, key: string): Observable<any> {
    const token = localStorage.getItem('authToken')
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });
    return this.http.delete(`${this.baseUrl}deleteAMapFieldFromSubService/${serviceId}/sub-services/${subServiceId}/fields/${key}`, { headers });
  }
}