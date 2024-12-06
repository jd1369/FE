import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContactustableService {
  baseUrl =environment.baseUrl;
  constructor(
    private http: HttpClient
  ) { }

  getContactList() {
    return this.http.get(this.baseUrl+'fetchAllClients')
  }
}