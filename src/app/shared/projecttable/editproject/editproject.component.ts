import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditprojectService } from './editproject.service';
import { ToasterService } from '../../toaster/toaster.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.scss']
})
export class EditprojectComponent implements OnInit {
  @Input() projectData :any
  baseUrl = environment.baseUrl;
  selectedFile: File | null = null;

  projectForm!:FormGroup
  constructor(public activeModal: NgbActiveModal,
    private editService :EditprojectService,
     private toastr: ToasterService,
     private http: HttpClient,
         private fb: FormBuilder,
     
  ) { }

  ngOnInit(): void {
    const now = new Date()
    this.projectData.lastModifiedDate = new Date().toISOString();
    this.projectForm = this.fb.group({
      projectName: [this.projectData.projectName],
      projectDescription: [this.projectData.projectDescription],
      projectContent: [this.projectData.projectContent],
      images: [this.projectData.images],
      projectId :[this.projectData.projectId],
      lastModifiedDate:[now],
      createdDate:[now],

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
  
              // Submit the form with the updated images field
              this.submitProject(formData);
            },
            error: (err) => {
              console.error('File upload failed!', err);
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

  private submitProject(formData: FormData): void {
    this.editService.saveProject(formData).subscribe({
      next: (response: any) => {
        console.log('Project added successfully:', response);
        this.toastr.showSuccessMessage('Successful');
      },
      error: (err: any) => {
        console.error('Error adding project:', err);
      },
    });
  }

  close() {
    this.activeModal.dismiss();
  }

}
