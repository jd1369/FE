import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProjecttableService } from './projecttable.service';
import { EditprojectComponent } from './editproject/editproject.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from '../toaster/toaster.service';
@Component({
  selector: 'app-projecttable',
  templateUrl: './projecttable.component.html',
  styleUrls: ['./projecttable.component.scss']
})
export class ProjecttableComponent implements OnInit {
  displayedColumns: string[] = ['projectName', 'projectDescription', 'projectContent', 'images', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(); // MatTableDataSource for pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private projectService: ProjecttableService,
    private toastr :ToasterService,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.getProjectData();
  }

  getProjectData() {
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

  onEdit(rowData: any): void {
    const modalRef = this.modalService.open(EditprojectComponent);
    modalRef.componentInstance.projectData = { ...rowData };

  }

  onSave(row: any): void {
    row.isEditing = false;
    console.log('Saving row:', row);

    this.projectService.updateProject(row).subscribe({
      next: (response: any) => {
        console.log('Row updated successfully:', response);
        this.getProjectData();
        window.location.reload()
      },
      error: (err: any) => {
        console.error('Error saving row:', err);
      },
    });
  }

  onDelete(row: any): void {
    console.log('Delete clicked for:', row);
    this.projectService.deleteProject(row.projectId).subscribe({
      next: () => {
        console.log('Row deleted successfully');
        this.dataSource.data = this.dataSource.data.filter(item => item.customerID !== row.customerID);
        this.getProjectData();
        window.location.reload()
        this.toastr.showSuccessMessage('Data Deleted Successfully');
      },
      error: (err: any) => {
        console.error('Error deleting row:', err);
        window.location.reload()
        this.toastr.showSuccessMessage('Data Deleted Successfully');
        
      },
    });
  }

}
