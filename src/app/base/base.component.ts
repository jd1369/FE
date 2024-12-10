import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { AddsubserviceComponent } from './admin/addsubservice/addsubservice.component';
import { AddserviceComponent } from './admin/addservice/addservice.component';
import { AddprojectComponent } from './admin/addproject/addproject.component';
import { PostablogComponent } from './admin/postablog/postablog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  isAdminPage: boolean = false;
  isMenuOpen: boolean = false;
  lastScrollTop = 0; 
  isDropdownOpen = false;
  navbarVisible = true; 
  isAdminDropdownOpen = false;
  navbarBackground = '#d4d4d491'; 
  textColor = 'black';
  user:any;
  admin:any
  
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.isAdminPage = this.route.snapshot.routeConfig?.path === 'admin';
  }
  
  openLoginModal(clickFrom?: any) {
    const modalRef = this.modalService.open(LoginComponent,{size:'lg'});
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
  newBanner(){

  }
}
