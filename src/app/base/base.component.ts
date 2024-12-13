import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { AddsubserviceComponent } from './admin/addsubservice/addsubservice.component';
import { AddserviceComponent } from './admin/addservice/addservice.component';
import { AddprojectComponent } from './admin/addproject/addproject.component';
import { PostablogComponent } from './admin/postablog/postablog.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseService } from './base.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  baseUrl = environment.baseUrl;
  isAdminPage: boolean = false;
  isScrolled = false;
  isLoggedIn = false;
  selectedFile: File | null = null;
  uploadedImageUrl: string = '';
  user: any;
  admin: any;
  url: any;
  loggedIn:any;
  dropdownVisible = false;
  bannerForm!:FormGroup;
  mobileMenuOpen: boolean = false;
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('someElement') someElement!: ElementRef;
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private baseService:BaseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.loggedIn= JSON.parse(localStorage.getItem('loggedIn') || '{}');
    console.log(this.loggedIn)
    this.isAdminPage = this.route.snapshot.routeConfig?.path === 'admin';
    console.log(this.url);
    const now = new Date();
    
    this.bannerForm = this.fb.group({
      id: ['banner-id-1369'],
      name: ['banner'],
      folderName: ['banner'],
      folderPath: ['banner'],
      url:[''],
      createdDate:[now]
    });

    }



  ngAfterViewInit() {
    const fileInput = this.fileInputRef.nativeElement;
    if (fileInput) {
      fileInput.addEventListener('click', () => this.triggerFileInput());
    }
  }
  openLoginModal(clickFrom?: any) {
    const modalRef = this.modalService.open(LoginComponent, { size: 'lg' });
    modalRef.componentInstance.clickFrom = clickFrom;
  };

 
  
 
  // Optional: Add this method to handle navbar collapsing when mouse leaves navbar
  
  toggleDropdown(visible: boolean) {
    this.dropdownVisible = visible;
  }

  logout() {
    this.authService.logout(); // Call logout from AuthService
  }

  

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0; // Change threshold as needed
  }


  // Modal opening functions
  addProject(clickFrom?: any) {
    const modalRef = this.modalService.open(AddprojectComponent, { size: 'lg' });
    modalRef.componentInstance.clickFrom = clickFrom;
  }

  addSubService() {
    const modalRef = this.modalService.open(AddsubserviceComponent, { size: 'lg' });
  }

  addService() {
    const modalRef = this.modalService.open(AddserviceComponent, { size: 'lg' });
  }

  postaBlog() {
    const modalRef = this.modalService.open(PostablogComponent, { size: 'lg' });
  }
  triggerFileInput() {
    const fileInput = document.querySelector('#fileInput') as HTMLElement;
    fileInput.click(); // This will work now without the error
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(file)
      this.selectedFile = file;
      // this.upload(this.selectedFile)
    }
  }

  upload(selectedFile: any) {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);
      const token = localStorage.getItem('authToken');
      console.log(token)
      const headers = new HttpHeaders({
        Token: `Bearer ${token}`,
      });
      this.http.put(this.baseUrl + 'uploadBanner', formData, {
        headers: headers,  
        responseType: 'json' 
      })
        .subscribe({
          next: (response) => {
            console.log(response)
            this.url = response
          },
          error: (err) => {
            console.error('Upload failed!', err)
          }
        });
    }
  }

  onSubmit(): void {
    console.log("Form submitted");
  
    if (this.bannerForm.valid) {
      const formData: any = { ...this.bannerForm.value };
      if (this.selectedFile) {
        const fileUploadFormData = new FormData();
        fileUploadFormData.append('file', this.selectedFile, this.selectedFile.name);
        this.http.post(this.baseUrl + 'upload', fileUploadFormData, { responseType: 'json' })
          .subscribe({
            next: (uploadResponse: any) => {
              console.log('File uploaded successfully:', uploadResponse);
              const fileUrl = uploadResponse;
              console.log(formData)
              formData.url = fileUrl.url;
              console.log(formData) 
              this.baseService.submitBaneer(formData).subscribe({
                next:(response:any)=>{
                  console.log(response)
                },
                error:(err:any)=>{
                  console.log(err)
                },
              })
            },
            error: (err) => {
              console.error('File upload failed!', err);
            }
          });
      } else {
        formData.images = [];
        this.submitProject(formData);
      }
    } else {
      console.error('Form is invalid!');
    }
  }
   submitProject(formData: FormData): void {
   
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  // Scroll event listener (example)
  onScroll() {
    this.isScrolled = window.scrollY > 50; // Modify the value as needed
  }
}
