import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ContactustableService } from './contactustable.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-contactustable',
  templateUrl: './contactustable.component.html',
  styleUrls: ['./contactustable.component.scss']
})
export class ContactustableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'tellUsAboutYourProject'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(); // MatTableDataSource for pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private contactusService: ContactustableService
  ) { 
    
  }

  ngOnInit(): void {
    this.getcontactData();
  }

  getcontactData(){
    this.contactusService.getContactList().subscribe({
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


