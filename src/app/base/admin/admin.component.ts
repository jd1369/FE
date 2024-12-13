import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostablogComponent } from './postablog/postablog.component';
import { AddsubserviceComponent } from './addsubservice/addsubservice.component';
import { AddserviceComponent } from './addservice/addservice.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from './admin.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  // Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any;
  Highcharts = require('highcharts');
  user: any;
  admin: any;
  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private adminservice: AdminService,
    private toastr:ToasterService
  ) { }


  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    console.log(this.user)
    this.chartOptions = {
      chart: {
        type: 'pie',
      },
      title: {
        text: ' ',
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: 'Values',
        data:  [
          { name: 'Radio', y: 30 },
          { name: 'Cinema', y: 50 },
          { name: 'TV', y: 20 },
        ],
      }],
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.percentage:.1f} %',
          },
        },
      },
    };
    this.getChartData()
  }


  getChartData() {
    this.adminservice.getChartList().subscribe(data => {
      console.log(data)
      console.log(this.chartOptions.series[0])
      this.chartOptions.series[0].data = data; // Update chart data dynamically with fetched data
    });
  }



  onActionClick(customerId: number) {
    console.log('Action clicked for customer with ID:', customerId);
  }



  addProject(clickFrom?: any) {
    const modalRef = this.modalService.open(AddprojectComponent, { size: 'lg' });
    modalRef.componentInstance.clickFrom = clickFrom;
  };

  addService(clickFrom?: any) {
    const modalRef = this.modalService.open(AddserviceComponent, { size: 'lg' });
    modalRef.componentInstance.clickFrom = clickFrom;
  };

  addSubService(clickFrom?: any) {
    const modalRef = this.modalService.open(AddsubserviceComponent, { size: 'lg' });
    modalRef.componentInstance.clickFrom = clickFrom;
  };

  newBanner() {

  };

  postaBlog(clickFrom?: any) {
    const modalRef = this.modalService.open(PostablogComponent, { size: 'lg' });
    modalRef.componentInstance.clickFrom = clickFrom;
  }
}
