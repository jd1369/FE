import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

interface Product {
  name: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  imageUrl: string = '';
  
serviceImage: Product[] = [
    { name: 'Web Development', image: 'assets/sservice.png' },
    { name: 'Graphic Design', image: 'assets/sersafcvice1.jpg' },
    { name: 'SEO Optimization', image: 'assets/servicasce2.jpg' },
    { name: 'Digital Marketing', image: 'assets/sesacrvice3.jpg' },
    { name: 'Content Creation', image: 'assets/servicasce4.jpg' }
  ];
  visibleImages: Product[] = [];
  currentIndex: number = 0;
  autoScrollInterval: any;
  url: string = '';
  isAnimating: boolean = false;
  isToggled: boolean = false;
  switchBanner: boolean = false;
  bannerForm!: FormGroup;
  serviceList: any[] = [];
  admin:any;
  bannerData: any;
  user:any
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private homeService: HomeService,
    private route:Router
  ) {}

  ngOnInit(): void {
    const now = new Date();
    this.bannerForm = this.fb.group({
      id: ['banner-id-1369'],
      name: ['banner'],
      folderName: ['banner'],
      folderPath: ['banner'],
      url: [''],
      createdDate: [now]
    });

    this.user = localStorage.getItem('user');
    this.admin = localStorage.getItem('admin');
    
    this.getServices();
    this.getBanner();
    this.nextSlide()
    this.updateVisibleImages();
    this.startAutoScroll();
    console.log('Router config:', this.route.config);
  }

  updateVisibleImages(): void {
    const numImages = 4; // Number of visible images at a time
    if (this.serviceList.length > 0) {
      this.visibleImages = Array.from({ length: numImages }).map(
        (_, i) => this.serviceList[(this.currentIndex + i) % this.serviceList.length]
      );
    }
  }

  toggleContent(): void {
    this.bannerData
    const formData = this.bannerData
    console.log(formData)
    
    formData.switchBanner = !formData.switchBanner
    

    this.homeService.updateBannerState(formData).subscribe({
      next: (response: any) => console.log(response),
      error: (err: any) => console.error(err)
    });
    window.location.reload()
  }

  startAutoScroll(): void {
    this.autoScrollInterval = setInterval(() => this.nextSlide(), 3000);
  }

  nextSlide(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentIndex = (this.currentIndex + 1) % this.serviceImage.length;
    this.updateVisibleImages();

    setTimeout(() => {
      this.isAnimating = false;
    }, 1000); // Ensure image transition completes
  }

  ngOnDestroy(): void {
    clearInterval(this.autoScrollInterval);
  }

  getBanner(): void {
    this.homeService.getBanner().subscribe({
      next: (response: any) => {
        this.bannerData = response;
        this.url = response.url;
        this.switchBanner = response.switchBanner;
      },
      error: (err: any) => console.error(err)
    });
  }

  getServices(): void {
    this.homeService.getAllServices().subscribe({
      next: (response: any) => {
        // Assuming response is an array of service objects
        this.serviceList = response.map((service: any) => ({
          name: service.name,
          image: service.serviceImage, // Extract the serviceImage field for carousel
        }));
        this.updateVisibleImages(); // Update visible images after fetching
      },
      error: (err: any) => console.error(err)
    });
  }
}
