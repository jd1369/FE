import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from '../admin.component';
import { AddprojectService } from './addproject.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.scss']
})
export class AddprojectComponent implements OnInit {
  baseUrl = environment.baseUrl;
  projectForm!: FormGroup;
  selectedFile: File | null = null;
  uploadedImageUrl: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private projectService: AddprojectService,
    private http: HttpClient,
    private toastr: ToasterService

  ) { }

  ngOnInit(): void {

    this.projectForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      projectDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      projectContent: ['', [Validators.required, Validators.minLength(10)]],
      images: [''] // You can validate file uploads programmatically later
    });
  }
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      // Store the files for later submission
      this.projectForm.patchValue({ images: files });
    }
  }
  


  upload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.http.post(this.baseUrl + 'upload', formData, { responseType: 'json' })
        .subscribe({
          next: (response) => {
            console.log(response)
            //formData.append(key, response as string);
          },

          error: (err) => {
            console.error('Upload failed!', err)
          }
        });
    }
  }




  //  onSubmit(): void {
  //   console.log("Form submitted");

  //   if (this.projectForm.valid) {
  //     const formData: any = { ...this.projectForm.value }; // Initialize form data as plain JSON object

  //     // Check if a file is selected for upload
  //     if (this.selectedFile) {
  //       const fileUploadFormData = new FormData();
  //       fileUploadFormData.append('file', this.selectedFile, this.selectedFile.name);

  //       // Upload the file and get the response
  //       this.http.post(this.baseUrl + 'upload', fileUploadFormData, { responseType: 'json' })
  //         .subscribe({
  //           next: (uploadResponse: any) => {
  //             console.log('File uploaded successfully:', uploadResponse);

  //             // Add the uploaded file URL to the 'images' field as an array
  //             const fileUrl = uploadResponse.fileUrl || uploadResponse.url || '';
  //             formData.images = [fileUrl];
  //             this.toastr.showSuccessMessage('Image Uploaded Successfully');

  //             // Submit the form with the updated images field
  //             this.submitProject(formData);
  //           },
  //           error: (err) => {
  //             console.error('File upload failed!', err);
  //             this.toastr.showErrorMessage('Failed to upload Image');
  //           }
  //         });
  //     } else {
  //       // If no file is selected, set 'images' as an empty array
  //       formData.images = [];
  //       this.submitProject(formData);
  //     }
  //   } else {
  //     console.error('Form is invalid!');
  //   }
  // }


  onSubmit(): void {
    console.log("Form submitted");
  
    if (this.projectForm.valid) {
      const formData = new FormData();
      formData.append('projectName', this.projectForm.get('projectName')?.value);
      formData.append('projectDescription', this.projectForm.get('projectDescription')?.value);
      formData.append('projectContent', this.projectForm.get('projectContent')?.value);
  
      // Get the files from the form
      const selectedFiles: FileList = this.projectForm.get('images')?.value;
      console.log(selectedFiles)
      if (selectedFiles && selectedFiles.length > 0) {
        // Append files to FormData under 'files[]'
        Array.from(selectedFiles).forEach((file: File) => {
          formData.append('files[]', file, file.name);
          console.log(formData)
        });
  
        // Make the POST request to upload files
        this.http.post(this.baseUrl + 'upload', formData, { responseType: 'json' })
          .subscribe({
            next: (response: any) => {
              console.log('Files uploaded successfully:', response);
              this.toastr.showSuccessMessage('Files Uploaded Successfully');
              this.submitProject(response);
            },
            error: (err) => {
              console.error('File upload failed!', err);
              this.toastr.showErrorMessage('Failed to upload Files');
            }
          });
      } else {
        console.error('No files selected!');
      }
    } else {
      console.error('Form is invalid!');
    }
  }





  private submitProject(uploadResponse: any): void {
    const formData: any = { ...this.projectForm.value };
    formData.fileUrls = uploadResponse.fileUrls || []; // Adjust based on your server's response
    this.projectService.addProject(formData).subscribe({
      next: (response: any) => {
        console.log('Project added successfully:', response);
        this.toastr.showSuccessMessage('Project Uploaded Successfully');
        this.activeModal.dismiss();
      },
      error: (err: any) => {
        console.error('Error adding project:', err);
        this.toastr.showErrorMessage('Failed to Save Project');
      },
    });
  }

}