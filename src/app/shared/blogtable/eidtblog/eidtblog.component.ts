import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EidtblogService } from './eidtblog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToasterService } from '../../toaster/toaster.service';

@Component({
  selector: 'app-eidtblog',
  templateUrl: './eidtblog.component.html',
  styleUrls: ['./eidtblog.component.scss']
})
export class EidtblogComponent implements OnInit {
  @Input() blogData: any; // Data passed from the parent component
  editForm!: FormGroup;
  baseUrl = environment.baseUrl;
  selectedFile: File | null = null;
  key!: string;
  date:any
  constructor(
    private fb: FormBuilder,
    private modalService: NgbActiveModal,
    private editBlogService: EidtblogService,
    private toastr: ToasterService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.date = new Date();
    // Check if blogData is available
    if (this.blogData) {
      // Initialize the form with the passed data and validations
      this.editForm = this.fb.group({
        blogName: [
          this.blogData.blogName,
          [Validators.required, Validators.minLength(3), Validators.maxLength(100)] // Example validations
        ],
        blogDescription: [
          this.blogData.blogDescription,
          [Validators.required, Validators.minLength(10), Validators.maxLength(500)] // Example validations
        ],
        blogContent: [
          this.blogData.blogContent,
          [Validators.required, Validators.minLength(20)] // Example validations
        ],
        lastModifiedDate: [this.date], // No validation needed for date
        publishingTimeOfBlog: [
          this.date
          
        ],
        image: [null] // Handle image upload separately
      });
    } else {
      console.error("Blog data not found.");
    }
    console.log(this.blogData);
  }

  // Handle file selection
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Save the edited form data
  save(): void {

      const formData = { ...this.blogData, ...this.editForm.value };

      // If a file is selected, upload it first
      if (this.selectedFile) {
        const fileUploadFormData = new FormData();
        fileUploadFormData.append('file', this.selectedFile, this.selectedFile.name);

        this.http.post(this.baseUrl + 'upload', fileUploadFormData, { responseType: 'json' })
          .subscribe({
            next: (uploadResponse: any) => {
              console.log('File uploaded successfully:', uploadResponse);
              const fileUrl = uploadResponse.fileUrl || uploadResponse.url || '';
              formData.image = fileUrl; // Update the form data with the uploaded image URL
              this.submitProject(formData);
            },
            error: (err) => {
              console.error('File upload failed!', err);
              this.toastr.showErrorMessage('Failed to Upload Image');
            }
          });
      } else {
        // If no file is selected, just submit the form without an image
        this.submitProject(formData);
      }
    
  }

  // Submit the project data (after image upload, if applicable)
  submitProject(formData: any): void {
    this.editBlogService.saveProject(formData).subscribe(
      (response) => {
        console.log('Project updated successfully', response);
        this.toastr.showSuccessMessage('Project updated successfully!');
        this.modalService.close('Save');
      },
      (error) => {
        console.error('Error updating project', error);
        this.toastr.showErrorMessage('Failed to update project');
      }
    );
  }

  // Delete the project
  delete(): void {
    this.editBlogService.deleteProject(this.blogData.id).subscribe(
      (response: any) => {
        console.log('Project deleted successfully', response);
        this.modalService.close('Delete');
      },
      (error: any) => {
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
