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

  ngOnInit() {
    // Fetch projects on component initialization
    this.getProjects();
  }

  sendData(data: any) {
    console.log('123');
    this.sharedservice.setProjectData(data);
    this.router.navigate(['/projectdetails']);
  }

  // Fetch projects from API
  getProjects(): void {
    this.projectService.getProjectList().subscribe(data => {
      this.items = data; // Assign API data to items
      this.updatePagedItems(); // Update pagedItems when items are fetched
      console.log(this.items); // Log the fetched items
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

  // Pagination logic
  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagedItems();
  }
}
