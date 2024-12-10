import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  modalWidth: string = '800px'; // Default modal width
  modalHeight: string = '600px'; // Default modal height
  activeTab: string = 'login';
  loginForm!: FormGroup;
  token:any
  user:any;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private toastr :ToasterService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phoneNumber: ['',Validators.required],
      otp:['',Validators.required],
    });
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const { phoneNumber, otp } = this.loginForm.value;
  
      // First login request to get the token
      this.authService.login(phoneNumber, otp).subscribe({
        next: (response: any) => {
          if (response && response.token) { // Assuming the response contains the token
            console.log(response);
            const token = response.token;
            const bearerToken = `Bearer ${token}`;
            console.log(bearerToken)

            this.authService.setToken(token);
            this.authService.loginWithToken(bearerToken).subscribe({
              next: (loginResponse: any) => {
                if (loginResponse) {
                  console.log('Login with token successful:', loginResponse);
                }
              },
              error: (err: any) => {
                console.error('Login with token failed', err);
              }
            });
  
            // Show success message
            this.toastr.showSuccessMessage('Login Successful!', 'Success');
            // this.router.navigate(['/base']);
          }
        },
        error: (err: any) => {
          console.error('Login failed', err);
        },
      });
    }
    console.log("Form submission attempted.");
  }
  getOtp(){
    const phoneNumber = this.loginForm.value.phoneNumber
    this.authService.getOtp(phoneNumber).subscribe({
      next: (response: any) => {
        if (response) {
         console.log(response)
         this.token = response
        }
      },
      error: (err: any) => {
        console.log("error")
      },
    })

  }



  openRegisterModal(clickFrom?: any) {
    this.activeModal.close();
    const modalRef = this.modalService.open(RegisterComponent,{size:'lg'});
    modalRef.componentInstance.clickFrom = clickFrom;
  }
}
