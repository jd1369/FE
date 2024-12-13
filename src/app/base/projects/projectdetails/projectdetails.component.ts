import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { ProjectdetailsService } from './projectdetails.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.scss']
})
export class ProjectdetailsComponent implements OnInit {
  projectName:any;
  projectContent:any
  constructor(
    private sharedservice:SharedserviceService,
    private http: HttpClient,
          private projectdetailsService:ProjectdetailsService,
          private router: Router
  ) { }

  ngOnInit(): void {
    this.sharedservice.projectdata$.subscribe(data => {
      console.log('Received data in Component 2:', data);
      this.projectName = data.title;
      this.projectContent = data.description;

    });
  }

}
