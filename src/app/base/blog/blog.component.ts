import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { ProjectsService } from '../projects/projects.service';
import { Router } from '@angular/router';
import { BlogService } from './blog.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  data: any;
  blogId:any;
  blogContent:any;
  authorName:any;
  blogName:any;
  blogDescription:any;
  constructor(private sharedservice:SharedserviceService,
    private blogservice: BlogService,
          private router: Router
    
  ) { }

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
    this.blogservice.getBlogdetails().subscribe((data: any) => {
      if (Array.isArray(data)) {
        
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
