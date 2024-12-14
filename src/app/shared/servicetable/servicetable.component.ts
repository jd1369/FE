import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServicetableService } from './servicetable.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddserviceComponent } from 'src/app/base/admin/addservice/addservice.component';
import { AddsubserviceComponent } from 'src/app/base/admin/addsubservice/addsubservice.component';
import { ToasterService } from '../toaster/toaster.service';

@Component({
  selector: 'app-servicetable',
  templateUrl: './servicetable.component.html',
  styleUrls: ['./servicetable.component.scss']
})
export class ServicetableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'image', 'view', 'addSubService', 'editSubService', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  popupVisible = false;
  popupItem: any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private serviceService: ServicetableService,
    private modalService: NgbModal,
    private toastr: ToasterService
  ) {}

  ngOnInit(): void {
    this.getServiceData();
  }

  getServiceData(): void {
    this.serviceService.getServiceList().subscribe({
      next: (response: any) => {
        console.log(response)
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        console.error('Error fetching service data');
      }
    });
  }

  addSubService(service: any): void {
    const modalRef = this.modalService.open(AddsubserviceComponent);
    modalRef.componentInstance.projectData = { ...service };
    modalRef.result.then(() => this.getServiceData());
  }

  editService(service: any): void {
    const modalRef = this.modalService.open(AddserviceComponent);
    modalRef.componentInstance.projectData = { ...service };
    modalRef.result.then(() => this.getServiceData());
  }

  editSubService(service: any): void {
    const modalRef = this.modalService.open(AddsubserviceComponent);
    modalRef.componentInstance.projectData = { ...service };
    modalRef.result.then(() => this.getServiceData());
  }

  deleteService(serviceId: string): void {
    this.serviceService.deleteService(serviceId).subscribe({
      next: () => {
        this.toastr.showInfoMessage('Service deleted successfully');
        this.getServiceData();
      },
      error: () => {
        this.toastr.showErrorMessage('Error deleting service');
      }
    });
  }

  viewFields(service: any): void {
    this.popupItem = service;
    this.popupVisible = true;
  }

  hidePopup(): void {
    this.popupVisible = false;
  }

  updateFields(service: any): void {
    this.serviceService.updateService(service).subscribe({
      next: () => {
        this.toastr.showInfoMessage('Fields updated successfully');
        this.hidePopup();
        this.getServiceData();
      },
      error: () => {
        this.toastr.showErrorMessage('Error updating fields');
      }
    });
  }

  getFieldKeys(fields: any): string[] {
    return fields ? Object.keys(fields) : [];
  }
}
