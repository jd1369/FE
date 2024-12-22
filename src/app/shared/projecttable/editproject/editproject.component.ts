import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditprojectService } from './editproject.service';
import { ToasterService } from '../../toaster/toaster.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.scss']
})
export class EditprojectComponent implements OnInit {
  @Input() projectData: any; // Data passed from the parent component
  editForm!: FormGroup;
  baseUrl = environment.baseUrl;
  selectedFiles: FileList | null = null;
  now:any
  constructor(
    private fb: FormBuilder,
    private modalService: NgbActiveModal,
    private editService: EditprojectService,
    private toastr: ToasterService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Initialize the form with the passed data
    this.now = new Date()
    this.editForm = this.fb.group({
      projectName: [this.projectData.projectName],
      projectDescription: [this.projectData.projectDescription],
      projectContent: [this.projectData.projectContent],
      images: [''] ,// Handle file uploads programmatically
      lastModifiedDate:[this.now]
    });
  }

  // Handle file selection
  onFilesSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  // Save the edited form data
  save(): void {
    if (this.editForm.valid) {
      const formData = new FormData();
      formData.append('projectName', this.editForm.get('projectName')?.value);
      formData.append('projectDescription', this.editForm.get('projectDescription')?.value);
      formData.append('projectContent', this.editForm.get('projectContent')?.value);
      formData.append('lastModifiedDate',this.now)
      // Add selected files to the FormData
      if (this.selectedFiles && this.selectedFiles.length > 0) {
        Array.from(this.selectedFiles).forEach((file) => {
          formData.append('files', file, file.name);
        });

        const folderName = 'folder'; // Optional: folder name for uploaded files
        formData.append('folderName', folderName);

        this.http.post(this.baseUrl + 'uploadMultipleImages', formData, { responseType: 'json' })
          .subscribe({
            next: (uploadResponse: any) => {
              console.log('Files uploaded successfully:', uploadResponse);
              const fileUrls = uploadResponse.uploadedImages?.map((image: any) => image.url) || [];
              this.editForm.patchValue({ images: fileUrls });

              // After the images are uploaded, submit the project data
              this.submitProject();
            },
            error: (err) => {
              console.error('File upload failed!', err);
              this.toastr.showErrorMessage('Failed to Upload Images');
            }
          });
      } else {
        console.error('Please select at least one file!');
        this.toastr.showErrorMessage('Please select at least one file!');
      }
    } else {
      console.error('Form is invalid!');
      this.toastr.showErrorMessage('Form is invalid!');
    }
  }

  // Submit the project data
  private submitProject(): void {
    const formData: any = { ...this.projectData, ...this.editForm.value };
    this.editService.saveProject(formData).subscribe({
      next: (response: any) => {
        console.log('Project updated successfully:', response);
        this.toastr.showSuccessMessage('Project Updated Successfully');
        this.modalService.close('Save');
      },
      error: (err: any) => {
        console.error('Error updating project:', err);
        this.toastr.showErrorMessage('Failed to Update Project');
      }
    });
  }

  // Delete the project
  delete(): void {
    this.editService.deleteProject(this.projectData.id).subscribe({
      next: (response: any) => {
        console.log('Project deleted successfully:', response);
        this.modalService.close('Delete');
      },
      error: (err: any) => {
        console.error('Error deleting project:', err);
        this.toastr.showErrorMessage('Failed to Delete Project');
      }
    });
  }

  // Close the modal
  close(): void {
    this.modalService.close();
  }
}
