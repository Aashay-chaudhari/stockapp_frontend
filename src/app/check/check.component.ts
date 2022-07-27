import { Component, VERSION ,ViewChild,OnInit } from '@angular/core';

import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexYAxis,ApexXAxis,ApexTitleSubtitle} from "ng-apexcharts";
import { GetDataService } from 'src/services/get-data.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  data_array: any = []
  CS_data : any;
  constructor(private get_data : GetDataService) {

   }

   showChart(){
    this.chartOptions = {
      series: [
        {
          name: "candle",
          data: this.data_array   
        }
      ],
      chart: {
        type: "candlestick",
        height: 350
      },
      title: {
        text: "CandleStick Chart",
        align: "left"
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };
   }
  ngOnInit(): void {
    let data = {
      "symbol" : 'IGL'
    }
    this.get_data.getStockData(data).subscribe(response=>{
      console.log(response)
      this.CS_data = response;
      let dates = this.CS_data['Date']
      console.log("cs data length: ", this.CS_data.length)
      for(let i=0;i<40; i++){
        let ohlc = []
        let open = this.CS_data['Open']
        let high = this.CS_data['High']
        let low = this.CS_data['Low']
        let close = this.CS_data['Close']
        ohlc.push(open[i])
        ohlc.push(high[i])
        ohlc.push(low[i])
        ohlc.push(close[i])
        let js_object = {
          x: dates[i],
          y: ohlc
        }
        this.data_array.push(js_object)
      }
      console.log("Dates_array is: ", this.data_array)
    })
  }
  public generateDayWiseTimeSeries(baseval: number, count: number, yrange: { max: number; min: number; }) {
    var i = 0;
    var series = [];
    while (i < count) {
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([baseval, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
}
