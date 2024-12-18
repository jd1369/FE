import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AdminService } from './admin.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  Highcharts = Highcharts; // Reference to Highcharts library
  chartOptions: any; // Chart options object
  user: any;
  admin: any;
  services: { id: string; name: string }[] = [];
  selectedServices: string[] = [];
  projectNameControl = new FormControl();
  constructor(
    private adminservice: AdminService,
    private toastr: ToasterService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');

    this.initializeChartOptions(); // Initialize chart options
    this.getChartData(); // Fetch chart data
    this.getTopServices()
  }

  /**
   * Initialize the chart options with empty data.
   */
  initializeChartOptions(): void {
    this.chartOptions = {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Service Count Distribution',
      },
      credits: {
        enabled: false,
      },
      series: [{
        type: 'pie',
        name: 'Services',
        data: [], // Start with empty data
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
  }

  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedServices = Array.from(selectElement.selectedOptions).map(
      (option) => option.value
    );
  }

  getTopServices(){
    this.adminservice.getDropdown().subscribe({
      next:(resposne:any)=>{
        console.log(resposne)
        this.services = resposne
      },

      error:(err:any)=>{
        console.log(err)
      }
    })
  }


  updateServices(){
    const selectedValues = this.projectNameControl.value;  // Get selected values from mat-select

    if (selectedValues && selectedValues.length < 5) {

      return this.toastr.showErrorMessage("Need five services")
    }
      // Construct the payload
      const payload = {
        serviceIds: selectedValues
      };

    
    this.adminservice.updateServiceList(payload).subscribe({
      next:(resposne:any)=>{
       this.toastr.showSuccessMessage("Updated Successfully")
      },

      error:(err:any)=>{
        console.log(err)
        
      }
    })
  
}


  /**
   * Fetch chart data and update the chart options.
   */
  // getChartData(): void {
  //   this.adminservice.getChartList().subscribe(
  //     (data: any = {}) => {
  //       // Transform the JSON object into an array of {name, y} objects
  //       const chartData = Object.entries(data).map(([key, value]) => ({
  //         name: key,
  //         y: value
  //       }));

  //       // Update chart options dynamically
  //       this.chartOptions.series[0].data = chartData;

  //       // Refresh the chart
  //       Highcharts.chart('chart-container', this.chartOptions);
  //     },
  //     error => {
  //       console.error('Error fetching chart data:', error);
  //       this.toastr.showErrorMessage('Failed to load chart data.');
  //     }
  //   );
  // }

  getChartData(): void {
    this.adminservice.getChartList().subscribe({
      next: (response: any) => {
        console.log('Chart Data:', response);

        // Transform the response into the format Highcharts expects
        const chartData = Object.entries(response).map(([key, value]) => ({
          name: key,
          y: value,
        }));

        // Update the chart options with the transformed data
        this.chartOptions.series[0].data = chartData;

        // Refresh the chart with the updated options
        Highcharts.chart('chart-container', this.chartOptions);
      },
      error: (err: any) => {
        console.error('Error fetching chart data:', err);
        this.toastr.showErrorMessage('Failed to load chart data.');
      }
    });
  }

}
