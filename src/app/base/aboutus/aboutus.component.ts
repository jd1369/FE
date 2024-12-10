import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AboutusService } from './aboutus.service';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
 contactForm!:FormGroup
  constructor(
    private fb: FormBuilder,
    private aboutService :AboutusService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [''],
      email: [''],  
      tellUsAboutYourProject: ['']
    });
  }

  onSubmit(){

    const formData = this.contactForm.value;
    console.log(formData)
    this.aboutService.addDetails(formData).subscribe({
      next :(response:any)=>{
        console.log(response)
      },
      error:(error:any)=>{
        console.log(error)
      }
      })

  }

}
