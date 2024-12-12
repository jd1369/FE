import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceDetailsService } from './service-details.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { error } from 'highcharts';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  @Input() projectData: any;  // Data passed from the parent component
  editForm!: FormGroup;

  constructor(private fb: FormBuilder,private modalService: NgbModal) {}

  ngOnInit(): void {
    if (this.projectData) {
      console.log(this.projectData)
      this.initializeForm();
    }
  }

  // Initialize form based on projectData
  initializeForm(): void {
    this.editForm = this.fb.group({
      projectName: [this.projectData.name],
      image: [this.projectData.image],
      fields: this.fb.array([])  // Initialize the FormArray for dynamic fields
    });

    this.addDynamicFields(this.projectData.fields);
  }

  // Add dynamic fields to the form
  addDynamicFields(fields: any): void {
    const fieldArray = this.editForm.get('fields') as FormArray;

    // Iterate over the dynamic fields (e.g. additionalProp1, additionalProp2, etc.)
    Object.keys(fields).forEach((key) => {
      const field = fields[key];

      // Initialize a FormGroup with two fields: type and value
      const control = this.fb.group({
        type: [field.type || ''],  // Initialize 'type' with the default value
        value: [field.type || ''], // Set default value to type (so user can modify it)
      });

      fieldArray.push(control);
    });
  }


  // Getter for fields FormArray
  get fields(): FormArray {
    return this.editForm.get('fields') as FormArray;
  }

  // Save method
  save(): void {
    if (this.editForm.valid) {
      // Transform the form data to match the required structure
      const transformedFields = this.editForm.value.fields.reduce((acc: any, field: any, index: number) => {
        const key = Object.keys(this.projectData.fields)[index];  // Get the key (e.g., additionalProp1)
        acc[key] = { type: field.type };  // Create the desired structure: { type: "new" }
        return acc;
      }, {});

      const formData = {
        projectName: this.editForm.value.projectName,
        image: this.editForm.value.image,
        fields: transformedFields
      };

      console.log('Transformed Form Data:', formData);
      // You can now send this data to the server or handle it as needed
    }
  }

  // Close method for the modal
  close(): void {
   this.modalService.dismissAll();
}
}