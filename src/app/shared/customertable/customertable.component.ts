import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomertableService } from './customertable.service';

@Component({
  selector: 'app-customertable',
  templateUrl: './customertable.component.html',
  styleUrls: ['./customertable.component.scss']
})
export class CustomertableComponent implements OnInit {
  displayedColumns: string[] = ['customerId', 'name', 'phoneNumber', 'emailId'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(); // MatTableDataSource for pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private customerService: CustomertableService) {}

  ngOnInit(): void {
   
    this.getCustomerData()
    
  }

  getCustomerData(){
   this.customerService.getCustomerList().subscribe({
    next: (response: any) => {
      if (response) {
        console.log(response)
        this.dataSource.data = response;
      }
    },
    error: (err: any) => {
      // this.errorhandlerService.handleError(err);
      console.log("error")
    },
  });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Assign paginator to dataSource after the view is initialized
  }
}