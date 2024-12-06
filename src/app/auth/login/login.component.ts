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

  onSubmit() {
    if (this.loginForm.valid) {

      const { phoneNumber, otp } = this.loginForm.value;
      this.authService.login(phoneNumber, otp).subscribe({
        next: (response: any) => {
          if (response) {
           console.log(response);
           console.log(this.token)
           this.authService.loginWithtoken(this.token)
           this.toastr.showSuccessMessage('Login Successful!', 'Success');
          //  this.router.navigate(['/base'])
          }
        },
        error: (err: any) => {
          console.log("error");
          console.error('Login failed', err)
        },
      });
    }
    console.log("qwqe")
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
