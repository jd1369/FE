import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EidtblogService } from './eidtblog.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToasterService } from '../../toaster/toaster.service';

@Component({
  selector: 'app-eidtblog',
  templateUrl: './eidtblog.component.html',
  styleUrls: ['./eidtblog.component.scss']
})
export class EidtblogComponent implements OnInit {
 @Input() blogData :any
   baseUrl = environment.baseUrl;
   selectedFile: File | null = null;
   blogForm!:FormGroup
   constructor(public activeModal: NgbActiveModal,
     private editService :EidtblogService,
      private toastr: ToasterService,
      private http: HttpClient,
          private fb: FormBuilder,
      
   ) { }
 
   ngOnInit(): void {
     const now = new Date()
     console.log(this.blogData)
     this.blogData.lastModifiedDate = new Date().toISOString();
     this.blogForm = this.fb.group({
       blogName: [this.blogData.blogName],
       blogDescription: [this.blogData.blogDescription],
       blogContent: [this.blogData.blogContent],
       images: [this.blogData.images],
       blogId :[this.blogData.blogId],
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
   
     if (this.blogForm.valid) {
       const formData: any = { ...this.blogForm.value }; // Initialize form data as plain JSON object
   
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
     this.editService.saveBlog(formData).subscribe({
       next: (response: any) => {
         console.log('Project added successfully:', response);
         this.toastr.showSuccessMessage('Successful');
       },
       error: (err: any) => {
         console.error('Error adding blog:', err);
       },
     });
   }
 
   close() {
     this.activeModal.dismiss();
   }
 
 }
 