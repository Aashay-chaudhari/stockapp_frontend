import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables, Tooltip  } from 'chart.js';
import { GetDataService } from 'src/services/get-data.service';
import { StoreDataService } from 'src/services/store-data.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  predictedValue: any;
  actual_values: any;
  last_closing_price: any;
  predicted_values: any;
  labelArr: any = [];
  roi: any;
  moving_average_20_signal: any;
  moving_average_50_signal: any;
  moving_average_100_signal: any;
  moving_average_200_signal: any;
  predicted_values_number:any= [];
  chart: any;
  constructor(private store_data : StoreDataService,
    private router: Router,
    private getData: GetDataService) {
      console.log("Inside constructor predcition")
   }
  stock_symbol :any;
  ngOnInit(): void {
    console.log("inside ngoninit of predcition")
    this.stock_symbol = localStorage.getItem('stock_symbol')
    let data= {
      "symbol": this.stock_symbol
    }
    this.getData.predict(data).subscribe((response: any)=>{
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
   
     for(let i=0;i<=this.actual_values.length;i++){
        this.labelArr.push(i)
     }

      console.log("actual values are: ",this.actual_values)
      this.chart = new Chart('canvas1', {
        type: 'line',
        data: {
          labels : this.labelArr,
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
    })
  }

  getDecimals(value:any){
    let buffer = value.toString()
    let buffer1 = buffer.split('.')
    let decimalBuffer = buffer1[1].slice(0,2)
    let finalValue = buffer1[0] +'.'+ decimalBuffer
    let y:number = +finalValue
    return y;
}

}
