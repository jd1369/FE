import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostablogService } from './postablog.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
@Component({
  selector: 'app-postablog',
  templateUrl: './postablog.component.html',
  styleUrls: ['./postablog.component.scss']
})
export class PostablogComponent implements OnInit {
  blogForm!: FormGroup;
  selectedFile: File | null = null;
  baseUrl = environment.baseUrl;
  uploadedImageUrl: string = '';
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private blogService:PostablogService,
    private http: HttpClient,
    private toastr: ToasterService
  ) { }
  ngOnInit(): void {
    this.blogForm = this.fb.group({
      blogName: ['', [Validators.required, Validators.minLength(3)]],
      blogDescription: ['', [Validators.required, Validators.minLength(10)]],
      blogContent: ['', [Validators.required, Validators.minLength(20)]],
      authorName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      image: ['']
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
  
    if (this.blogForm.valid) {
      const formData: any = { ...this.blogForm.value }; 
      if (this.selectedFile) {
        const fileUploadFormData = new FormData();
        fileUploadFormData.append('file', this.selectedFile, this.selectedFile.name);
        this.http.post(this.baseUrl + 'upload', fileUploadFormData, { responseType: 'json' })
          .subscribe({
            next: (uploadResponse: any) => {
              console.log('File uploaded successfully:', uploadResponse);
              const fileUrl = uploadResponse.fileUrl || uploadResponse.url || '';
              formData.image = fileUrl;
              this.toastr.showSuccessMessage('Iamge uploaded Successfully');
              this.submitProject(formData);
            },
            error: (err) => {
              console.error('File upload failed!', err);
              this.toastr.showErrorMessage('Failed to Upload Image');
            }
          });
      } else {
        formData.image = [];
        this.submitProject(formData);
      }
    } else {
      console.error('Form is invalid!');
    }
  }
  


    private submitProject(formData: FormData): void {
      this.blogService.addBlog(formData).subscribe({
        next: (response: any) => {
          console.log('Project added successfully:', response);
          this.toastr.showSuccessMessage('Data Saved Successfully');

        },
        error: (err: any) => {
          console.error('Error adding project:', err);
           this.toastr.showErrorMessage('Failed To send Data');

        },
      });
    }

}
