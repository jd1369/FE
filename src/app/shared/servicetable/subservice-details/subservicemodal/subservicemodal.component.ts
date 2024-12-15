import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceDetailsService } from '../../service-details/service-details.service';
import { SubservicemodalService } from './subservicemodal.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';

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
      const staticFields = {
        name: this.editForm.value.name,
        image: this.editForm.value.image,
        subServicePrice: this.editForm.value.subServicePrice
      };

      const transformedFields = this.editForm.value.fields.reduce((acc: any, field: any) => {
        acc[field.type] = field.value; // Assign dynamic key-value pairs
        return acc;
      }, {});

      const subserviceId = this.projectData.id;

      // First save static fields, then save dynamic fields if successful
      this.subservicemodal.saveStaticFields(this.serviceId,subserviceId, staticFields).subscribe({
        next: (response: any) => {
          console.log('Static fields saved successfully:', response);
          
          this.subservicemodal.saveDynamicFields(this.serviceId, subserviceId,transformedFields).subscribe({
            next: (response: any) => {
              console.log('Dynamic fields saved successfully:', response);
              this.close();  // Close modal after saving
            },
            error: (error: any) => {
              console.error('Error saving dynamic fields:', error);
            }
          });
        },
        error: (error: any) => {
          console.error('Error saving static fields:', error);
        }
      });
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
            this.toastr.showErrorMessage('Error deleting field');
          },
        });
    }
  }
}
