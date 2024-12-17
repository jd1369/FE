import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditprojectService } from './editproject.service';
import { ToasterService } from '../../toaster/toaster.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.scss']
})
export class EditprojectComponent implements OnInit {
 @Input() projectData: any; // Data passed from the parent component
   editForm!: FormGroup;
   baseUrl = environment.baseUrl;
   selectedFile:any
   iconFile: File | null = null;
   key!:string
   date:any
   constructor(
     private fb: FormBuilder,
     private modalService: NgbActiveModal,
     private editService: EditprojectService,
     private toastr: ToasterService,
     private http: HttpClient
   ) {}
 
   ngOnInit(): void {
    this.date = new Date()
    // Initialize the form with the passed data
    this.editForm = this.fb.group({
      projectName: [this.projectData.projectName, [Validators.required]],
      projectDescription: [this.projectData.projectDescription, [Validators.required]],
      projectContent: [this.projectData.projectContent, [Validators.required]],
      lastModifiedDate: [this.date],
      images: [null] // Handle the images upload separately
    });
  }

  // Handle file selection
  onFilesSelected(event: any): void {
    this.selectedFile = Array.from(event.target.files);
  }

  // Save the edited form data
  save(): void {
    if (this.editForm.valid) {
      const formData = { ...this.projectData, ...this.editForm.value };

      if (this.selectedFile.length > 0) {
        // Create FormData for multiple files
        const fileUploadFormData = new FormData();
        this.selectedFile.forEach((file :any, index:any) => {
          fileUploadFormData.append('files', file, file.name);
        });

        this.http.post(this.baseUrl + 'upload', fileUploadFormData, { responseType: 'json' })
          .subscribe({
            next: (uploadResponse: any) => {
              console.log('Files uploaded successfully:', uploadResponse);
              const fileUrls = uploadResponse.fileUrls || uploadResponse.urls || [];
              formData.images = fileUrls; // Update the form data with the uploaded images URLs
              this.toastr.showSuccessMessage('Files Uploaded');

              // After the images are uploaded, submit the project data
              this.submitProject(formData);
            },
            error: (err) => {
              console.error('File upload failed!', err);
              this.toastr.showErrorMessage('Failed to Upload Images');
            }
          });
      } else {
        // If no files are selected, just submit the form without images
        this.submitProject(formData);
      }
    } else {
      console.log('Form is invalid');
    }
  }

  // Submit the project data (after images upload, if applicable)
  submitProject(formData: any): void {
    this.editService.saveProject(formData).subscribe(
      (response) => {
        console.log('Project updated successfully', response);
        this.toastr.showSuccessMessage('Data updated successfully!');
        this.modalService.close('Save');
      },
      (error) => {
        console.error('Error updating project', error);
        this.toastr.showErrorMessage('Failed to update Data');
      }
    );
  }

  // Delete the project
  delete(): void {
    this.editService.deleteProject(this.projectData.id).subscribe(
      (response:any) => {
        console.log('Project deleted successfully', response);
        this.modalService.close('Delete');
      },
      (error:any) => {
        console.error('Error deleting project', error);
        this.toastr.showErrorMessage('Failed to delete project');
      }
    );
  }

  // Close the modal
  close(): void {
    this.modalService.close();
  }
}