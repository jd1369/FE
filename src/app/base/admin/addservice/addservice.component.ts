import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddserviceService } from './addservice.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.scss']
})
export class AddserviceComponent implements OnInit {
  serviceForm!: FormGroup;
  baseUrl = environment.baseUrl;
  selectedFile: File | null = null;
  iconFile: File | null = null;
  uploadedImageUrl: string = '';
  fileError: string = '';
iconFileError: string = '';
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private addService: AddserviceService,
    private http: HttpClient,
    private toastr :ToasterService
  ) { }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      serviceImage: [''],
      icon: [''],
      fields: this.fb.array([]),
    });
  }
  // Get the fields FormArray
  get fields() {
    return this.serviceForm.get('fields') as FormArray;
  }

  // Add dynamic field (key-value pair)
  addField() {
    const fieldGroup = this.fb.group({
      key: ['', [Validators.required, Validators.minLength(2)]],
      value: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.fields.push(fieldGroup);
  }

  // Remove dynamic field
  removeField(index: number) {
    this.fields.removeAt(index);
  }

  // Handle service image file upload
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

  // Submit the form data
  onSubmit(): void {
    if (this.serviceForm.valid) {
      const formData: any = { ...this.serviceForm.value };

      // Prepare the dynamic fields as key-value pairs in the expected format
      const fieldsData = this.fields.controls.reduce((acc: any, fieldGroup) => {
        const key = fieldGroup.get('key')?.value;
        const value = fieldGroup.get('value')?.value;
        if (key && value) {
          acc[key] = value; // Add key-value pair to the fields object
        }
        return acc;
      }, {});

      formData.fields = fieldsData;

      if (this.selectedFile) {
        const fileUploadFormData = new FormData();
        fileUploadFormData.append('file', this.selectedFile, this.selectedFile.name);
        this.http.post(this.baseUrl + 'upload', fileUploadFormData, { responseType: 'json' })
          .subscribe({
            next: (uploadResponse: any) => {
              const fileUrl = uploadResponse.fileUrl || uploadResponse.url || '';
              formData.serviceImage = fileUrl;

              // Upload the icon image if selected
              if (this.iconFile) {
                const iconFileUploadFormData = new FormData();
                iconFileUploadFormData.append('file', this.iconFile, this.iconFile.name);
                this.http.post(this.baseUrl + 'upload', iconFileUploadFormData, { responseType: 'json' })
                  .subscribe({
                    next: (uploadResponse: any) => {
                      const fileUrl = uploadResponse.fileUrl || uploadResponse.url || '';
                      formData.icon = fileUrl;
                      this.toastr.showSuccessMessage('Image Uploded Successfully');

                      this.submitProject(formData);
                    },
                    error: (err) => {
                      console.error('Icon file upload failed!', err);
                      this.toastr.showErrorMessage('Failed To Upload Icon');
                    }
                  });
              }
            },
            error: (err) => {
              console.error('Service image upload failed!', err);
              this.toastr.showErrorMessage('Failed To Upload Service Image');
            }
          });
      } else {
        formData.serviceImage = [];
        this.submitProject(formData);
      }
    } else {
      console.error('Form is invalid!');
    }
  }

  // Submit the project to the backend
  private submitProject(formData: any): void {
    this.addService.addService(formData).subscribe({
      next: (response: any) => {
        console.log('Service added successfully:', response);
        this.toastr.showSuccessMessage('Data Saved Successfully');
        this.activeModal.dismiss()
        window.location.reload()
      },
      error: (err: any) => {
        console.error('Error adding service:', err);
        this.toastr.showErrorMessage('Failed to Save Data');
      },
    });
  }
}
