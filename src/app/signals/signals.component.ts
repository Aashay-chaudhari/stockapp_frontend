import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/services/get-data.service';
import { Chart, registerables, Tooltip  } from 'chart.js';
import { ChartsComponent } from '../charts/charts.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent implements OnInit {
  selected_symbol: any;
  labelArr: any = [];
  predictedValue: any;
  actual_values: any;
  last_closing_price: any;
  predicted_values: any;
  dates_array: any;
  roi: any;
  show_spinner= false;
  moving_average_20_signal: any;
  moving_average_50_signal: any;
  moving_average_100_signal: any;
  moving_average_200_signal: any;
  chart2: any = [];
  moving_20_signal :any;
  moving_50_signal :any;
  moving_100_signal :any;
  moving_200_signal :any;
  NaN = NaN
  constructor(private getData: GetDataService,
    private  chartComponent : ChartsComponent) { }

  ngOnInit(): void {
    this.seePredictions()
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

  seePredictions(){
    this.show_spinner = true;
    this.selected_symbol = localStorage.getItem('stock')
    let data= {
      "symbol": this.selected_symbol,
      "us_stock": false
    }
    this.labelArr = []
    this.getData.getModelData(data).subscribe((response: any)=>{
      console.log("response is: ", response)
      this.predictedValue = localStorage.getItem("pred_price")
      let response_data = response.response
      this.actual_values = response_data['actual']
      this.predicted_values = response_data['predicted']
      this.dates_array = response_data['dates']

      console.log("dates array is: ", this.dates_array)
      const mappedDates = this.dates_array.map((buffer_date: string) => buffer_date.split('T')[0]);

      this.last_closing_price = this.getDecimals(this.actual_values[this.actual_values.length-1])
      let buffer_roi = Math.abs((this.predictedValue-this.last_closing_price)/this.last_closing_price) * 100
      this.roi = this.getDecimals(buffer_roi)
      //get moving average signals

      console.log("predict values from response are: ", this.predicted_values)

      this.get_moving_averages()

      this.moving_20_signal = this.getDecimals(this.moving_20_signal)
      this.moving_50_signal = this.getDecimals(this.moving_50_signal)
      this.moving_100_signal = this.getDecimals(this.moving_100_signal)

      this.chart2 = new Chart('canvas2', {
        type: 'line',
        data: {
          labels : mappedDates,
          datasets: [
            {
              fill: true,
              pointRadius: 0,
              label: 'Predicted Price',
              data: this.predicted_values,
              borderColor: 'green',

            },
            {
              fill: true,
              pointRadius: 0,
              label: 'Actual Price',
              data: this.actual_values,
              borderColor: 'black',

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
              text: "Model performance on "+ this.selected_symbol + " last 140 trading session",
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
    this.show_spinner = false;

      this.chart2.update()
    })
  }

  get_moving_averages(){
    let sum1 = 0
    for(let i = (this.actual_values.length - 20); i< this.actual_values.length;i++){
      sum1 = sum1 + this.actual_values[i]
    }
    this.moving_20_signal = sum1/20
    if(this.actual_values[this.actual_values.length-1]> this.moving_20_signal){
      console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],this.moving_20_signal)
      this.moving_average_20_signal = 'BUY'
    }else{
      console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],this.moving_20_signal)
      this.moving_average_20_signal = 'SELL'
    }

    let sum2 = 0
    for(let i = (this.actual_values.length - 50); i< this.actual_values.length;i++){
      sum2 = sum2 + this.actual_values[i]
    }
    this.moving_50_signal = sum2/50
    if(this.actual_values[this.actual_values.length-1]> this.moving_50_signal){
      console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],this.moving_50_signal)
      this.moving_average_50_signal = 'BUY'
    }else{
      console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],this.moving_50_signal)
      this.moving_average_50_signal = 'SELL'
    }
    
    let sum3 = 0
    for(let i = (this.actual_values.length - 100); i< this.actual_values.length;i++){
      sum3 = sum3 + this.actual_values[i]
    }
    this.moving_100_signal = sum3/100
    if(this.actual_values[this.actual_values.length-1]> this.moving_100_signal){
      console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],this.moving_100_signal)
      this.moving_average_100_signal = 'BUY'
    }else{
      console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],this.moving_100_signal)
      this.moving_average_100_signal = 'SELL'
    }

    let sum4 = 0
    for(let i = (this.actual_values.length - 200); i< this.actual_values.length;i++){
      sum4 = sum4 + this.actual_values[i]
    }
    this.moving_200_signal = sum4/200
    if(this.actual_values[this.actual_values.length-1]> this.moving_200_signal){
      console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],this.moving_200_signal)
      this.moving_average_200_signal = 'BUY'
    }else{
      console.log("Value for 20: ",this.actual_values[this.actual_values.length-1],this.moving_200_signal)
      this.moving_average_200_signal = 'SELL'
    }
  }
}
