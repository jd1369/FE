import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServicetableService } from './servicetable.service';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubserviceDetailsComponent } from './subservice-details/subservice-details.component';
import { AddsubserviceComponent } from 'src/app/base/admin/addsubservice/addsubservice.component';
import { ToasterService } from '../toaster/toaster.service';
import { AddserviceComponent } from 'src/app/base/admin/addservice/addservice.component';
@Component({
  selector: 'app-servicetable',
  templateUrl: './servicetable.component.html',
  styleUrls: ['./servicetable.component.scss']
})
export class ServicetableComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'image','view','addSubService','editSubService','action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(); // MatTableDataSource for pagination
  popupVisible = false;
  popupItem: any = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private serviceServer: ServicetableService,
    private modalService: NgbModal,
    private toastr :ToasterService,
    
  ) { }

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

   
  onEditService(row: any): void {
    const modalRef = this.modalService.open(ServiceDetailsComponent);
    modalRef.componentInstance.projectData = { ...row };  // Passing row data to the modal component
  }

  addSubService(row:any):void{
    const modalRef = this.modalService.open(AddsubserviceComponent);
    modalRef.componentInstance.projectData = { ...row }; 
  }

  onDelete(row: any): void {
    console.log('Delete clicked for:', row);
    this.serviceServer.deleteProject(row.id).subscribe({
      next: () => {
        console.log('Row deleted successfully');
        this.dataSource.data = this.dataSource.data.filter(item => item.customerID !== row.customerID);
        this.getServiceData();
        this.toastr.showInfoMessage('Data Deleted Successfully');
        window.location.reload();

      },
      error: (err: any) => {
        console.error('Error deleting row:', err);
        this.toastr.showErrorMessage('Data Deleted Successfully');
        window.location.reload();
      },
    });
  }

  openDetailsModal(projectData:any){
    console.log(projectData)
 const modalRef = this.modalService.open(ServiceDetailsComponent,{ size: 'lg' });
    modalRef.componentInstance.projectData = { ...projectData };
  }

  getFieldKeys(fields: any) {
    return fields ? Object.keys(fields) : [];
  }

  // Get the inner keys of each nested object (like radio, cinmea)
  getInnerKeys(fields: any, field: string) {
    console.log(fields)
    return fields[field] ? Object.keys(fields[field]) : [];
  }

  // Get the value of the nested field (like "1" for radio)
  getFieldValue(fields: any, field: string, innerKey: string) {
    return fields[field][innerKey]; // Retrieve the value based on the inner key
  }

  hidePopup() {
    this.popupVisible = false;
  }
  showPopup(item: any): void {
    this.popupItem = item;
    this.popupVisible = true;
  }

  subservice(row:any){
    const modalRef = this.modalService.open(SubserviceDetailsComponent);
    modalRef.componentInstance.projectData = { ...row }; 
  }
  

}
