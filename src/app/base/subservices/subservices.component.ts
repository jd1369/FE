import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { SubservicesService } from './subservices.service';

@Component({
  selector: 'app-subservices',
  templateUrl: './subservices.component.html',
  styleUrls: ['./subservices.component.scss']
})
export class SubservicesComponent implements OnInit {
data: any;
serviceId:any;
  constructor(private sharedservice:SharedserviceService,
    private subservice:SubservicesService
  ) { }

  ngOnInit(): void {
    this.sharedservice.data$.subscribe(data => {
      this.serviceId = data.id;
      console.log('Received data in Component 2:', data);
    });
    console.log(this.serviceId)
    this.getSubService()
  }

  getSubService(){
    this.subservice.getSubServiceData(this.serviceId).subscribe({
      next:(response:any)=>{
        console.log(response)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }


}