import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { SubservicesService } from './subservices.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
      private renderer: Renderer2
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
  serviceId:any
  popupVisible = false;
  popupItem: any;
  projects:any;
  ngOnInit() {
    this.serviceId = history.state.data;
    console.log(this.serviceId);
    this.updatePagedItems();
    
    console.log(this.popupItem); // Log the popupItem to check if the data is correctly assigned
    this.getSubServices();
  }


  populateGrid(): void {
    this.subServiceData.forEach((item:any) => {
      // Create card div
      const card = this.renderer.createElement('div');
      this.renderer.addClass(card, 'card');
  
      // Create card-header div
      const cardHeader = this.renderer.createElement('div');
      this.renderer.addClass(cardHeader, 'card-header');
  
      // Create icon
      const icon = this.renderer.createElement('i');
      this.renderer.addClass(icon, 'fa');
      this.renderer.addClass(icon, 'fa-info');
      this.renderer.addClass(icon, 'fa-sm');
      this.renderer.setStyle(icon, 'font-size', '1rem');
      this.renderer.setAttribute(icon, 'title', 'View Details');
      this.renderer.listen(icon, 'click', () => this.openPopup(item));
      this.renderer.appendChild(cardHeader, icon);
  
      // Create img
      const img = this.renderer.createElement('img');
      this.renderer.setAttribute(img, 'src', item.images);
      this.renderer.setAttribute(img, 'alt', 'Project image');
  
      // Create h3
      const h3 = this.renderer.createElement('h3');
      const h3Text = this.renderer.createText(item.projectDescription);
      this.renderer.appendChild(h3, h3Text);
  
      // Create p
      const p = this.renderer.createElement('p');
      const pText = this.renderer.createText(item.projectContent);
      this.renderer.appendChild(p, pText);
  
      // Append all elements to card
      this.renderer.appendChild(card, cardHeader);
      this.renderer.appendChild(card, img);
      this.renderer.appendChild(card, h3);
      this.renderer.appendChild(card, p);
  
      // Append card to grid container
      this.renderer.appendChild(this.gridContainer.nativeElement, card);
    });
  }
  
  
  getSubServices(): void {
    this.subsevice.getSubServiceData(this.serviceId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.subServiceData = response;
        this.populateGrid(); // Call without parameters
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  

  updatePagedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedItems = this.items.slice(startIndex, endIndex);
  }

  openPopup(item: any): void {
    console.log('openPopup called');
    this.popupItem = item;
    this.popupVisible = true;
  }

  hidePopup(): void {
    console.log('hidePopup called');
    this.popupVisible = false;
    this.popupItem = null;
  }

  showPopup(item: any): void {
    console.log('showPopup called');
    this.popupItem = item;
    this.popupVisible = true;
  }

  hidePopupOnHover(): void {
    console.log('hidePopupOnHover called');
    this.popupVisible = false;
    this.popupItem = null;
  }
}
