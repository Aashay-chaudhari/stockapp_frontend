import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart-test',
  templateUrl: './chart-test.component.html',
  styleUrls: ['./chart-test.component.css']
})
export class ChartTestComponent implements OnInit {
  chart: any = [];

  constructor() { 
    Chart.register(...registerables);

  }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [1,2,3],
        datasets: [
          {
            data: [1,2,3],
            backgroundColor: 'white',

          }
        ]
      }
    })
  }

}
