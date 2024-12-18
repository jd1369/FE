import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  constructor(private http: HttpClient,
      private projectService: ProjectsService,
      private sharedservice: SharedserviceService,
      private router: Router
    ) { }

  // Initialize empty arrays for items and pagedItems
  items:any;
  selectedItem: any = null;
  pagedItems: any[] = [];
  itemsPerPage: number = 6;
  currentPage: number = 1;
  popupVisible = false;
  popupItem: any;
  projects: any;
  serviceId :any
  ngOnInit() {
    // Fetch projects on component initialization
    this.getProjects();
  }

  sendData(data: any) {
    // console.log('123');
    // this.sharedservice.setProjectData(data);
    this.router.navigate(['projectdetails']); 
  }

  // Fetch projects from API
  getProjects(): void {
    this.projectService.getProjectList().subscribe((data: any) => {
      if (Array.isArray(data)) {
        console.log(data)
        this.items = data
      } else {
        console.error('API response is not an array:', data);
        this.items = []; // Fallback to an empty array
      }
      this.updatePagedItems();
    }, error => {
      console.error('Error fetching projects:', error);
      this.items = [];
    });
  }
  

  updatePagedItems() {
    if (Array.isArray(this.items)) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.pagedItems = this.items.slice(startIndex, endIndex);
      console.log(this.pagedItems)
    } else {
      // Handle the case where `this.item` is not an array or is undefined
      console.warn('Item data is not an array or is undefined:', this.items);
      this.pagedItems = [];  // Clear pagedItems if `item` is invalid
    }
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

  // Pagination logic
  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagedItems();
  }
}
