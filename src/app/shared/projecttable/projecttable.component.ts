import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProjecttableService } from './projecttable.service';
@Component({
  selector: 'app-projecttable',
  templateUrl: './projecttable.component.html',
  styleUrls: ['./projecttable.component.scss']
})
export class ProjecttableComponent implements OnInit {
  displayedColumns: string[] = ['projectName', 'projectDescription', 'projectContent','image','action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(); // MatTableDataSource for pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private projectService: ProjecttableService) { }

  ngOnInit(): void {
    this.getProjectData();
  }

  getProjectData(){
    this.projectService.getProjectList().subscribe({
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

    this.projectService.updateProject(row).subscribe({
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
    this.projectService.deleteProject(row.customerID).subscribe({
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
