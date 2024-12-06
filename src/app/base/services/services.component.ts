import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  constructor(private http: HttpClient,
    private servicesService:ServicesService
  ) { }
services:any;

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices(): void {
    this.servicesService.getServiceList()
      .subscribe(data => {
        this.services = data;
        console.log(this.services)
      });
  }

}
