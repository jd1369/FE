import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AdminService } from './admin.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';

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

  constructor(
    private adminservice: AdminService,
    private toastr: ToasterService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');

    this.initializeChartOptions(); // Initialize chart options
    this.getChartData(); // Fetch chart data
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

  /**
   * Fetch chart data and update the chart options.
   */
  getChartData(): void {
    this.adminservice.getChartList().subscribe(
      (data: any = {}) => {
        // Transform the JSON object into an array of {name, y} objects
        const chartData = Object.entries(data).map(([key, value]) => ({
          name: key,
          y: value
        }));

        // Update chart options dynamically
        this.chartOptions.series[0].data = chartData;

        // Refresh the chart
        Highcharts.chart('chart-container', this.chartOptions);
      },
      error => {
        console.error('Error fetching chart data:', error);
        this.toastr.showErrorMessage('Failed to load chart data.');
      }
    );
  }
}
