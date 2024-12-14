import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddserviceService } from './addservice.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.scss']
})
export class AddserviceComponent implements OnInit {
  dynamicForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the form
    this.dynamicForm = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      serviceImage: ['', Validators.required],
      fields: this.fb.array([]) // Dynamic form array for additional properties
    });
  }

  // Getter for the fields array
  get fields() {
    return (this.dynamicForm.get('fields') as FormArray);
  }

  // Function to add a new dynamic field with a key and value
  addField(): void {
    const fieldGroup = this.fb.group({
      key: ['', Validators.required],  // Key for the field, like 'additionalProp1'
      value: this.fb.group({
        key: ['', Validators.required],  // Inner key, like 'movies'
        value: ['', Validators.required]  // Inner value, like 'top'
      })
    });
    this.fields.push(fieldGroup);
  }

  // Function to remove a dynamic field
  removeField(index: number): void {
    this.fields.removeAt(index);
  }

  // Submit function to capture the form data
  onSubmit(): void {
    if (this.dynamicForm.valid) {
      console.log(this.dynamicForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
  closeModal(){
    
  }
}