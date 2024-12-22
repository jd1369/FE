// Simplified imports by removing unused modules
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { ProjectsService } from '../../projects/projects.service';
import { SubservicesService } from './subservices.service';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  selector: 'app-subservices',
  templateUrl: './subservices.component.html',
  styleUrls: ['./subservices.component.scss']
})
export class SubservicesComponent implements OnInit {

  @ViewChild('gridContainer', { static: true }) gridContainer!: ElementRef;

  // Class properties
  subServiceData: any;
  selectedItem: any = null;
  pagedItems: any[] = [];
  itemsPerPage: number = 6;
  currentPage: number = 1;
  item: any;
  serviceId: any;
  user: boolean = false;
  admin: boolean = false;
  serviceName: any;
  popupVisible: boolean = false;
  popupItem: any;

  constructor(
    private http: HttpClient,
    private projectService: ProjectsService,
    private subservice: SubservicesService,
    private sharedservice: SharedserviceService,
    private router: Router,
    private renderer: Renderer2,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Extract query parameters and initialize component data
    this.route.queryParams.subscribe(params => {
      this.serviceId = params['id'];
      this.serviceName = params['name'];
    });

    // Check user and admin roles
    this.admin = JSON.parse(localStorage.getItem('admin') || 'false');
    this.user = JSON.parse(localStorage.getItem('user') || 'false');

    this.updatePagedItems();
    this.getSubServices();
  }

  // Toggle additional details for a specific item
  toggleDetails(item: any): void {
    item.showMoreDetails = !item.showMoreDetails;
  }

  // Fetch sub-services data using the service
  getSubServices(): void {
    this.subservice.getSubServiceList(this.serviceId).subscribe({
      next: (response: any) => {
        if (Array.isArray(response)) {
          this.item = response;
        } else {
          this.item = [];
          console.error('Unexpected response format:', response);
        }
        this.updatePagedItems();
      },
      error: (error: any) => {
        console.error('Error fetching sub-services:', error);
        this.item = [];
        this.updatePagedItems();
      }
    });
  }

  // Open login modal
  openLoginModal(clickFrom?: any): void {
    const modalRef = this.modalService.open(LoginComponent, { size: 'lg' });
    modalRef.componentInstance.clickFrom = clickFrom;
  }

  // Update items displayed for the current page
  updatePagedItems(): void {
    if (Array.isArray(this.item)) {
      const startIndex = (this.currentPage - 1) * this.item.length;
      const endIndex = startIndex + this.item.length;
      this.pagedItems = this.item.slice(startIndex, endIndex);
    } else {
      console.warn('Invalid data format for pagination:', this.item);
      this.pagedItems = [];
    }
  }

  // Helper to get object keys
  objectKeys(obj: object): string[] {
    return Object.keys(obj);
  }

  // Open popup for a specific item
  openPopup(item: any): void {
    this.popupItem = item;
    this.popupVisible = true;
  }

  // Hide popup
  hidePopup(): void {
    this.popupVisible = false;
    this.popupItem = null;
  }
}
