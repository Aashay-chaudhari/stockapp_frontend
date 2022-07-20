import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { GetDataService } from 'src/services/get-data.service';
import { StoreDataService } from 'src/services/store-data.service';
import { HelloComponent } from './hello.component';
import { Predict30Component } from '../predict30/predict30.component';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  show_chart = false;
  show_spinner = false;
  stock_symbol: any;
  chart: any = [];
  first_chart = true;
  stock_data: any;
  close_price_array = []
  date_string_array:string[] = []
  volume_array = []
  date_array:any = []
  filtered_close_price_array = []
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
    public Predict30Component: Predict30Component,
    private get_data : GetDataService) {
    Chart.register(...registerables);
    this.matDialogRef =  MatDialogRef<HelloComponent>;

    }

  ngOnInit(): void {
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
    this.matboxChecked = false;
    console.log("optionsi s: ",option)
    this.filtered_date_array = this.date_array.slice(this.date_array.length-option,this.date_array.length)
    this.filtered_close_price_array = this.close_price_array.slice(this.close_price_array.length-option,this.close_price_array.length)
    let pointerRadius = 0;
    this.destroyChart()
    if(option<=60){
      pointerRadius = 5;
    }
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.filtered_date_array,
        datasets: [

          {
            fill: true,
            pointRadius: pointerRadius,
            label: 'Close Price',
            data: this.filtered_close_price_array,
            borderColor: 'darkgray',
            stack: 'combined'

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
            enabled: true,
          }
        },
        elements: {
          point: {

          }
        },
      }
    })
  }
  populateChart(symbolName: string){
    this.show_spinner = true;
    this.matboxChecked = false;
    if(this.first_chart == false){
      this.destroyChart()
    }
    this.matDialog.closeAll()
    let data = {
      "symbol" : symbolName
    }
    this.date_array = []

      this.get_data.getStockData(data).subscribe(response=>{
    this.show_spinner = false;

      this.show_chart = true;
      console.log("first chart value from populate chart: ", this.first_chart)
        console.log("Inside getstockdata ")
        this.stock_data = response;
        this.close_price_array = this.stock_data['Close']
        this.volume_array = this.stock_data['Volume']
        this.date_string_array = this.stock_data['Date']
        for(let i=0;i < this.date_string_array.length; i++){
          let bufferDate = this.date_string_array[i].split("T")
          this.date_array[i] = bufferDate[0];
        }
        this.filtered_date_array = this.date_array
        this.filtered_close_price_array = this.close_price_array
        if(this.first_chart == false){
          console.log("Inside destroy chart of populate chart")
          this.destroyChart()
        }
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
                borderColor: 'darkgray',
                stack: 'combined'
  
              }
            ]
          },
          options:{

            scales:{
  
            },
            plugins: {
              legend: {
              },
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
      this.show_filter = true;
      console.log("Setting value of first_chart to false;")
      this.first_chart = false;
        
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
      this.destroyChart()
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels : this.filtered_date_array,
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
  predict(){
    this.show_spinner = true;
    // this.store_data.updateShowPredicted(true)
    // localStorage.setItem('stock_symbol', this.stock_symbol)
    // this.destroyChart()
    let data= {
      "symbol": this.stock_symbol
    }
    console.log("Inside predict")
    this.get_data.getModelData(data).subscribe((response: any)=>{
      this.show_spinner= false;
      console.log("data is: ", response)
      this.predicted_price = this.getDecimals(response.predicted_price[0])
      console.log("Predicted pric eis: ", this.predicted_price)
      this.last_closing_price = this.getDecimals(this.filtered_close_price_array[this.filtered_close_price_array.length-1])

      console.log("last_closing_price eis: ", this.last_closing_price)
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
  predict30(){
    this.store_data.updateShowPredicted30(true)
    localStorage.setItem('stock_symbol', this.stock_symbol)
    this.destroyChart()
    console.log("Inside predict30 and destroed the chart")
    this.Predict30Component.ngOnInit()
  }
  getDecimals(value:any){
    console.log("Inside getDecimals")
    let buffer = value.toString()
    let buffer1 = buffer.split('.')
    let decimalBuffer = buffer1[1].slice(0,2)
    let finalValue = buffer1[0] +'.'+ decimalBuffer
    let y:number = +finalValue
    return y;
}
}
