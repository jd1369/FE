import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ServiceDetailsService } from './service-details.service';
import { error } from 'highcharts';
import { ToasterService } from '../../toaster/toaster.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  @Input() projectData: any;  // Data passed from the parent component
  editForm!: FormGroup;
  baseUrl = environment.baseUrl;
  selectedFile: File | null = null;
  iconFile: File | null = null;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private serviceDetails: ServiceDetailsService,
    private toastr: ToasterService,
  ) { }

  ngOnInit(): void {
    if (this.projectData) {
      this.initializeForm();
    }

  }

  onServiceImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Handle icon file upload
  onIconSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.iconFile = file;
    }
  }

  // Initialize form based on projectData
  initializeForm(): void {
    this.editForm = this.fb.group({
      name: [this.projectData.name],
      serviceImage: [this.projectData.serviceImage],
      icon: [this.projectData.icon],
      fields: this.fb.array([])  // Initialize the FormArray for dynamic fields
    });

    this.addDynamicFields(this.projectData.fields);
  }

  // Add dynamic fields to the form
  addDynamicFields(fields: any): void {
    const fieldArray = this.editForm.get('fields') as FormArray;
  
    // Iterate over the keys of the fields object dynamically
    Object.entries(fields).forEach(([key, value]) => {
      const control = this.fb.group({
        type: [key],   // Dynamic key
        value: [value] // Corresponding value
      });
  
      fieldArray.push(control);
    });
  }

  // Getter for fields FormArray
  get fields(): FormArray {
    return this.editForm.get('fields') as FormArray;
  }


  save(): void {
    const staticFields = {
      name: this.editForm.value.name,
      icon: this.editForm.value.icon,
      serviceImage: this.editForm.value.serviceImage
    };
  
    // Transform fields to match the dynamic key-value format
    const transformedFields = this.editForm.value.fields.reduce((acc: any, field: any) => {
      acc[field.type] = field.value; // Assign dynamic key-value pairs
      return acc;
    }, {});
  
    const serviceId = this.projectData.id;
  
    this.serviceDetails.saveStaticFields(serviceId, staticFields).subscribe({
      next: (response: any) => {
        console.log('Static fields saved successfully:', response);
  
        this.serviceDetails.saveDynamicFields(serviceId, transformedFields).subscribe({
          next: (response: any) => {
            console.log('Dynamic fields saved successfully:', response);
            this.toastr.showSuccessMessage('Data Submitted Successfully');
            this.close();
          },
          error: (error: any) => {
            console.error('Error saving dynamic fields:', error);
            this.toastr.showErrorMessage('Error While Submitting Dynamic Fields');
          }
        });
      },
      error: (error: any) => {
        console.error('Error saving static fields:', error);
        this.toastr.showErrorMessage('Error While Submitting Static Fields');
      }
    });
  }
  


  // Close method for the modal
  close(): void {
    this.modalService.dismissAll();
  }
}
