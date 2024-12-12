import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from '../sharedservice.service';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.scss']
})
export class ProjectdetailsComponent implements OnInit {

  constructor(
    private sharedservice:SharedserviceService
  ) { }

  ngOnInit(): void {
    this.sharedservice.projectdata$.subscribe(data => {
      console.log('Received data in Component 2:', data);
    });
  }

}
