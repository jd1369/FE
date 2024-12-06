import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients:any
  constructor(private http: HttpClient,
    private clientService:ClientsService) { }

  ngOnInit(): void {
    this.fetchClients();
  }
  fetchClients(): void {
    this.clientService.getClientList()
      .subscribe(data => {
        this.clients = data;
        console.log(this.clients)
      });
  }
}
