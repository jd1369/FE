import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AboutusService } from './aboutus.service';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
 contactForm!:FormGroup
  constructor(
    private fb: FormBuilder,
    private aboutService :AboutusService,
    private toastr : ToasterService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tellUsAboutYourProject: ['', [Validators.required]]
    });
  }
  get f() {
    return this.contactForm.controls;
  }

  onSubmit(){
    if (this.contactForm.invalid) {
      return; // Stop if the form is invalid
    }
    const formData = this.contactForm.value;
    console.log(formData)
    this.aboutService.addDetails(formData).subscribe({
      next :(response:any)=>{
        console.log(response)
        this.toastr.showSuccessMessage('Details Submitted Successfully');
        window.location.reload()
      },
      error:(error:any)=>{
        console.log(error)
        this.toastr.showErrorMessage('Falied Please Try Again');
      }
      })

  }

}
