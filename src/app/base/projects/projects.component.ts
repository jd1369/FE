import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  items: any = [
    {
      title: 'THE ADIDAS SUPER BOWL WINNING THROW',
      subtitle: 'Some descriptive text here', image: 'assets/service.png'
    },
    {
      title: 'THE ADIDAS SUPER BOWL WINNING THROW',
      subtitle: 'Some descriptive text here', image: 'assets/service1.jpg'
    },
    {
      title: 'THE ADIDAS SUPER BOWL WINNING THROW',
      subtitle: 'Some descriptive text here', image: 'assets/service2.jpg'
    },
    {
      title: 'THE ADIDAS SUPER BOWL WINNING THROW',
      subtitle: 'Some descriptive text here', image: 'assets/service3.jpg'
    },
    {
      title: 'THE ADIDAS SUPER BOWL WINNING THROW',
      subtitle: 'Some descriptive text here', image: 'assets/service4.jpg'
    },
    {
      title: 'THE ADIDAS SUPER BOWL WINNING THROW',
      subtitle: 'Some descriptive text here', image: 'assets/service4.jpg'
    },
    {
      title: 'THE ADIDAS SUPER BOWL WINNING THROW',
      subtitle: 'Some descriptive text here', image: 'assets/service4.jpg'
    },
  ]
  pagedItems: any[] = [];
  itemsPerPage: number = 6; // Number of items to display per page
  currentPage: number = 1; // Set the current page to 1 initially

  ngOnInit() {
    this.updatePagedItems();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagedItems();
  }

  updatePagedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedItems = this.items.slice(startIndex, endIndex);
  }
}