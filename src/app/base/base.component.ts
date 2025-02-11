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
import { error } from 'highcharts';
import { SharedserviceService } from '../shared/sharedservice.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  baseUrl = environment.baseUrl;
  admin: boolean = false;
  isAdminPage: boolean = false;
  isScrolled = false;
  selectedFile: File | null = null;
  uploadedImageUrl: string = '';
  user: any;
  url: any;
  isLoggedIn: boolean = false;
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
    private authService: AuthService,
    private sharedService :SharedserviceService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.authService.isLoggedIn().subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
    });
    
    this.isAdminPage = this.route.snapshot.routeConfig?.path === 'admin';
    const now = new Date();
    this.getBanner();
    this.bannerForm = this.fb.group({
      id: ['banner-id-1369'],
      name: ['banner'],
      folderName: ['banner'],
      folderPath: ['banner'],
      url:[''],
      createdDate:[now]
    });
    }

    sendData(data: any) {
      data = this.isLoggedIn
      this.sharedService.setProjectData(data);
   
    }
    getBanner() {
      this.baseService.getBanner().subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {  // Use 'error' instead of 'err'
          console.log(error);
        }
      });
    }

    // getloggedinData(){
    //   return this.sharedService.getlogged()
    // }

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
    fileInput.click(); 
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  upload(selectedFile: any) {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);
      const token = localStorage.getItem('authToken');
      const headers = new HttpHeaders({
        Token: `Bearer ${token}`,
      });
      this.http.put(this.baseUrl + 'uploadBanner', formData, {
        headers: headers,  
        responseType: 'json' 
      })
        .subscribe({
          next: (response) => {
            this.url = response
          },
          error: (err) => {
          }
        });
    }
  }


  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  // Scroll event listener (example)
  onScroll() {
    this.isScrolled = window.scrollY > 50; // Modify the value as needed
  }
}
