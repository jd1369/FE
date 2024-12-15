import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { AddsubserviceService } from './addsubservice.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, of } from 'rxjs';
import { AddserviceService } from '../addservice/addservice.service';
@Component({
  selector: 'app-addsubservice',
  templateUrl: './addsubservice.component.html',
  styleUrls: ['./addsubservice.component.scss']
})
export class AddsubserviceComponent implements OnInit {
 baseUrl = environment.baseUrl;
  form!: FormGroup;
  iconPreview: string | ArrayBuffer | null = null;
  serviceImagePreview: string | ArrayBuffer | null = null;
  serviceImageFile: File | null = null;
  iconFile: File | null = null;
  serviceId:any
  projectData:any
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private addsubservice: AddsubserviceService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
    
      image: [''],
      fields: this.fb.group({
        additionalProps: this.fb.array([]),
      }),
    });
    this.serviceId =this.projectData.id
    console.log(this.serviceId)
  }

  get additionalProps(): FormArray {
    return (this.form.get('fields') as FormGroup).get('additionalProps') as FormArray;
  }

  addAdditionalProp(): void {
    const propGroup = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
    });
    this.additionalProps.push(propGroup);
  }

  removeAdditionalProp(index: number): void {
    this.additionalProps.removeAt(index);
  }

  onIconChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.iconFile = file;
    }
  }

  onServiceImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.serviceImageFile = file;
    }
  }

  onSubmit() {
    const formData: any = { ...this.form.value };

    // Handle file uploads
    const uploadRequests = [];

    if (this.serviceImageFile) {
      const fileUploadFormData = new FormData();
      fileUploadFormData.append('file', this.serviceImageFile, this.serviceImageFile.name);

      const uploadRequest = this.http.post(this.baseUrl + 'upload', fileUploadFormData, { responseType: 'json' }).pipe(
        map((uploadResponse: any) => {
          const fileUrl = uploadResponse.fileUrl || uploadResponse.url || '';
          formData.image = fileUrl;  // Store the single string URL instead of an array
        }),
        catchError((err) => {
          console.error('Service Image Upload failed!', err);
          return of(null);
        })
      );
      uploadRequests.push(uploadRequest);
    }

    

    // After uploading files, process the additional props and submit
    forkJoin(uploadRequests).subscribe({
      next: () => {
        // Transform additionalProps into the structure with dynamic keys like 'additionalProps', 'additionalProps2'
        const transformedProps = formData.fields.additionalProps.reduce((acc: any, prop: any, index: number) => {
          const propName = `additionalProps${index + 1}`; // Creating dynamic key names like additionalProps, additionalProps2, etc.
          acc[propName] = {
            [prop.key]: prop.value,
          };
          return acc;
        }, {});

        const jsonData = {
          ...formData,
          fields: transformedProps,
        };

        this.submitProject(jsonData);
      },
      error: (err:any) => {
        console.error('File upload error:', err);
      }
    });
  }

  private submitProject(formData: any): void {
    console.log(13)
    this.addsubservice.addSubService(this.serviceId,formData).subscribe({
      next: (response: any) => {
        console.log('Service added successfully:', response);
      },
      error: (err: any) => {
        console.error('Error adding service:', err);
      },
    });
  }
}
