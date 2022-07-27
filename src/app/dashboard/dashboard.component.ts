import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables, Tooltip  } from 'chart.js';
import { Observable, reduce, withLatestFrom } from 'rxjs';
import { GetDataService } from 'src/services/get-data.service';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { stock_options } from './stock_symbols';
export interface Stock {
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //variables to initialize search variables
  myControl = new FormControl<string | Stock>('');
  options: Stock[] = [];
  filteredOptions: Observable<Stock[]>;
  selected_symbol = ""

  labelArr: number[] = []
  moving_average_20_signal = ''
  moving_average_50_signal = ''
  moving_average_100_signal = ''
  moving_average_200_signal = ''
  //variables to handle condition for displaying charts and other elemtns
  show_chart = false;
  show_spinner = false;
  show_prediction_button = true;
  show_prediction_chart = false;
  show_info = true;
  show_filter = false;
  show_back_arrow = false;
  matboxChecked = false;
  //variables for moving averages
  moving_average_checkbox_checked = false;
  

  //variables for prediction charts
  roi = 0
  actual_values: any;
  last_closing_price = 0;
  predicted_values_number:number[] = []
  predicted_values: any;
  date_sliced_array: string[] = []
  close_price_sliced_array = []
  filter_choices = ['7','30','60','365','All']
  chart: any = [];
  chart1: any = [];
  close_price_array = [];
  date_string_array: string[] = []
  volume_array:number[] = []
  date_array:string[] = []
  stock_data: any;
  first_prediction_chart = true;
  predictedValue = 0;
  first_chart = true
  watchlist : string[]= []
  default_watchlist = [{symbolName : "RELIANCE"},{symbolName : "DMART"},{symbolName : "IGL"}]
  stockinputvalue = ''
  colorObject = {name: 'Primary', completed: false, color: 'primary'}
  constructor(private getData: GetDataService,
    private httpClient: HttpClient) { 
    Chart.register(...registerables);
    Chart.register([Tooltip])
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }
  displayFn(user: Stock): string {
    return user && user.name ? user.name : '';
  }
  addStock(symbol: string){
    console.log("name is: ", symbol)
    if(this.watchlist.includes(symbol)){
      
    }else{
      this.default_watchlist.push({
        symbolName: symbol
      })
    }
    this.stockinputvalue = ''
  }
  showMovingAverage(ev:any){
    if(ev.checked){
      this.matboxChecked = true;
      
      this.moving_average_checkbox_checked = true;
      console.log("Show moving average")
      //calculate moving average for 100 days
      let moving_avg_200 = []
      let moving_avg_100 = []
      let moving_avg_50 = []
      let moving_avg_20 = []
      console.log("date_slice_array is: ", this.date_sliced_array)
      console.log("close_price_sliced_array is: ", this.close_price_sliced_array)
      for(let i=0; i<this.close_price_sliced_array.length; i++){
        if(i<100){
          moving_avg_100.push(NaN)
        }else{
          let close_price_end_index = i;
          let close_price_start_index = i-100;
          let bufferArr = this.close_price_sliced_array.slice(i-100, i)
          let sum = 0
          for(let j=0;j<bufferArr.length;j++){
            sum = sum + bufferArr[j]
          }
          moving_avg_100.push(sum/100)
        }
      }
      for(let i=0; i<this.close_price_sliced_array.length; i++){
        if(i<50){
          moving_avg_50.push(NaN)
        }else{
          let close_price_end_index = i;
          let close_price_start_index = i-50;
          let bufferArr = this.close_price_sliced_array.slice(i-50, i)
          let sum = 0
          for(let j=0;j<bufferArr.length;j++){
            sum = sum + bufferArr[j]
          }
          moving_avg_50.push(sum/50)
        }
      }
      for(let i=0; i<this.close_price_sliced_array.length; i++){
        if(i<20){
          moving_avg_20.push(NaN)
        }else{
          let close_price_end_index = i;
          let close_price_start_index = i-20;
          let bufferArr = this.close_price_sliced_array.slice(i-20, i)
          let sum = 0
          for(let j=0;j<bufferArr.length;j++){
            sum = sum + bufferArr[j]
          }
          moving_avg_20.push(sum/20)
        }
      }
      for(let i=0; i<this.close_price_sliced_array.length; i++){
        if(i<200){
          moving_avg_200.push(NaN)
        }else{
          let close_price_end_index = i;
          let close_price_start_index = i-200;
          let bufferArr = this.close_price_sliced_array.slice(i-200, i)
          let sum = 0
          for(let j=0;j<bufferArr.length;j++){
            sum = sum + bufferArr[j]
          }
          moving_avg_200.push(sum/200)
        }
      }
      let labelArr1 = []
      for(let z=0;z < this.close_price_array.length; z++){
        labelArr1.push(z)
      }
      this.destroyChart()
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels : this.date_sliced_array,
          datasets: [
            {
              fill: true,
              pointRadius: 0,
              label: 'Moving Average 200',
              data: moving_avg_200,
              borderColor: 'red',
            },
            {
              fill: true,
              pointRadius: 0,
              label: 'Moving Average 100',
              data: moving_avg_100,
              borderColor: 'green',
            },
            {
              fill: true,
              pointRadius: 0,
              label: 'Moving Average 50',
              data: moving_avg_50,
              borderColor: 'blue',
            },
            {
              fill: true,
              pointRadius: 0,
              label: 'Moving Average 20',
              data: moving_avg_20,
              borderColor: 'yellow',
            },
            {
              fill: true,
              pointRadius: 0,
              label: 'Close Price',
              data: this.close_price_sliced_array,
              borderColor: 'white',
            }
          ]
        },
        options:{
          scales:{
            x : {
              grid: {
                color:'#191919',
              }
            },
            y : {
              grid: {
                color:'#191919',
              }
            }
          },
          plugins: {
            title: {
              font: {
                size: 25,
                
              },
              display: true,
              text: this.selected_symbol,
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
      console.log("moving average is: ", moving_avg_100)
      console.log("close price is : ", this.close_price_array)
    }
    if(!ev.checked){
      this.matboxChecked = false;

      this.moving_average_checkbox_checked = false;
      console.log("Hide moving average")
      this.destroyChart()
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels : this.date_sliced_array,
          datasets: [
            {
              fill: true,
              pointRadius: 0,
              label: 'Close Price',
              data: this.close_price_sliced_array,
              borderColor: 'white',

            }
          ]
        },
        options:{
          scales:{
            x : {
              grid: {
                color:'#191919',
              }
            },
            y : {
              grid: {
                color:'#191919',
              }
            }
          },
          plugins: {
            title: {
              font: {
                size: 25,
                
              },
              display: true,
              text: this.selected_symbol,
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
  }
  ngOnInit(): void {
      console.log(stock_options)
      this.show_prediction_button = false;
      this.show_back_arrow = false;
      stock_options.forEach(stockName => {
        this.options.push({
          name: stockName
        })
      });
      this.default_watchlist.forEach(element => {
        this.watchlist.push(element.symbolName)
      });
      document.getElementById("canvas")!.style.display = "none";
      document.getElementById("canvas1")!.style.display = "none";

  }
  private _filter(name: string): Stock[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  addSymbol(){
 
  }
  getDecimals(value:any){
      let buffer = value.toString()
      let buffer1 = buffer.split('.')
      let decimalBuffer = buffer1[1].slice(0,2)
      let finalValue = buffer1[0] +'.'+ decimalBuffer
      let y:number = +finalValue
      return y;
  }
  seePredictions(){
    if(this.first_prediction_chart == false){
      this.destroyChart1()
    }
    this.first_prediction_chart =false
    this.show_spinner = true;
    this.matboxChecked = false;
    this.show_filter = false;
    this.show_prediction_button = false
    document.getElementById("canvas")!.style.display = "none";
    let data= {
      "symbol": this.selected_symbol
    }
    this.predicted_values_number = []
    this.labelArr = []
    this.getData.getModelData(data).subscribe((response: any)=>{
      // let buffer = response.predicted_price[0].toString()
      // let buffer1 = buffer.split('.')
      // let decimalBuffer = buffer1[1].slice(0,2)
      // let finalValue = buffer1[0] +'.'+ decimalBuffer
      // this.predictedValue = finalValue
      this.predictedValue = this.getDecimals(response.predicted_price[0])
      let response_data = response.response
      this.actual_values = response_data['actual']
      this.last_closing_price = this.getDecimals(this.actual_values[this.actual_values.length-1])
      this.predicted_values = response_data['predicted']
      let buffer_roi = Math.abs((this.predictedValue-this.last_closing_price)/this.last_closing_price) * 100
      this.roi = this.getDecimals(buffer_roi)
      //get moving average signals
      let sum1 = 0
      for(let i = (this.actual_values.length - 20); i< this.actual_values.length;i++){
        sum1 = sum1 + this.actual_values[i]
      }
      let moving_20_signal = sum1/20
      if(this.actual_values[this.actual_values.length-1]> moving_20_signal){
        console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],moving_20_signal)
        this.moving_average_20_signal = 'BUY'
      }else{
        console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],moving_20_signal)
        this.moving_average_20_signal = 'SELL'
      }

      let sum2 = 0
      for(let i = (this.actual_values.length - 50); i< this.actual_values.length;i++){
        sum2 = sum2 + this.actual_values[i]
      }
      let moving_50_signal = sum2/50
      if(this.actual_values[this.actual_values.length-1]> moving_50_signal){
        console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],moving_50_signal)
        this.moving_average_50_signal = 'BUY'
      }else{
        console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],moving_50_signal)
        this.moving_average_50_signal = 'SELL'
      }
      
      let sum3 = 0
      for(let i = (this.actual_values.length - 100); i< this.actual_values.length;i++){
        sum3 = sum3 + this.actual_values[i]
      }
      let moving_100_signal = sum3/100
      if(this.actual_values[this.actual_values.length-1]> moving_100_signal){
        console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],moving_100_signal)
        this.moving_average_100_signal = 'BUY'
      }else{
        console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],moving_100_signal)
        this.moving_average_100_signal = 'SELL'
      }

      let sum4 = 0
      for(let i = (this.actual_values.length - 200); i< this.actual_values.length;i++){
        sum4 = sum4 + this.actual_values[i]
      }
      let moving_200_signal = sum4/200
      if(this.actual_values[this.actual_values.length-1]> moving_200_signal){
        console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],moving_200_signal)
        this.moving_average_200_signal = 'BUY'
      }else{
        console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],moving_200_signal)
        this.moving_average_200_signal = 'SELL'
      }
      for(let i=0;i<this.actual_values.length;i++){
        let bufferArr = this.predicted_values[i]
        this.predicted_values_number.push(bufferArr[0])
      }
      console.log("predicted values nbmer are: ", this.predicted_values_number)
      let labelArr2 = []
      labelArr2 = this.date_array.slice(this.date_array.length-140, this.date_array.length)
      document.getElementById("canvas1")!.style.display = "block";

      console.log("actual values are: ",this.actual_values)
      this.chart1 = new Chart('canvas1', {
        type: 'line',
        data: {
          labels : labelArr2,
          datasets: [
            {
              fill: true,
              pointRadius: 0,
              label: 'Predicted Price',
              data: this.predicted_values_number,
              borderColor: 'green',

            },
            {
              fill: true,
              pointRadius: 0,
              label: 'Actual Price',
              data: this.actual_values,
              borderColor: 'white',

            }
          ]
        },
        options:{
          scales:{
            x : {
              grid: {
                color:'#191919',
              }
            },
            y : {
              grid: {
                color:'#191919',
              }
            }
          },
          plugins: {
            title: {
              font: {
                size: 25,
                
              },
              display: true,
              text: this.selected_symbol,
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
      this.chart1.update()
    this.show_spinner = false;
    this.show_back_arrow = true;
    })
  }
  backToChart(){
    document.getElementById("canvas")!.style.display = "block";
    this.destroyChart()

    document.getElementById("canvas1")!.style.display = "none";
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.date_array,
        datasets: [

          {
            fill: true,
            pointRadius: 0,
            label: 'Close Price',
            data: this.close_price_array,
            borderColor: 'white',
            stack: 'combined'

          }
        ]
      },
      options:{
        scales:{
          x : {
            grid: {
              color:'#191919',
            }
          },
          y : {
            grid: {
              color:'#191919',
            }
          }
        },
        plugins: {
          title: {
            font: {
              size: 25,
              
            },
            display: true,
            text: this.selected_symbol,
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
    this.show_prediction_button = true;
    this.show_back_arrow = false;
    this.show_filter = true;
  }
  resetDashboard(){
    document.getElementById("canvas")!.style.display = "none";
    document.getElementById("canvas1")!.style.display = "none";
    this.show_filter = false;
    this.close_price_array = []
    this.volume_array = []
    this.date_array = []
    this.chart.destroy();
    this.chart1.destroy();
    this.show_info = true;
    this.show_chart = false;
    this.show_spinner = false;
  }
  destroyChart(){
    this.chart.destroy()
  }
  destroyChart1(){
    this.chart1.destroy()
  }
  filterData(option: any){
    this.matboxChecked = false;

    this.show_info = false;
    let pointerRadius = 0
    if(option <=60){
      pointerRadius = 5
    }
    this.date_sliced_array = this.date_array.slice(this.date_array.length-option,this.date_array.length)
    this.close_price_sliced_array = this.close_price_array.slice(this.close_price_array.length-option,this.close_price_array.length)
    console.log("date_slice_array is: ", this.date_sliced_array)
    console.log("close_price_sliced_array is: ", this.close_price_sliced_array)
    if(this.first_chart == false){
      this.destroyChart()
    }
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.date_sliced_array,
        datasets: [
          {
            fill: true,
            pointRadius: pointerRadius,
            label: 'Close Price',
            data: this.close_price_sliced_array,
            borderColor: 'white',
            stack: 'combined'

          }
        ]
      },
      options:{
        scales:{
          x : {
            grid: {
              color:'#191919',
            }
          },
          y : {
            grid: {
              color:'#191919',
            }
          }
        },
        plugins: {
          title: {
            font: {
              size: 25,
              
            },
            display: true,
            text: this.selected_symbol,
          },
          tooltip : {
            enabled: true
          },
        },
        elements: {
          point: {

          }
        },
      }
    })
    this.chart.update()
  }

  async getStockData(symbolName: any){
    document.getElementById("canvas")!.style.display = "none";
    document.getElementById("canvas1")!.style.display = "none";
    this.show_info = false;
    this.show_back_arrow = false;
    this.show_spinner = true;
    this.show_chart = false;
    this.selected_symbol = symbolName
    this.show_filter = false;
    if(this.first_chart == false){
      this.destroyChart()
    }
    let data = {
      "symbol" : symbolName
    }
    this.getData.getStockData(data).subscribe(response=>{
      this.date_array = []
      this.date_string_array = []
      this.close_price_array = []
      this.volume_array = []
      this.stock_data = response;
      this.close_price_array = this.stock_data['Close']
      this.volume_array = this.stock_data['Volume']
      this.date_string_array = this.stock_data['Date']
      for(let i=0;i < this.date_string_array.length; i++){
        let bufferDate = this.date_string_array[i].split("T")
        this.date_array[i] = bufferDate[0];
      }
      this.date_sliced_array = this.date_array
      this.close_price_sliced_array = this.close_price_array
      console.log("date_slice_array is: ", this.date_sliced_array)
      console.log("close_price_sliced_array is: ", this.close_price_sliced_array)
      let min_close_price = Math.min(...this.close_price_array)
      let max_volume = Math.max(...this.volume_array)
      let quotient = max_volume/min_close_price
      for(let i=0;i<this.volume_array.length; i++){
          this.volume_array[i] = this.volume_array[i]/quotient
      }
    document.getElementById("canvas")!.style.display = "block";

     this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.date_array,
          datasets: [

            {
              fill: true,
              pointRadius: 0,
              label: 'Close Price',
              data: this.close_price_array,
              borderColor: 'white',
              stack: 'combined'

            }
          ]
        },
        options:{
          scales:{
            x : {
              grid: {
                color:'#191919',
              }
            },
            y : {
              grid: {
                color:'#191919',
              }
            }
          },
          plugins: {
            title: {
              font: {
                size: 25,
                
              },
              display: true,
              text: this.selected_symbol,
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
      this.first_chart = false;
      this.show_filter = true;
      this.show_spinner = false;
      this.show_chart = true;
      this.show_prediction_button = true;
      document.getElementById("canvas")!.style.display = "block";

    })


  }

}
