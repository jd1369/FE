import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BlogtableService } from './blogtable.service';
import { Router } from '@angular/router';
import { SharedserviceService } from '../sharedservice.service';
import { EidtblogComponent } from './eidtblog/eidtblog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-blogtable',
  templateUrl: './blogtable.component.html',
  styleUrls: ['./blogtable.component.scss']
})
export class BlogtableComponent implements OnInit {
  displayedColumns: string[] = ['blogName', 'blogDescription', 'blogContent','modifiedDate','publishedDate','image','action','view'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(); // MatTableDataSource for pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private blogService: BlogtableService,
     private router: Router,
     private sharedservice :SharedserviceService,
      private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getBlogData();
  }
  getBlogData(){
    this.blogService.getBlogList().subscribe({
     next: (response: any) => {
       if (response) {
        console.log(response)
         this.dataSource.data = response;
       }
     },
     error: (err: any) => {
       // this.errorhandlerService.handleError(err);
       console.log(err)
     },
   });
   }
 
   ngAfterViewInit(): void {
     this.dataSource.paginator = this.paginator; // Assign paginator to dataSource after the view is initialized
   }

   onView(data:any){
    console.log(data);
    this.sharedservice.setblogdata(data);
    this.router.navigate(['base/blog'], { state: { data: data } });
   }

    onEdit(rowData: any): void {
       const modalRef = this.modalService.open(EidtblogComponent);
       modalRef.componentInstance.blogData = { ...rowData };
   
     }
  onSave(row: any): void {
    row.isEditing = false;
    console.log('Saving row:', row);

    this.blogService.updateProject(row).subscribe({
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
    this.blogService.deleteProject(row.customerID).subscribe({
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
