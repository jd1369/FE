import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  registerForm!: FormGroup;
  token: any
  user: any;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToasterService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      otp: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required]]
    });
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  Register() {
    console.log("1234")
    if (this.registerForm.valid) {
      const { emailId, name, phoneNumber } = this.registerForm.value;
      console.log(this.registerForm.value)
      this.authService.register(emailId, name, phoneNumber).subscribe({
        next: () => alert('Registration successful'),
        error: (err) => console.error('Registration failed', err),

      });
    }
  }


  Login() {
    if (this.loginForm.valid) {
      const { phoneNumber, otp } = this.loginForm.value;

      
      this.authService.login(phoneNumber, otp).subscribe({
        next: (response: any) => {
          if (response && response.token) { 
            console.log(response);
            const token = response.token;
            const bearerToken = `Bearer ${token}`;
            console.log(bearerToken)

            this.authService.setToken(token);
          }
        },
        error: (err: any) => {
          console.error('Login failed', err);
        },
      });
    }
    console.log("Form submission attempted.");
  }
  getOtp() {
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
    const modalRef = this.modalService.open(RegisterComponent, { size: 'lg' });
    modalRef.componentInstance.clickFrom = clickFrom;
  }
}
