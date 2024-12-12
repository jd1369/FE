import { Injectable } from '@angular/core';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
data: any;
  constructor(private sharedservice:SharedserviceService) { }
}
