import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { AddsubserviceService } from './addsubservice.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
@Component({
  selector: 'app-addsubservice',
  templateUrl: './addsubservice.component.html',
  styleUrls: ['./addsubservice.component.scss']
})
export class AddsubserviceComponent implements OnInit {
  subServiceForm!: FormGroup;
   baseUrl = environment.baseUrl;
   selectedFile: File | null = null;
   iconFile: File | null = null;
   uploadedImageUrl: string = '';
   projectData:any
   serviceId:any
   constructor(
     public activeModal: NgbActiveModal,
     private fb: FormBuilder,
     private addService: AddsubserviceService,
     private http: HttpClient,
     private toastr :ToasterService
   ) { }
 
   ngOnInit(): void {
    this.serviceId = this.projectData.id
    console.log(this.projectData)
     this.subServiceForm = this.fb.group({
       name: ['', Validators.required],
       image: [''],
       subServicePrice:[''],
       fields: this.fb.array([]),  // Initialize the form array for dynamic fields
     });
   }
 
   // Get the fields FormArray
   get fields() {
     return this.subServiceForm.get('fields') as FormArray;
   }
 
   // Add dynamic field (key-value pair)
   addField() {
     const fieldGroup = this.fb.group({
       key: ['', Validators.required], // Key for the field (e.g., 'place', 'location')
       value: ['', Validators.required]  // Value for the field (e.g., 'hyd', 'kphb')
     });
 
     this.fields.push(fieldGroup);
   }
 
   // Remove dynamic field
   removeField(index: number) {
     this.fields.removeAt(index);
   }
 
   // Handle service image file upload
   onImageSelect(event: any) {
     const file = event.target.files[0];
     if (file) {
       this.selectedFile = file;
     }
   }
 
 
   // Submit the form data
   onSubmit(): void {
     if (this.subServiceForm.valid) {
       const formData: any = { ...this.subServiceForm.value };
 
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
               formData.image = fileUrl;
               this.toastr.showSuccessMessage('Image Uploaded Successfully');
               // Upload the icon image if selected
               this.submitProject(formData);
             },
             error: (err) => {
               console.error('Service image upload failed!', err);
               this.toastr.showErrorMessage('Failed to Uploaded Image');
             }
           });
       } else {
         formData.image = [];
        // this.submitProject(formData);
       }
     } else {
       console.error('Form is invalid!');
     }
   }
 
   // Submit the project to the backend
   private submitProject(formData: any): void {
    console.log("cakked")
     this.addService.addSubService(this.serviceId,formData).subscribe({
       next: (response: any) => {
         console.log('Service added successfully:', response);
         this.toastr.showSuccessMessage('Data Saved Successfully');
         this.activeModal.dismiss()


       },
       error: (err: any) => {
         console.error('Error adding service:', err);
         this.toastr.showErrorMessage('Failed to Save Data');

       },
     });
   }
 }
 