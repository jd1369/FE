import { Component, OnInit } from '@angular/core';
import { BlogdetailsService } from './blogdetails.service';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.scss']
})
export class BlogdetailsComponent implements OnInit {
  blogName:any;
  blogId:any;
  blogContent:any;
  blogDescription:any
  image:any
  items:any
  constructor(
    private sharedservice:SharedserviceService,
        private http: HttpClient,
              private blogdetailService:BlogdetailsService,
              private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.blogId = params['id'];
      this.blogName = params['name'];
      console.log('Received Query Params:', params);
    });
    this.getProjectDescription()
  }

  getProjectDescription(){
    this.blogdetailService.getBlogDetails(this.blogId).subscribe({
      next:(response:any)=>{
        console.log(response)
        this.items = response
        console.log(this.items)
        this.blogName = this.items.blogName
        this.blogDescription = this.items.blogDescription
        this.image = this.items.image
        this.blogContent = this.items.blogContent
        console.log(this.image)
      },
      error:(err:any)=>{
        console.log(err.error)
        this.items = err.error
        this.blogName = this.items.blogName
        this.blogDescription = this.items.blogDescription
        this.image = this.items.image
        this.blogContent = this.items.blogContent
      }
    })
  }
  

 

}
