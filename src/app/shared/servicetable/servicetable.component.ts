import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServicetableService } from './servicetable.service';
@Component({
  selector: 'app-servicetable',
  templateUrl: './servicetable.component.html',
  styleUrls: ['./servicetable.component.scss']
})
export class ServicetableComponent implements OnInit {
  displayedColumns: string[] = ['customerId', 'name', 'phoneNumber', 'emailId','action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(); // MatTableDataSource for pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private serviceServer: ServicetableService) { }

  ngOnInit(): void {
    this.getServiceData();
  }
  getServiceData(){
    this.serviceServer.getServiceList().subscribe({
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

   onEdit(row: any): void {
    row.isEditing = true;
  }
  onSave(row: any): void {
    row.isEditing = false;
    console.log('Saving row:', row);

    this.serviceServer.updateProject(row).subscribe({
      next: (response: any) => {
        console.log('Row updated successfully:', response);
      },
      error: (err: any) => {
        console.error('Error saving row:', err);
      },
    });
  }

  onDelete(row: any): void {
    console.log('Delete clicked for:', row);
    this.serviceServer.deleteProject(row.customerID).subscribe({
      next: () => {
        console.log('Row deleted successfully');
        this.dataSource.data = this.dataSource.data.filter(item => item.customerID !== row.customerID);
      },
      error: (err: any) => {
        console.error('Error deleting row:', err);
      },
    });
  }

}
