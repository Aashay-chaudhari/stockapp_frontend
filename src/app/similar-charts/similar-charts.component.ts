import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexYAxis,ApexXAxis,ApexTitleSubtitle} from "ng-apexcharts";
import { Chart, registerables } from 'chart.js';
import { GetDataService } from 'src/services/get-data.service';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-similar-charts',
  templateUrl: './similar-charts.component.html',
  styleUrls: ['./similar-charts.component.css']
})
export class SimilarChartsComponent implements OnInit {
  @ViewChild("chart1") chart1?: ChartComponent;
  @ViewChild("chart2") chart2?: ChartComponent;
  @ViewChild("chart3") chart3?: ChartComponent;
  @ViewChild("chart4") chart4?: ChartComponent;
  public chartOptions1: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;
  chart_data_array : any;
  date_array : any;
  close_price_array: any;
  open_price_array: any;
  low_price_array: any;
  high_price_array: any;
  volume_array: any;
  show_spinner = false;
  date_string_array: any;
  filtered_close_price_array: any;
  filtered_date_array: any;
  filtered_low_price_array: any;
  filtered_high_price_array: any;
  filtered_open_price_array: any;
  stock_symbol: any;
  buffer_stock_data: any;
  stock_data1: any;
  stock_data2: any;
  stock_data3: any;
  stock_data4: any;
  signals : any;
  stock_name : any;
  constructor(private get_data : GetDataService) {
    Chart.register(...registerables);

   }

  ngOnInit(): void {
    console.log("Inside ngoninit")
    this.stock_name = localStorage.getItem("stock")
    this.populateChart(this.stock_name)
  }

  populateChart(symbolName: string){
    let height_of_chart = 0;
    if(window.innerHeight>900){
      height_of_chart = 700
    }else{
      height_of_chart = 500
    }
    this.chart_data_array = []
    let buffer_var = localStorage.getItem("us_stock")
    console.log("buffer var is: ", buffer_var)
    let flag_var = false
    if(buffer_var == "true"){
      flag_var = true
    }
    else{
      flag_var = false
    }

    let data = {
      "symbol" : symbolName,
      "us_stock" : flag_var,
    }
    this.date_array = []
    console.log("data is: ", data)
    this.show_spinner = true
      this.get_data.getSimilarCharts(data).subscribe(response=>{
        console.log("Response from show similar: ", response)
        this.buffer_stock_data = response;
        console.log("chart1 data: ", this.buffer_stock_data["chart0"])
        this.stock_data1 = this.buffer_stock_data["chart0"]
        this.stock_data2 = this.buffer_stock_data["chart1"]
        this.stock_data3 = this.buffer_stock_data["chart2"]
        this.stock_data4 = this.buffer_stock_data["chart3"]
        this.signals = this.buffer_stock_data["signals"]
        console.log("stock data: ", this.stock_data1)
        let open1 = this.stock_data1['Open']
        let close1 = this.stock_data1['Close']
        let high1 = this.stock_data1['High']
        let low1 = this.stock_data1['Low']
        let dates1 = this.stock_data1['Date']
        let open2 = this.stock_data2['Open']
        let close2 = this.stock_data2['Close']
        let high2 = this.stock_data2['High']
        let low2 = this.stock_data2['Low']
        let dates2 = this.stock_data2['Date']
        let open3 = this.stock_data3['Open']
        let close3 = this.stock_data3['Close']
        let high3 = this.stock_data3['High']
        let low3 = this.stock_data3['Low']
        let dates3 = this.stock_data3['Date']
        let open4 = this.stock_data4['Open']
        let close4 = this.stock_data4['Close']
        let high4 = this.stock_data4['High']
        let low4 = this.stock_data4['Low']
        let dates4 = this.stock_data4['Date']
        for(let i=0;i<15; i++){
          let ohlc = []
          ohlc.push(open1[i])
          ohlc.push(high1[i])
          ohlc.push(low1[i])
          ohlc.push(close1[i])
          let js_object = {
            x: dates1[i],
            y: ohlc
          }
          this.chart_data_array.push(js_object)
        }
        console.log("chart data for 1st chart: ", this.chart_data_array)
        this.chartOptions1 = {
          series: [
            {
              name: "candle",
              data: this.chart_data_array   
            }
          ],
          chart: {
            type: "candlestick",
            height: 280,
            width: 500,
          },
          title: {
            text: "Current Trading Pattern",
            align: "center",
            style: {
              fontSize:  '18PX',
              fontWeight:  'bold',
            },
          },
          xaxis: {
            type: "datetime"
          },
          yaxis: {
            labels: {
              formatter: function(val: number) {
                let label = val.toString()
                let labelArr = label.split('.')
                let value_to_store = labelArr[0]
                return value_to_store;
              }
            },
          },
          tooltip: {
            shared: false,

            intersect: true,
          }

        };
        this.chart_data_array = []
        for(let i=0;i<15; i++){
          let ohlc = []
          ohlc.push(open2[i])
          ohlc.push(high2[i])
          ohlc.push(low2[i])
          ohlc.push(close2[i])
          let js_object = {
            x: dates2[i],
            y: ohlc
          }
          this.chart_data_array.push(js_object)
        }
        this.chartOptions2 = {
          series: [
            {
              name: "candle",
              data: this.chart_data_array   
            }
          ],
          chart: {
            type: "candlestick",
            height: 280,
            width: 500,
          },
          title: {
            text: "#1 Signal => (" + this.signals[1].toString() + ")",
            align: "center",
            style: {
              fontSize:  '18PX',
              fontWeight:  'bold',
            },
          },
          xaxis: {
            type: "datetime"
          },
          yaxis: {
            labels: {
              formatter: function(val: number) {
                let label = val.toString()
                let labelArr = label.split('.')
                let value_to_store = labelArr[0]
                return value_to_store;
              }
            },
          },
          tooltip: {
            shared: false,

            intersect: true,
          }

        };
        this.chart_data_array = []

        for(let i=0;i<15; i++){
          let ohlc = []
          ohlc.push(open3[i])
          ohlc.push(high3[i])
          ohlc.push(low3[i])
          ohlc.push(close3[i])
          let js_object = {
            x: dates3[i],
            y: ohlc
          }
          this.chart_data_array.push(js_object)
        }
        this.chartOptions3 = {
          series: [
            {
              name: "candle",
              data: this.chart_data_array   
            }
          ],
          chart: {
            type: "candlestick",
            height: 280,
            width: 500,
          },
          title: {
            text: "#2 Signal => (" + this.signals[2].toString() + ")",
            align: "center",
            style: {
              fontSize:  '18PX',
              fontWeight:  'bold',
            },
          },
          xaxis: {
            type: "datetime"
          },
          yaxis: {
            labels: {
              formatter: function(val: number) {
                let label = val.toString()
                let labelArr = label.split('.')
                let value_to_store = labelArr[0]
                return value_to_store;
              }
            },
          },
          tooltip: {
            shared: false,

            intersect: true,
          }

        };
        this.chart_data_array = []

        for(let i=0;i<15; i++){
          let ohlc = []
          ohlc.push(open4[i])
          ohlc.push(high4[i])
          ohlc.push(low4[i])
          ohlc.push(close4[i])
          let js_object = {
            x: dates4[i],
            y: ohlc
          }
          this.chart_data_array.push(js_object)
        }
        this.chartOptions4 = {
          series: [
            {
              name: "candle",
              data: this.chart_data_array   
            }
          ],
          chart: {
            type: "candlestick",
            height: 280,
            width: 500,
          },
          title: {
            text: "#3 Signal => (" + this.signals[3].toString() + ")",
            align: "center",
            style: {
              fontSize:  '18PX',
              fontWeight:  'bold',
            },
          },
          xaxis: {
            type: "datetime"
          },
          yaxis: {
            labels: {
              formatter: function(val: number) {
                let label = val.toString()
                let labelArr = label.split('.')
                let value_to_store = labelArr[0]
                return value_to_store;
              }
            },
          },
          tooltip: {
            shared: false,

            intersect: true,
          }

        };
      })
    this.show_spinner = false
  }
}
