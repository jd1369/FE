import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ServiceDetailsService } from './service-details.service';
import { error } from 'highcharts';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  @Input() projectData: any;  // Data passed from the parent component
  editForm!: FormGroup;

  constructor(private fb: FormBuilder, private modalService: NgbModal,private serviceDetails:ServiceDetailsService) {}

  ngOnInit(): void {
    if (this.projectData) {
      this.initializeForm();
    }
    
  }

  // Initialize form based on projectData
  initializeForm(): void {
    this.editForm = this.fb.group({
      name: [this.projectData.name],
      image: [this.projectData.image],
      fields: this.fb.array([])  // Initialize the FormArray for dynamic fields
    });

    this.addDynamicFields(this.projectData.fields);
  }

  // Add dynamic fields to the form
  addDynamicFields(fields: any): void {
    const fieldArray = this.editForm.get('fields') as FormArray;

    // Iterate over the dynamic fields (e.g., additionalProp1, additionalProp2, etc.)
    Object.keys(fields).forEach((key) => {
      const field = fields[key];

      // Initialize a FormGroup with two fields: type (key) and value
      const control = this.fb.group({
        type: [Object.keys(field)[0]],  // Use the key (e.g., 'movies')
        value: [Object.values(field)[0]], // Use the value (e.g., 'hindi')
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
      const staticFields = {

        name: this.editForm.value.name,
        image: this.editForm.value.image
      };

   
      const transformedFields = this.editForm.value.fields.reduce((acc: any, field: any, index: number) => {
        const key = `additionalProp${index + 1}`;  
        acc[key] = { [field.type]: field.value };  
        return acc;
      }, {});
      const serviceId = this.projectData.id;

      this.serviceDetails.saveStaticFields(serviceId,staticFields).subscribe({
        next:(response) => {
          console.log('Static fields saved successfully:', response);
   
          this.serviceDetails.saveDynamicFields(serviceId,transformedFields).subscribe({
            next:(response) => {
              console.log('Dynamic fields saved successfully:', response);
              this.close();
            },
            error:(error) => {
              console.error('Error saving dynamic fields:', error);
            },
         } );
        },
        error:(error) => {
          console.error('Error saving static fields:', error);
        }
      }) ;
    }
  }


  // Close method for the modal
  close(): void {
    this.modalService.dismissAll();
  }
}
