import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  data: any;
  blogId:any;
  blogContent:any;
  authorName:any;
  blogName:any;
  blogDescription:any;
  constructor(private sharedservice:SharedserviceService) { }

  ngOnInit(): void {
    this.sharedservice.blogdata$.subscribe(data => {
      this.blogId = data.id;
      this.blogContent = data.blogContent;
      this.blogDescription = data.blogDescription;
      this.authorName = data.authorName
      this.blogName = data.blogName
      console.log('Received data in Component 2:', data);
    });
    // this.sharedservice.data$.subscribe(data => {
    //   this.data = data;
    //   console.log('Received data in Component 2:', data);
    // });
  }


}
