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
    private toastr :ToasterService
   
  ) { }

  ngOnInit(): void {

    this.projectForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      projectDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      projectContent: ['', [Validators.required, Validators.minLength(10)]],
      images: [null] // You can validate file uploads programmatically later
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
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
  



 onSubmit(): void {
  console.log("Form submitted");

  if (this.projectForm.valid) {
    const formData: any = { ...this.projectForm.value }; // Initialize form data as plain JSON object

    // Check if a file is selected for upload
    if (this.selectedFile) {
      const fileUploadFormData = new FormData();
      fileUploadFormData.append('file', this.selectedFile, this.selectedFile.name);

      // Upload the file and get the response
      this.http.post(this.baseUrl + 'upload', fileUploadFormData, { responseType: 'json' })
        .subscribe({
          next: (uploadResponse: any) => {
            console.log('File uploaded successfully:', uploadResponse);
           
            // Add the uploaded file URL to the 'images' field as an array
            const fileUrl = uploadResponse.fileUrl || uploadResponse.url || '';
            formData.images = [fileUrl];
            this.toastr.showSuccessMessage('Image Uploaded Successfully');

            // Submit the form with the updated images field
            this.submitProject(formData);
          },
          error: (err) => {
            console.error('File upload failed!', err);
            this.toastr.showErrorMessage('Failed to upload Image');
          }
        });
    } else {
      // If no file is selected, set 'images' as an empty array
      formData.images = [];
      this.submitProject(formData);
    }
  } else {
    console.error('Form is invalid!');
  }
}


// onSubmit(): void {
//   console.log("Form submitted");

//   if (this.projectForm.valid) {
//     const formData: any = { ...this.projectForm.value }; // Initialize form data as plain JSON object
//     const selectedFiles: FileList = this.projectForm.get('images')?.value;

//     if (selectedFiles && selectedFiles.length > 0) {
//       const fileUploadFormData = new FormData();

//       // Iterate through the selected files and append them to the FormData under the same key
//       Array.from(selectedFiles).forEach((file: File) => {
//         fileUploadFormData.append('files[]', file, file.name);
//       });

//       // Upload the files to the server
//       this.http.post(this.baseUrl + 'upload', fileUploadFormData, { responseType: 'json' })
//         .subscribe({
//           next: (uploadResponse: any) => {
//             console.log('Files uploaded successfully:', uploadResponse);

//             // Assuming the server responds with an array of file URLs
//             const fileUrls = uploadResponse.fileUrls || uploadResponse.urls || [];

//             // Add the uploaded file URLs to the 'images' field in formData
//             formData.images = fileUrls;
//             this.toastr.showSuccessMessage('Images Uploaded Successfully');

//             // Submit the form with the updated images field
//             this.submitProject(formData);
//           },
//           error: (err) => {
//             console.error('File upload failed!', err);
//             this.toastr.showErrorMessage('Failed to upload Images');
//           }
//         });
//     } else {
//       // If no files are selected, set 'images' as an empty array
//       formData.images = [];
//       this.submitProject(formData);
//     }
//   } else {
//     console.error('Form is invalid!');
//   }
// }




  
  // Helper method to submit the project form
  private submitProject(formData: FormData): void {
    this.projectService.addProject(formData).subscribe({
      next: (response: any) => {
        console.log('Project added successfully:', response);
        this.toastr.showSuccessMessage('Data Uploaded Successfully');
        this.activeModal.dismiss()
      },
      error: (err: any) => {
        console.error('Error adding project:', err);
        this.toastr.showSuccessMessage('Failed to Save Data');
      },
    });
  }
  

}
