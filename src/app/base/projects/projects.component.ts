import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
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

  ngOnInit() {
    this.updatePagedItems();
    console.log(this.popupItem); // Log the popupItem to check if the data is correctly assigned

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
