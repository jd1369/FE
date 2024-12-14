import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services.service';
import { Router } from '@angular/router';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  constructor(private http: HttpClient,
    private servicesService:ServicesService,
    private sharedservice:SharedserviceService,
    private router: Router,
    
  ) { }
services:any;

  ngOnInit(): void {
    this.fetchServices();
   // this.sendData();
  }

  sendData(data:any) {
    console.log('123')
    this.sharedservice.setData(data);
    this.router.navigate(['base/services/subservices'],{ state: { data: data.id } })
  }

  fetchServices(): void {
    this.servicesService.getServiceList()
      .subscribe(data => {
        this.services = data;

        console.log("data:",this.services)
      });
  }


}
