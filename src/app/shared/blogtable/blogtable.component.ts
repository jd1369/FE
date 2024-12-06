import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BlogtableService } from './blogtable.service';
@Component({
  selector: 'app-blogtable',
  templateUrl: './blogtable.component.html',
  styleUrls: ['./blogtable.component.scss']
})
export class BlogtableComponent implements OnInit {
  displayedColumns: string[] = ['blogId', 'blogName', 'blogDescription', 'blogContent','authorName','publishingTimeOfBlog','image'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(); // MatTableDataSource for pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private blogService: BlogtableService) { }

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
