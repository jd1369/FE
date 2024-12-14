import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceDetailsService } from './service-details.service';
import { error } from 'highcharts';
import { ToasterService } from '../../toaster/toaster.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  dynamicForm: FormGroup;
  @Input() isModalOpen: boolean = false;
  @Input() data: any;

  constructor(private fb: FormBuilder) {
    // Initialize the form with fields as an empty FormArray
    this.dynamicForm = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      serviceImage: ['', Validators.required],
      fields: this.fb.array([]) // Initialize fields as FormArray
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.addDynamicFields(this.data.fields);
    }
  }

  // Add dynamic fields to the form
  addDynamicFields(fields: any) {
    const fieldArray = this.dynamicForm.get('fields') as FormArray;

    Object.keys(fields).forEach(key => {
      const fieldGroup = this.fb.group({});
      
      Object.entries(fields[key]).forEach(([subKey, value]) => {
        fieldGroup.addControl(subKey, this.fb.control(value));
      });

      fieldArray.push(fieldGroup);
    });
  }

  // Helper method to get object keys for iteration in HTML
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  // Get the 'fields' FormArray, with type casting
  get fields(): FormArray {
    return this.dynamicForm.get('fields') as FormArray;
  }

  // Handle form submission
  onSubmit() {
    console.log('Form Data:', this.dynamicForm.value);
    this.closeModal();
  }

  // Close the modal
  closeModal() {
    this.isModalOpen = false;
  }
}