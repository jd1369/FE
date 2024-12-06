import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private authService: AuthService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    console.log("123")
    this.registerForm = this.fb.group({
      emailId: ['',[Validators.required, Validators.email]],
      name: ['', Validators.required],
      phoneNumber:['',[Validators.required]]
    });
  }
  onSubmit() {
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

  openLoginModal(clickFrom?: any) {
    this.activeModal.close();
    const modalRef = this.modalService.open(LoginComponent,{size:'lg  '});
    modalRef.componentInstance.clickFrom = clickFrom;
  };

}
