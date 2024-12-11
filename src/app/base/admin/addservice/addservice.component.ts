import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  additionalFields: { name: string, value: string }[] = []; // Array of name-value pairs

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private addService: AddserviceService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: [''],
      image: [''],
      fields: this.fb.array([]), // Initialize the form array for fields
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  addField() {
    const fieldName = `additionalProp${this.additionalFields.length + 1}`;
    const field = { name: fieldName, value: 'new' }; 

    this.additionalFields.push(field); 
    const fieldsControl = this.serviceForm.get('fields') as FormArray;
    fieldsControl.push(this.fb.group({
      [fieldName]: this.fb.group({
        type: ['new'] 
      })
    }));
  }

  removeField(index: number) {
    const fieldName = this.additionalFields[index].name;

    this.additionalFields.splice(index, 1);
    const fieldsControl = this.serviceForm.get('fields') as FormArray;
    fieldsControl.removeAt(index);
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const formData: any = { ...this.serviceForm.value };
  
     
      const fieldsData = this.additionalFields.reduce((acc: { [key: string]: any }, field) => {
        acc[field.name] = { type: field.value }; 
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
              this.submitProject(formData);
            },
            error: (err) => {
              console.error('File upload failed!', err);
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
  

  private submitProject(formData: any): void {
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
