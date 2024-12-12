import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomeService } from './home.service';
interface Product {
  name: string;
  image: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  imageUrl:any
  images :any=[
    { name: 'Web Development', image: 'assets/service.png' },
    { name: 'Graphic Design', image: 'assets/service1.jpg' },
    { name: 'SEO Optimization', image: 'assets/service2.jpg' },
    { name: 'Digital Marketing', image: 'assets/service3.jpg' },
    { name: 'Content Creation', image: 'assets/service4.jpg' },
  ]
  visibleImages: any[] = [];
  currentIndex = 0;
  autoScrollInterval: any;
  url: string = '';
  isAnimating = false;
  isToggled: boolean = false;
  switchBanner:any
  constructor(
    private http: HttpClient,
    private homeService:HomeService
  ) { }

  ngOnInit(): void {
    this.getBanner();
    this.updateVisibleImages();
    this.startAutoScroll();
     console.log(this.url);
  }
  updateVisibleImages(): void {
    const numImages = 4; // Number of visible images at a time
    this.visibleImages = Array.from({ length: numImages }).map((_, i) => {
      return this.images[(this.currentIndex + i) % this.images.length];
    });
  }
  

  toggleContent() {
  console.log(this.switchBanner)
  this.getBanner();
}


  startAutoScroll(): void {
    this.autoScrollInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Time between slides
  }

  nextSlide(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateVisibleImages();

    setTimeout(() => {
      this.isAnimating = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.autoScrollInterval);
  }

  getBanner(){
    this.homeService.getBanner().subscribe({
      next:(response:any)=>{
        console.log(response)
        this.url =response.url
        this.switchBanner = response.switchBanner
        console.log(this.url)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
}