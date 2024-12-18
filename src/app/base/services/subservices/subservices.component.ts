import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { SubservicesService } from './subservices.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProjectsService } from '../../projects/projects.service';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-subservices',
  templateUrl: './subservices.component.html',
  styleUrls: ['./subservices.component.scss']
})
export class SubservicesComponent implements OnInit {
constructor(private http: HttpClient,
      private projectService:ProjectsService,
      private subsevice : SubservicesService,
      private sharedservice:SharedserviceService,
      private router: Router,
      private renderer: Renderer2,
      private modalService: NgbModal,
       private route: ActivatedRoute
    ) { }

  @ViewChild('gridContainer', { static: true }) gridContainer!: ElementRef;
  subServiceData:any
  selectedItem: any = null;
  pagedItems: any[] = [];
  itemsPerPage: number = 6;
  currentPage: number = 1;
  item:any
  serviceId:any;
  user:boolean =false
  admin:boolean =false
  image:any
  serviceName:any;
  popupVisible = false;
  popupItem: any;
  projects:any;
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.serviceId = params['id'];
      this.serviceName = params['name'];
      console.log('Received Query Params:', params);
    });
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    console.log('Service ID:', this.serviceId);
    this.updatePagedItems();
    this.getSubServices();  // Fetch the data when component initializes
  }

  // Fetch the data using the service
  getSubServices(): void {
    this.subsevice.getSubServiceList(this.serviceId).subscribe({
      next: (response: any) => {
        console.log('Received data from service:', response);
        if (Array.isArray(response)) {
          console.log(response)
          this.item = response;  // Store the response data if it's an array
        } else {
          this.item = [];  // Set to an empty array if the data is not in the expected format
          console.error('Received data is not an array:', response);
        }
        this.updatePagedItems();  // Update paged items based on the data
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
        this.item = [];  // Set item to an empty array in case of error
        this.updatePagedItems();
      },
    });
  }
   openLoginModal(clickFrom?: any) {
      const modalRef = this.modalService.open(LoginComponent, { size: 'lg' });
      modalRef.componentInstance.clickFrom = clickFrom;
    };

  // Method to update paged items for pagination
  updatePagedItems() {
    if (Array.isArray(this.item)) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.pagedItems = this.item.slice(startIndex, endIndex);
    } else {
      // Handle the case where `this.item` is not an array or is undefined
      console.warn('Item data is not an array or is undefined:', this.item);
      this.pagedItems = [];  // Clear pagedItems if `item` is invalid
    }
  }
  objectKeys(obj: any): string[] {
    return Object.keys(obj); // Returns an array of keys from the object
  }
  // Method to handle opening a popup
  openPopup(item: any): void {
    console.log('openPopup called');
    this.popupItem = item;
    
    console.log(item.fields)
    this.popupVisible = true;
  }

  // Method to hide the popup
  hidePopup(): void {
    console.log('hidePopup called');
    this.popupVisible = false;
    this.popupItem = null;
  }

  // Show popup on item click
  showPopup(item: any): void {
    console.log('showPopup called');
    this.popupItem = item;
    this.popupVisible = true;
  }

  // Hide popup on hover
  hidePopupOnHover(): void {
    console.log('hidePopupOnHover called');
    this.popupVisible = false;
    this.popupItem = null;
  }
}