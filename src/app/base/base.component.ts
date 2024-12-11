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

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  baseUrl = environment.baseUrl;
  isAdminPage: boolean = false;
  isMenuOpen: boolean = false;
  lastScrollTop = 0;
  isDropdownOpen = false;
  navbarVisible = true;
  isAdminDropdownOpen = false;
  navbarBackground = '#d4d4d491';
  textColor = 'black';
  selectedFile: File | null = null;
  uploadedImageUrl: string = '';
  user: any;
  admin: any;
  url: any;
  bannerForm!:FormGroup;
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private baseService:BaseService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
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
    // Ensure the reference is available after the view is initialized
    const fileInput = this.fileInputRef.nativeElement;
    if (fileInput) {
      fileInput.addEventListener('click', () => this.triggerFileInput());
    }
  }
  openLoginModal(clickFrom?: any) {
    const modalRef = this.modalService.open(LoginComponent, { size: 'lg' });
    modalRef.componentInstance.clickFrom = clickFrom;
  };

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onAdminHover(isHovered: boolean) {
    this.isAdminDropdownOpen = isHovered;  // Expands navbar when hovering over the "Admin" link
  }

  // Optional: Add this method to handle navbar collapsing when mouse leaves navbar
  onNavbarMouseLeave() {
    this.isAdminDropdownOpen = false; // Collapse navbar when cursor leaves the navbar
  }

  toggleAdminDropdown() {
    this.isAdminDropdownOpen = !this.isAdminDropdownOpen;
    const navbar = document.querySelector('.navbar');
    const appMain = document.querySelector('#app-main');

    if (this.isAdminDropdownOpen) {
      navbar?.classList.add('expanded');
      appMain?.classList.add('has-expanded-navbar'); // Add padding-top to main content
    } else {
      navbar?.classList.remove('expanded');
      appMain?.classList.remove('has-expanded-navbar'); // Reset padding-top
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll <= 0) {
      this.navbarBackground = '#d4d4d491';
      this.textColor = 'black';
      this.navbarVisible = true;
    } else if (currentScroll > this.lastScrollTop) {
      this.navbarVisible = false;
      this.textColor = 'black';
      this.navbarBackground = '#000000';
    } else {
      this.navbarVisible = true;
      this.textColor = 'white';
      this.navbarBackground = '#000000';
    }
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

    if (this.navbarVisible) {
      document.querySelector('.navbar')?.classList.add('navbar-visible');
      document.querySelector('.navbar')?.classList.remove('navbar-hidden');
    } else {
      document.querySelector('.navbar')?.classList.add('navbar-hidden');
      document.querySelector('.navbar')?.classList.remove('navbar-visible');
    }
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
}
