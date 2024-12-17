import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceDetailsService } from '../../service-details/service-details.service';
import { SubservicemodalService } from './subservicemodal.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-subservicemodal',
  templateUrl: './subservicemodal.component.html',
  styleUrls: ['./subservicemodal.component.scss']
})
export class SubservicemodalComponent implements OnInit {
  @Input() projectData: any;  // Data passed from the parent component
  editForm!: FormGroup;
  selectedFile: File | null = null;  // Declare selectedFile to avoid errors
  serviceId:any
  constructor(
    private fb: FormBuilder, 
    private modalService: NgbModal, 
    private subservicemodal: SubservicemodalService,
    private toastr : ToasterService
  ) {}

  ngOnInit(): void {
    console.log('serviceId',this.serviceId)
    if (this.projectData) {
      this.initializeForm();
    }
  }

  // Initialize form based on projectData
  initializeForm(): void {
    this.editForm = this.fb.group({
      name: [this.projectData.name],
      subServicePrice:[this.projectData.subServicePrice],
      image: [this.projectData.image],
      fields: this.fb.array([])  // Initialize the FormArray for dynamic fields
    });

    this.addDynamicFields(this.projectData.fields);
  }

  // Add dynamic fields to the form
  addDynamicFields(fields: any): void {
    const fieldArray = this.editForm.get('fields') as FormArray;
  
    if (fields && typeof fields === 'object') {
      Object.entries(fields).forEach(([key, value]) => {
        const control = this.fb.group({
          type: [key, Validators.required],  // Key as 'type'
          value: [value, Validators.required]  // Corresponding value
        });
        fieldArray.push(control);
      });
    }
  }

  // Getter for fields FormArray
  get fields(): FormArray {
    return this.editForm.get('fields') as FormArray;
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  removeField(index: number) {
    this.fields.removeAt(index);
  }

  // Save method
  save(): void {
    if (this.editForm.valid) {
      // Step 1: Transform fields into a key-value object
      const transformedFields = this.editForm.value.fields.reduce((acc: any, field: any) => {
        acc[field.type] = field.value; // Convert to key-value pairs
        return acc;
      }, {});
  
      console.log('Transformed Fields Payload:', transformedFields); // Debug: log payload
  
      const subServiceId = this.projectData.id;
  
      // Step 2: Call the API to update fields
      this.subservicemodal
        .saveDynamicFields(this.serviceId, subServiceId, transformedFields)
        .subscribe({
          next: (response: any) => {
            console.log('Fields updated successfully:', response);
            this.toastr.showSuccessMessage('Fields updated successfully');
            this.close(); // Close modal
          },
          error: (error: any) => {
            console.error('Error updating fields:', error);
            this.toastr.showErrorMessage('Failed to update fields');
          }
        });
    } else {
      console.error('Form is invalid:', this.editForm.errors);
      this.toastr.showErrorMessage('Invalid form. Please check the fields.');
    }
  }

  // Close method for the modal
  close(): void {
    this.modalService.dismissAll();
  }


  deleteField(index: number): void {
    const fieldToDelete = this.fields.at(index).value;

    if (confirm(`Are you sure you want to delete the field '${fieldToDelete.type}'?`)) {
      this.subservicemodal
        .deleteField(this.serviceId,this.projectData.id, fieldToDelete.type)
        .subscribe({
          next: () => {
            this.fields.removeAt(index);
            this.toastr.showSuccessMessage('Field deleted successfully');
            window.location.reload();
          },
          error: (err) => {
            console.error('Error deleting field:', err);
            this.toastr.showSuccessMessage('Field deleted successfully');
            window.location.reload();
          },
        });
    }
  }
}
