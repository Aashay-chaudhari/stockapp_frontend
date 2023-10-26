import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { GetDataService } from 'src/services/get-data.service';
import { StoreDataService } from 'src/services/store-data.service';
import { HelloComponent } from './hello.component';
import { Predict30Component } from '../predict30/predict30.component';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexYAxis,ApexXAxis,ApexTitleSubtitle} from "ng-apexcharts";
import { Router } from '@angular/router';
import { LoginRedirectComponent } from './loginredirect.component';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
@Injectable({
  providedIn: "root"
})
export class ChartsComponent implements OnInit {
  if_loaded = false;
  @ViewChild("chart") chart1?: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  show_chart = false;
  chart_data_array:any = []
  show_spinner = false;
  stock_symbol: any;
  chart: any = [];
  first_chart = true;
  stock_data: any;
  close_price_array = []
  open_price_array = []
  low_price_array = []
  high_price_array = []
  date_string_array:string[] = []
  volume_array = []
  date_array:any = []
  filtered_close_price_array = []
  filtered_open_price_array = []
  filtered_low_price_array = []
  filtered_high_price_array = []
  filtered_date_string_array:string[] = []
  filtered_volume_array = []
  filtered_date_array:any = []
  filter_choices = ['7','30','60','365','All']
  show_filter = false;
  predicted_price:any;
  actual_values: any = []
  last_closing_price: any;

  matboxChecked = false;
  colorObject = {name: 'Primary', completed: false, color: 'primary'}
  matDialogRef: any;
  constructor(private store_data: StoreDataService,
    private matDialog: MatDialog,
    private router: Router,
    public Predict30Component: Predict30Component,
    private get_data : GetDataService) {
    Chart.register(...registerables);
    this.matDialogRef =  MatDialogRef<HelloComponent>;

    }

  ngOnInit(): void {
    console.log("Window height is: ", window.innerHeight)
    this.show_chart =true;
    console.log("Inside ngoninit charts")
    this.store_data.stock_searched.subscribe(response=>{
      this.show_chart = true;
      this.show_filter = true;
      console.log("Value of show_fulter: ", this.show_filter)
      console.log("Value of show_chart: ", this.show_chart)
      this.stock_symbol = response;
      this.populateChart(this.stock_symbol);
    })
    let local_stock_symbol = localStorage.getItem('stock_symbol')

    
  }
  ngDestroy(){
    console.log("Inside ngdestroy")
  }
  destroyChart(){
    this.chart.destroy()

  }
  filterData(option:any){
    let height_of_chart = 0;
    if(window.innerHeight>900){
      height_of_chart = 700
    }else{
      height_of_chart = 500
    }
    this.matboxChecked = false;
    console.log("optionsi s: ",option)
    this.chart_data_array = []
    if(option=='All'){
      option = 0;
    }
    console.log("Date array is: ", this.date_array)
    this.filtered_date_array = this.date_array.slice(this.date_array.length-option,this.date_array.length)
    this.filtered_close_price_array = this.close_price_array.slice(this.close_price_array.length-option,this.close_price_array.length)
    this.filtered_open_price_array = this.open_price_array.slice(this.open_price_array.length-option,this.open_price_array.length)
    this.filtered_high_price_array = this.high_price_array.slice(this.high_price_array.length-option,this.high_price_array.length)
    this.filtered_low_price_array= this.low_price_array.slice(this.low_price_array.length-option,this.low_price_array.length)
    console.log("this.filtered_date_array",this.filtered_date_array)
    console.log("this.filtered_close_price_array",this.filtered_close_price_array)
    let pointerRadius = 0;
    let filter_dates = []
    if(option==0){
        for(let i=0; i<this.date_array.length; i++){
         filter_dates.push(this.date_array[i])
        }
    }else{
      for(let i=0;i<option;i++){
        filter_dates.push(this.date_array[this.date_array.length-option+i])
      }
    }
    if(option==0){
      for(let i=0;i<this.close_price_array.length; i++){
        let ohlc:any = []
        // let open1 = this.stock_data['Open']
        // let open = open1.slice(open1.length-option, open1.length)
        // console.log("open slice is: 0,", open.slice(open.length-option+i, open.length))
        // let high1 = this.stock_data['High']
        // let high = high1.slice(open1.length-option+i, open1.length)
        // let low1 = this.stock_data['Low']
        // let low = low1.slice(open1.length-option+i, open1.length)
        // let close1 = this.stock_data['Close']
        // let close = close1.slice(open1.length-option+i, open1.length)
        ohlc.push(this.open_price_array[i])
        ohlc.push(this.high_price_array[i])
        ohlc.push(this.low_price_array[i])
        ohlc.push(this.close_price_array[i])
  
        let js_object = { 
          x: filter_dates[i],
          y: ohlc
        }
        this.chart_data_array.push(js_object)
      }
      console.log("Chart data in all is: ", this.chart_data_array)
    }else{
      for(let i=0;i<option; i++){
        let ohlc:any = []
        // let open1 = this.stock_data['Open']
        // let open = open1.slice(open1.length-option, open1.length)
        // console.log("open slice is: 0,", open.slice(open.length-option+i, open.length))
        // let high1 = this.stock_data['High']
        // let high = high1.slice(open1.length-option+i, open1.length)
        // let low1 = this.stock_data['Low']
        // let low = low1.slice(open1.length-option+i, open1.length)
        // let close1 = this.stock_data['Close']
        // let close = close1.slice(open1.length-option+i, open1.length)
        ohlc.push(this.filtered_open_price_array[i])
        ohlc.push(this.filtered_high_price_array[i])
        ohlc.push(this.filtered_low_price_array[i])
        ohlc.push(this.filtered_close_price_array[i])
  
        let js_object = {
          x: filter_dates[i],
          y: ohlc
        }
        this.chart_data_array.push(js_object)
      }
    }
    //this.destroyChart()
    if(option<=60){
      pointerRadius = 5;
    }
    this.chartOptions = {
      series: [
        {
          name: "candle",
          data: this.chart_data_array   
        }
      ],
      chart: {
        type: "candlestick",
        height: height_of_chart
      },
      grid:{
        show:true,
      },
      title: {
        text: this.stock_symbol,
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
        enabled: true,
        intersect: true,
      }
    };
    // this.chart = new Chart('canvas', {
    //   type: 'line',
    //   data: {
    //     labels: this.filtered_date_array,
    //     datasets: [

    //       {
    //         pointRadius: pointerRadius,
    //         label: 'Close Price',
    //         data: this.filtered_close_price_array,
    //         borderColor: 'black',
    //         stack: 'combined'

    //       }
    //     ]
    //   },
    //   options:{

    //     scales:{

    //     },
    //     plugins: {
    //       title: {
    //         font: {
    //           size: 25,
              
    //         },
    //         display: true,
    //         text: this.stock_symbol,
    //       },
    //       tooltip : {
    //         enabled: true,
    //       }
    //     },
    //     elements: {
    //       point: {

    //       }
    //     },
    //   }
    // })
  }
  populateChart(symbolName: string){
    let height_of_chart = 0;
    if(window.innerHeight>900){
      height_of_chart = 700
    }else{
      height_of_chart = 500
    }
    this.chart_data_array = []
    this.show_spinner = true;
    this.matboxChecked = false;
    if(this.first_chart == false){
      //this.destroyChart()
    }
    this.matDialog.closeAll()
    let data = {
      "symbol" : symbolName
    }
    this.date_array = []

      this.get_data.getStockData(data).subscribe(response=>{
      this.show_spinner = false;
        
      this.show_chart = true;
        this.stock_data = response;
        this.close_price_array = this.stock_data['Close']
        this.open_price_array = this.stock_data['Open']
        this.low_price_array = this.stock_data['Low']
        this.high_price_array = this.stock_data['High']

        this.volume_array = this.stock_data['Volume']
        this.date_string_array = this.stock_data['Date']
        for(let i=0;i < this.date_string_array.length; i++){
          let bufferDate = this.date_string_array[i].split("T")
          this.date_array[i] = bufferDate[0];
        }
        let open1 = this.stock_data['Open']
        let open = open1.slice(this.stock_data['Open'].length-180, open1.length)
        let high1 = this.stock_data['High']
        let high = high1.slice(this.stock_data['High'].length-180, this.stock_data['High'].length)
        let low1 = this.stock_data['Low']
        let low = low1.slice(this.stock_data['Low'].length-180, this.stock_data['Low'].length)
        let close1 = this.stock_data['Close']
        let close = close1.slice(this.stock_data['Close'].length-180, this.stock_data['Close'].length)
        let filter_dates = []
        for(let i=0;i<180;i++){
          filter_dates.push(this.date_array[this.date_array.length-180+i])
        }
        for(let i=0;i<180; i++){
          let ohlc = []
          ohlc.push(open[i])
          ohlc.push(high[i])
          ohlc.push(low[i])
          ohlc.push(close[i])
          let js_object = {
            x: filter_dates[i],
            y: ohlc
          }
          this.chart_data_array.push(js_object)
        }
        console.log("Chart data data is : ", this.chart_data_array)
        this.filtered_date_array = this.date_array
        this.filtered_close_price_array = this.close_price_array
        this.filtered_low_price_array = this.low_price_array
        this.filtered_high_price_array = this.high_price_array
        this.filtered_open_price_array = this.open_price_array
        if(this.first_chart == false){
          console.log("Inside destroy chart of populate chart")
          //this.destroyChart()
        }
        this.chartOptions = {
          series: [
            {
              name: "candle",
              data: this.chart_data_array   
            }
          ],
          chart: {
            type: "candlestick",
            height: height_of_chart
          },
          title: {
            text: this.stock_symbol,
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
        // this.chart = new Chart('canvas', {
        //   type: 'line',          
        //   data: {      
        //     labels: this.date_array,
        //     datasets: [
  
        //       {
        //         pointRadius: 0,
        //         label: 'Close Price',
        //         data: this.close_price_array,
        //         borderColor: 'black',
        //         stack: 'combined'
  
        //       }
        //     ]
        //   },
        //   options:{

        //     scales:{
  
        //     },
        //     plugins: {
        //       legend: {
        //       },
        //       title: {
        //         font: {
        //           size: 25,
                  
        //         },
        //         display: true,
        //         text: this.stock_symbol,
        //       },
        //       tooltip : {
        //         enabled: true
        //       }
        //     },
        //     elements: {
        //       point: {
  
        //       }
        //     },
        //   }
        // })
      this.show_filter = true;
      console.log("Setting value of first_chart to false;")
      this.first_chart = false;
      this.if_loaded = true;
      })
  }

  showMovingAverage(ev:any){
    if(ev.checked){
      console.log("ev checked")
      this.matboxChecked = true;
      console.log("Show moving average")
      //calculate moving average for 100 days
      let moving_avg_200 = []
      let moving_avg_100 = []
      let moving_avg_50 = []
      let moving_avg_20 = []
      console.log("date_slice_array is: ", this.filtered_date_array)
      console.log("close_price_sliced_array is: ", this.filtered_close_price_array)
      for(let i=0; i<this.filtered_close_price_array.length; i++){
        if(i<100){
          moving_avg_100.push(NaN)
        }else{
          let close_price_end_index = i;
          let close_price_start_index = i-100;
          let bufferArr = this.filtered_close_price_array.slice(i-100, i)
          let sum = 0
          for(let j=0;j<bufferArr.length;j++){
            sum = sum + bufferArr[j]
          }
          moving_avg_100.push(sum/100)
        }
      }
      for(let i=0; i<this.filtered_close_price_array.length; i++){
        if(i<50){
          moving_avg_50.push(NaN)
        }else{
          let close_price_end_index = i;
          let close_price_start_index = i-50;
          let bufferArr = this.filtered_close_price_array.slice(i-50, i)
          let sum = 0
          for(let j=0;j<bufferArr.length;j++){
            sum = sum + bufferArr[j]
          }
          moving_avg_50.push(sum/50)
        }
      }
      for(let i=0; i<this.filtered_close_price_array.length; i++){
        if(i<20){
          moving_avg_20.push(NaN)
        }else{
          let close_price_end_index = i;
          let close_price_start_index = i-20;
          let bufferArr = this.filtered_close_price_array.slice(i-20, i)
          let sum = 0
          for(let j=0;j<bufferArr.length;j++){
            sum = sum + bufferArr[j]
          }
          moving_avg_20.push(sum/20)
        }
      }
      for(let i=0; i<this.filtered_close_price_array.length; i++){
        if(i<200){
          moving_avg_200.push(NaN)
        }else{
          let close_price_end_index = i;
          let close_price_start_index = i-200;
          let bufferArr = this.filtered_close_price_array.slice(i-200, i)
          let sum = 0
          for(let j=0;j<bufferArr.length;j++){
            sum = sum + bufferArr[j]
          }
          moving_avg_200.push(sum/200)
        }
      }
      console.log("filtered closing data: ", this.filtered_close_price_array)
      console.log("moving_avg_200: ", moving_avg_200)
      console.log("moving_avg_100: ", moving_avg_100)
      console.log("moving_avg_50: ", moving_avg_50)
      console.log("moving_avg_20: ", moving_avg_20)
      // this.destroyChart()
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels : this.filtered_date_array,
          datasets: [
            {
              pointRadius: 0,
              label: 'Moving Average 200',
              data: moving_avg_200,
              borderColor: 'red',
            },
            {
              pointRadius: 0,
              label: 'Moving Average 100',
              data: moving_avg_100,
              borderColor: 'green',
            },
            {
              pointRadius: 0,
              label: 'Moving Average 50',
              data: moving_avg_50,
              borderColor: 'blue',
            },
            {
              pointRadius: 0,
              label: 'Moving Average 20',
              data: moving_avg_20,
              borderColor: 'yellow',
            },
            {
              pointRadius: 0,
              label: 'Close Price',
              data: this.filtered_close_price_array,
              borderColor: 'black',
            }
          ]
        },
        options:{
          scales:{

          },
          plugins: {
            title: {
              font: {
                size: 25,
                
              },
              display: true,
              text: this.stock_symbol,
            },
            tooltip : {
              enabled: true
            }
          },
          elements: {
            point: {

            }
          },
        }
      })
      this.chart.update()
    }
    if(!ev.checked){
      console.log("ev unchecked")

      this.populateChart(this.stock_symbol)
      this.matboxChecked = false;
    }
  }
  
  redirect_to_login(){
    this.matDialogRef = this.matDialog.open(LoginRedirectComponent, {
      hasBackdrop: true,
    });
    this.matDialogRef.updatePosition({ top: '22vh', left: '16vw' });
    this.matDialogRef.afterClosed().subscribe((res: boolean) => {
      if ((res == true)) {
      }
    });
  }

  predict(){
    var access_key = this.store_data.access_token
    var user_name = this.store_data.user_name
    
    console.log("accesskey, username: ", access_key, user_name)
    if (access_key == 'none' || user_name == 'none'){
      this.redirect_to_login()
    }
    else{
      this.show_spinner = true;
      let data= {
        "symbol": this.stock_symbol,
        "us_stock": false,
        "access_key" : access_key,
        "user_name" : user_name
      }

      console.log("Inside predict")
      this.get_data.predict(data).subscribe((response: any)=>{
        if(response == 'login required'){
          this.redirect_to_login()
        }
        this.show_spinner= false;
        console.log("data is: ", response)
        this.predicted_price = this.getDecimals(response.predicted_price[0])
        console.log("Predicted price is: ", this.predicted_price)
        localStorage.setItem("pred_price", this.predicted_price)
        this.last_closing_price = this.getDecimals(this.filtered_close_price_array[this.filtered_close_price_array.length-1])
        console.log("last_closing_price is: ", this.last_closing_price)
        this.matDialogRef = this.matDialog.open(HelloComponent, {
          data:{
            last_close_price : this.last_closing_price,
            predicted_close_price: this.predicted_price,
            point_movement: this.getDecimals(Math.abs(this.last_closing_price - this.predicted_price)),
            ROI: this.getDecimals(Math.abs(this.last_closing_price - this.predicted_price)*100/this.last_closing_price),
          },
          hasBackdrop: false,
        });
        this.matDialogRef.updatePosition({ top: '22vh', left: '16vw' });
        this.matDialogRef.afterClosed().subscribe((res: boolean) => {
          if ((res == true)) {
          }
        });
      })
    }
  }


  similar_charts(){
    var access_key = this.store_data.access_token
    var user_name = this.store_data.user_name
    
    console.log("accesskey, username: ", access_key, user_name)
    if (access_key == 'none' || user_name == 'none'){
      this.redirect_to_login()
    }
    else{
      this.router.navigate(['/show-similar']);
    }
  }
  getDecimals(value:any){
    console.log("Inside getDecimals", value)
    let buffer = value.toString()
    let buffer1 = buffer.split('.')
    console.log("buffer1 is: ", buffer1)
    if(buffer1.length == 1 || buffer1[1].length < 2){
      return value
    }
    let buffer1_len = buffer1[1].length
    let decimalBuffer = buffer1[1].slice(0,2)
    let finalValue = buffer1[0] +'.'+ decimalBuffer
    let y:number = +finalValue
    return y;
}
}
