import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesComponent } from '../services.component';
@Component({
  selector: 'app-subservices',
  templateUrl: './subservices.component.html',
  styleUrls: ['./subservices.component.scss']
})
export class SubservicesComponent implements OnInit {
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

  constructor(private router: Router) { }

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