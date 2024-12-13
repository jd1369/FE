import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ServiceDetailsService } from '../service-details/service-details.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SubservicemodalComponent } from './subservicemodal/subservicemodal.component';
import { AddsubserviceComponent } from 'src/app/base/admin/addsubservice/addsubservice.component';
import { SubserviceDetailsService } from './subservice-details.service';

@Component({
  selector: 'app-subservice-details',
  templateUrl: './subservice-details.component.html',
  styleUrls: ['./subservice-details.component.scss']
})
export class SubserviceDetailsComponent implements OnInit {
 displayedColumns: string[] = ['name', 'image', 'editSubService', 'action'];
   dataSource: MatTableDataSource<any> = new MatTableDataSource(); // MatTableDataSource for pagination
   popupVisible = false;
   popupItem: any = null;
   projectData:any
   serviceId :any
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   constructor(private detailsservice: SubserviceDetailsService,
     private modalService: NgbModal,
     
   ) { }
 
   ngOnInit(): void {
     console.log(this.projectData)
    this.getServiceData();
   this.serviceId =  this.projectData.id
   }
   getServiceData(){
    this.serviceId = this.projectData.id
    console.log(this.serviceId)
     this.detailsservice.getSubServiceList(this.serviceId).subscribe({
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
     const modalRef = this.modalService.open(SubservicemodalComponent);
     console.log(row)
     modalRef.componentInstance.projectData = { ...row };  // Passing row data to the modal component
   }

 
   onDelete(row: any): void {
     console.log('Delete clicked for:', row);
     this.detailsservice.deleteProject(row.customerID).subscribe({
       next: () => {
         console.log('Row deleted successfully');
         this.dataSource.data = this.dataSource.data.filter(item => item.customerID !== row.customerID);
       },
       error: (err: any) => {
         console.error('Error deleting row:', err);
       },
     });
   }
 
   openDetailsModal(projectData:any){
     console.log(projectData)
  const modalRef = this.modalService.open(SubserviceDetailsComponent);
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
     const modalRef = this.modalService.open(SubservicemodalComponent);
     modalRef.componentInstance.projectData = { ...row }; 
   }
 
 }
 