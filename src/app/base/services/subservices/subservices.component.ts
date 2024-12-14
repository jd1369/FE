import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { SubservicesService } from './subservices.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProjectsService } from '../../projects/projects.service';
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
       private route: ActivatedRoute
    ) { }
  items: any[] = [
    {
      title: 'THE ADIDAS SUPER BOWL WINNING THROW',
      subtitle: 'Some descriptive text here', 
      image: 'assets/service1.jpg',
      description: 'detailed description of the Adidas Super Bowl winning throw project.'
    },
    {
      title: 'THE ADIDAS SUPER BOWL WINNING THROW',
      subtitle: 'Some  text here', 
      image: 'assets/service1.jpg',
      description: 'This is r Bowl winning throw project.'
    },
    {
      title: 'THE ADIDAS SUPER BOWL WINNING THROW',
      subtitle: 'Some descriptive text here', 
      image: 'assets/service2.jpg',
      description: 'This is a detailed description of the Adidas Super Bowl winning throw project.'
    },
    {
      title: 'THE ADIDAS SUPER BOWL WINNING THROW',
      subtitle: 'Some descriptive text here', 
      image: 'assets/service3.jpg',
      description: 'This is a detailed description of the Adidas Super Bowl winning throw project.'
    },
    {
      title: 'THE ADIDAS SUPER BOWL WINNING THROW',
      subtitle: 'Some descriptive text here', 
      image: 'assets/service4.jpg',
      description: 'This is a detailed description of the Adidas Super Bowl winning throw project.'
    },
    {
      title: 'THE ADIDAS SUPER BOWL WINNING THROW',
      subtitle: 'Some descriptive text here', 
      image: 'assets/service4.jpg',
      description: 'This is a detailed description of the Adidas Super Bowl winning throw project.'
    },
    {
      title: 'THE ADIDAS SUPER BOWL WINNING THROW',
      subtitle: 'Some descriptive text here', 
      image: 'assets/service4.jpg',
      description: 'This is a detailed description of the Adidas Super Bowl winning throw project.'
    },
  ];
  @ViewChild('gridContainer', { static: true }) gridContainer!: ElementRef;
  subServiceData:any
  selectedItem: any = null;
  pagedItems: any[] = [];
  itemsPerPage: number = 6;
  currentPage: number = 1;
  serviceId:any;
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

    console.log('Service ID:', this.serviceId);
    this.updatePagedItems();
    this.getSubServices();  // Fetch the data when component initializes
  }

  // Fetch the data using the service
  getSubServices(): void {
    this.subsevice.getSubServiceData(this.serviceId).subscribe({
      next: (response: any) => {
        console.log('Received data from service:', response);
        this.items = response;  // Store the response data
        this.updatePagedItems();  // Update paged items based on the data
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  // Method to update paged items for pagination
  updatePagedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedItems = this.items.slice(startIndex, endIndex);
  }

  // Method to handle opening a popup
  openPopup(item: any): void {
    console.log('openPopup called');
    this.popupItem = item;
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