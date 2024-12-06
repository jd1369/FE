import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
 contactForm!:FormGroup
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['',],
      emailId: [''],  
      descption: ['']
    });
  }

  onSubmit(){

  }

}
