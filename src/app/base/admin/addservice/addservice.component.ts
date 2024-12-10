import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  serviceForm!: FormGroup;
  baseUrl = environment.baseUrl;
  selectedFile: File | null = null;
  uploadedImageUrl: string = '';
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private addService:AddserviceService,
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: [''],
      images: ['']
    });
  }

  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }


  onSubmit(): void {
    console.log("Form submitted");
  
    if (this.serviceForm.valid) {
      const formData: any = { ...this.serviceForm.value }; // Initialize form data as plain JSON object
  
      // Check if a file is selected for upload
      if (this.selectedFile) {
        const fileUploadFormData = new FormData();
        fileUploadFormData.append('file', this.selectedFile, this.selectedFile.name);
  
        // Upload the file and get the response
        this.http.post(this.baseUrl + 'upload', fileUploadFormData, { responseType: 'json' })
          .subscribe({
            next: (uploadResponse: any) => {
              console.log('File uploaded successfully:', uploadResponse);
  
              // Add the uploaded file URL to the 'image' field as an array
              const fileUrl = uploadResponse.fileUrl || uploadResponse.url || '';
              formData.image = fileUrl;
  
              // Submit the form with the updated image field
              this.submitProject(formData);
            },
            error: (err) => {
              console.error('File upload failed!', err);
            }
          });
      } else {
        // If no file is selected, set 'image' as an empty array
        formData.image = [];
        this.submitProject(formData);
      }
    } else {
      console.error('Form is invalid!');
    }
  }


  private submitProject(formData: FormData): void {
    this.addService.addService(formData).subscribe({
      next: (response: any) => {
        console.log('Project added successfully:', response);
      },
      error: (err: any) => {
        console.error('Error adding project:', err);
      },
    });
  }
  

}
