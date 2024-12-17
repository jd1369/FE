import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.loaderService.showLoader(); // Show loader on navigation start
      }
      if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loaderService.hideLoader(); // Hide loader when navigation ends or errors
      }
    });

    // Subscribe to loaderService's isLoading observable
    this.loaderService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}
