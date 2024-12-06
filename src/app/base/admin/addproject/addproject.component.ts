import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from '../admin.component';
import { AddprojectService } from './addproject.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.scss']
})
export class AddprojectComponent implements OnInit {
  baseUrl= environment.baseUrl;
  projectForm!: FormGroup;
  selectedFile: any ;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private projectService: AddprojectService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    
    this.projectForm = this.fb.group({
      projectName: ['',],
      descp: ['',],
      catg: ['',],
      name: ['',],
      country: ['',],
      state: ['',],
      img: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }



  onSubmit(): void {
    console.log("1234")
    if (this.projectForm.valid) {
      const formData = new FormData();
      Object.entries(this.projectForm.value).forEach(([key, value]) => {
        if (key !== 'img') {
          formData.append(key, value as string);
        }
      });
      if (this.selectedFile) {
        const formData1 = new FormData();
        formData1.append('img', this.selectedFile);
        console.log("0000")
        this.projectService.uploadImage(formData1).subscribe({
          next: (response: any) => {
            if (response) {
             console.log(`File uploaded successfully! URL: ${response.url}`);
            }
          },
          error: (err: any) => {
            console.log("error");
          },
        });
        console.log(formData1)
      }

      
      this.projectService.addProject(formData).subscribe({
        next: (response: any) => {
          if (response) {
           console.log(response);
          }
        },
        error: (err: any) => {
          console.log("error");
        },
      });
    } else {
      console.error('Form is invalid!');
    }
  }
  
}
