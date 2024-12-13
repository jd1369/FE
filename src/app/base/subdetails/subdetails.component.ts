import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { ProjectsService } from '../projects/projects.service';

@Component({
  selector: 'app-subdetails',
  templateUrl: './subdetails.component.html',
  styleUrls: ['./subdetails.component.scss']
})
export class SubdetailsComponent implements OnInit {
constructor(private http: HttpClient,
      private projectService:ProjectsService,
      private sharedservice:SharedserviceService,
      private router: Router
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
  selectedItem: any = null;
  pagedItems: any[] = [];
  itemsPerPage: number = 6;
  currentPage: number = 1;
  popupVisible = false;
  popupItem: any;
  projects:any;
  ngOnInit() {
    this.updatePagedItems();
    
    console.log(this.popupItem); // Log the popupItem to check if the data is correctly assigned
    this.getProjects();
  }

  sendData(data:any) {
    console.log('123')
    this.sharedservice.setProjectData(data);
    this.router.navigate(['base/projectdetails'])
  }

  getProjects(): void {
    this.projectService.getProjectList()
      .subscribe(data => {
        this.projects = data;
        console.log(this.projects)
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
