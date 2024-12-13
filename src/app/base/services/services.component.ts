import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services.service';
import { Router } from '@angular/router';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  constructor(private http: HttpClient,
    private servicesService:ServicesService,
    private sharedservice:SharedserviceService,
    private router: Router
  ) { }
services:any;

  ngOnInit(): void {
    this.fetchServices();
   // this.sendData();
  }

  sendData(data:any) {
    console.log('123')
    this.sharedservice.setData(data);
    this.router.navigate(['/subdetails'])
  }

  fetchServices(): void {
    this.servicesService.getServiceList()
      .subscribe(data => {
        this.services = data;
        console.log(this.services)
      });
  }
  navigateToRoute(): void {
    this.router.navigate(['base/services/subservices']); // Replace '/target-route' with your desired route
  }

  goToSubservice(): void {
    this.router.navigate(['src/app/base/services/subservices/subservices.component.ts']);
  }

}
