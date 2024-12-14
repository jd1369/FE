import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { ProjectdetailsService } from './projectdetails.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsComponent } from 'src/app/shared/clients/clients.component';
@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.scss']
})
export class ProjectdetailsComponent implements OnInit {
  projectName:any;
  projectContent:any
  projectId:any
  id: any;
  name: any;
  items:any
  image:any;
  projectDescription :any
  constructor(
    private sharedservice:SharedserviceService,
    private http: HttpClient,
          private projectdetailsService:ProjectdetailsService,
          private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['id'];
      this.name = params['name'];
      console.log('Received Query Params:', params);
    });
    this.getProjectDescription()
  }
  

  getProjectDescription(){
    this.projectdetailsService.getProjectDetails(this.projectId).subscribe({
      next:(response:any)=>{
        console.log(response)
        this.projectName = this.items.projectName
        this.projectDescription = this.items.projectDescription
        this.image = this.items.images
        this.projectContent = this.items.projectContent
      },
      error:(err:any)=>{
        console.log(err.error)
        this.items = err.error
        this.projectName = this.items.projectName
        this.projectDescription = this.items.projectDescription
        this.image = this.items.images
        this.projectContent = this.items.projectContent
      }
    })
  }

}
