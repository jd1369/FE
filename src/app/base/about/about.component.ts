import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AboutService } from './about.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private http: HttpClient,
    private aboutService: AboutService) { }
  clients: any
  ngOnInit(): void {
    this.fetchClients()
  }

  fetchClients(): void {
    this.aboutService.getClientList()
      .subscribe(data => {
        this.clients = data;
        console.log(this.clients)
      });
  }

}
