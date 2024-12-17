import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private activeRequests = 0; // Track the number of active requests
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor() {}

  // Show loader when a request starts
  showLoader() {
    this.activeRequests++;
    this.isLoadingSubject.next(true);  // Loader is visible
  }

  // Hide loader when all requests are completed
  hideLoader() {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }
    if (this.activeRequests === 0) {
      this.isLoadingSubject.next(false);  // Loader is hidden when no active requests
    }
  }

  // Utility to simulate API request
  makeRequest() {
    this.showLoader();
    setTimeout(() => {
      this.hideLoader();
    }, 2000); // Simulate an API request
  }
}
