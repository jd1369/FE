import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Token } from '@angular/compiler';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:1369';
  baseUrl = environment.baseUrl;
  private tokenKey = 'authToken';
   private user = 'user';
   private admin = 'admin'
  private isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  isLoggedIn() {
    return this.isAuthenticated$.asObservable();
  }





  getOtp(phoneNumber: string) {
    return this.http
      .post(`${this.baseUrl}generateOtp/` + phoneNumber, { phoneNumber })
  }

  login(phoneNumber: string, otp: string) {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}login`, { phoneNumber, otp })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.token);
          
          console.log(response.token)
          this.loginWithToken(response.token).subscribe({
            next: (response: any) => {
              if (response) {
                console.log("acsa")
                console.log(response)
                
                localStorage.setItem(this.user, response.user);
                console.log(response.user)
                console.log("acsa")
                localStorage.setItem(this.admin, response.admin);
                console.log("acsa")
              }
            },
            error: (err: any) => {

              console.log("error")
            },
          });
          this.isAuthenticated$.next(true);

        })
      );
  }

  loginWithToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Token: `Bearer ${token}`,
    });

    //  return this.http.post(this.baseUrl +'loginWithToken', { headers });
    return this.http.post(this.baseUrl + 'loginWithToken', {},
      {
        headers,
      });
  }


  register(emailId: string, name: string, phoneNumber: string) {
    return this.http.post(`${this.apiURL}/register`, { name, phoneNumber, emailId });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.admin);
    localStorage.removeItem(this.user);
    this.isAuthenticated$.next(false);
    this.router.navigate(['/base/home']);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    
  }

  
  


  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  getUser(): string | null {
    return localStorage.getItem(this.user);
  }
  getAdmin(): string | null {
    return localStorage.getItem(this.admin);
  }


  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  clearUser(): void {
    localStorage.removeItem(this.user);
  }
  clearAmin(): void {
    localStorage.removeItem(this.admin);
  }
  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<{ token: string }>('/api/refreshToken', { refreshToken }).pipe(
      map((response) => response.token)
    );
  }


}
