import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:1369';
  baseUrl =environment.baseUrl;
  private tokenKey = 'authToken';
  private isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  isLoggedIn() {
    return this.isAuthenticated$.asObservable();
  }




  
  getOtp(phoneNumber:string){
    return this.http
    .post(`${this.baseUrl}generateOtp/`+phoneNumber, { phoneNumber })
  }

  login(phoneNumber: string, otp: string) {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}login`, { phoneNumber, otp })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.token);
          this.isAuthenticated$.next(true);
        })
      );
  }

  loginWithtoken(token:string){
    return this.http.post(`${this.baseUrl}`+'loginWithToken',{token})
  }


  register(emailId: string, name: string, phoneNumber: string) {
    return this.http.post(`${this.apiURL}/register`, { name, phoneNumber, emailId });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated$.next(false);
    this.router.navigate(['/base/home']);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
}
