import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
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
export class HomeComponent implements OnInit, OnDestroy {
  imageUrl: string = '';
  images: Product[] = [
    { name: 'Web Development', image: 'assets/service.png' },
    { name: 'Graphic Design', image: 'assets/service1.jpg' },
    { name: 'SEO Optimization', image: 'assets/service2.jpg' },
    { name: 'Digital Marketing', image: 'assets/service3.jpg' },
    { name: 'Content Creation', image: 'assets/service4.jpg' }
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
    private homeService: HomeService
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

    this.getBanner();
    this.updateVisibleImages();
    this.startAutoScroll();
    this.getServices();
  }

  updateVisibleImages(): void {
    const numImages = 4; // Number of visible images at a time
    this.visibleImages = Array.from({ length: numImages }).map(
      (_, i) => this.images[(this.currentIndex + i) % this.images.length]
    );
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
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateVisibleImages();

    setTimeout(() => {
      this.isAnimating = false;
    }, 1000);
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
      next: (response: any) => (this.serviceList = response,
        console.log(this.serviceList)
        
      ),
      error: (err: any) => console.error(err)
    });
  }
}
