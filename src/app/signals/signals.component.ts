import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/services/get-data.service';
import { Chart, registerables, Tooltip  } from 'chart.js';
import { ChartsComponent } from '../charts/charts.component';
@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent implements OnInit {
  predicted_values_number:any = []
  selected_symbol: any;
  labelArr: any = [];
  predictedValue: any;
  actual_values: any;
  last_closing_price: any;
  predicted_values: any;
  roi: any;
  show_spinner= false;
  moving_average_20_signal: any;
  moving_average_50_signal: any;
  moving_average_100_signal: any;
  moving_average_200_signal: any;
  date_array: any;
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
    let buffer = value.toString()
    let buffer1 = buffer.split('.')
    let decimalBuffer = buffer1[1].slice(0,2)
    let finalValue = buffer1[0] +'.'+ decimalBuffer
    let y:number = +finalValue
    return y;
}

  seePredictions(){
    this.show_spinner = true;
    this.selected_symbol = localStorage.getItem('stock')
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
      for(let i=0;i<this.actual_values.length;i++){
        let bufferArr = this.predicted_values[i]
        this.predicted_values_number.push(bufferArr[0])
      }
      console.log("predicted values nbmer are: ", this.predicted_values_number)
      let labelArr2 = []

      // labelArr2 = this.date_array.slice(this.date_array.length-140, this.date_array.length)
      for(let i=0;i<140;i++){
        labelArr2.push(i)
      }

      this.moving_20_signal = this.getDecimals(this.moving_20_signal)
      this.moving_50_signal = this.getDecimals(this.moving_50_signal)
      this.moving_100_signal = this.getDecimals(this.moving_100_signal)

      this.chart2 = new Chart('canvas2', {
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
              text: "Nifty 50 Testing Chart",
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

}
