import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceDetailsService } from './service-details.service';
import { ToasterService } from '../../toaster/toaster.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit {
  @Input() projectData: any; // Data passed from the parent component
  editForm!: FormGroup;
  baseUrl = environment.baseUrl;
  selectedFile: File | null = null;
  iconFile: File | null = null;
  key!:string
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private serviceDetails: ServiceDetailsService,
    private toastr: ToasterService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      serviceImage: [''],
      icon: [''],
      fields: this.fb.array([]), // Initialize the form array for dynamic fields
    });

    if (this.projectData) {
      this.initializeForm();
    }
  }

  // File selection for service image
  onServiceImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // File selection for icon
  onIconSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.iconFile = file;
    }
  }

  // Initialize the form with projectData
  initializeForm(): void {
    this.editForm = this.fb.group({
      name: [this.projectData.name, Validators.required],
      serviceImage: [this.projectData.serviceImage],
      icon: [this.projectData.icon],
      fields: this.fb.array([]),
    });

    this.addDynamicFields(this.projectData.fields);
  }

  // Add dynamic fields based on projectData
  addDynamicFields(fields: any): void {
    const fieldArray = this.editForm.get('fields') as FormArray;

    Object.entries(fields).forEach(([key, value]) => {
      const control = this.fb.group({
        type: [key], // Dynamic key
        value: [value, Validators.required], // Corresponding value
      });

      fieldArray.push(control);
    });
  }

  // Getter for fields FormArray
  get fields(): FormArray {
    return this.editForm.get('fields') as FormArray;
  }

  // Save method with file upload handling
  save(): void {
    const staticFields = {
      name: this.editForm.value.name,
      icon: this.editForm.value.icon,
      serviceImage: this.editForm.value.serviceImage,
    };

    // Transform fields to match the dynamic key-value format
    const transformedFields = this.editForm.value.fields.reduce((acc: any, field: any) => {
      acc[field.type] = field.value; // Assign dynamic key-value pairs
      return acc;
    }, {});

    const fileUpload$ = this.selectedFile ? this.uploadFile(this.selectedFile) : of(null);
    const iconUpload$ = this.iconFile ? this.uploadFile(this.iconFile) : of(null);

    forkJoin([fileUpload$, iconUpload$])
      .pipe(
        switchMap(([serviceImageResponse, iconResponse]) => {
          if (serviceImageResponse) {
            staticFields.serviceImage = serviceImageResponse.fileUrl || serviceImageResponse.url;
          }
          if (iconResponse) {
            staticFields.icon = iconResponse.fileUrl || iconResponse.url;
          }

          return this.serviceDetails.saveStaticFields(this.projectData.id, staticFields);
        }),
        switchMap(() => this.serviceDetails.saveDynamicFields(this.projectData.id, transformedFields))
      )
      .subscribe({
        next: () => {
          this.toastr.showSuccessMessage('Data Submitted Successfully');
          this.close();
          window.location.reload();
        },
        error: (err) => {
          console.error('Error saving data:', err);
          this.toastr.showErrorMessage('Error While Submitting Data');
        },
      });
  }

  // Helper method to upload files
  private uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}upload`, formData, { responseType: 'json' });
  }

  // Close the modal
  close(): void {
    this.modalService.dismissAll();
  }

  deleteField(index: number): void {
    const fieldToDelete = this.fields.at(index).value;

    if (confirm(`Are you sure you want to delete the field '${fieldToDelete.type}'?`)) {
      this.serviceDetails
        .deleteField(this.projectData.id, fieldToDelete.type)
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

  addField(): void {
    const newField = this.fb.group({
      type: ['', Validators.required], // Default empty key
      value: ['', Validators.required], // Default empty value
    });
  
    this.fields.push(newField);
  }
}
