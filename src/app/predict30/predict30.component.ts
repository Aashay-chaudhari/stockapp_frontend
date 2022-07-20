import { Component, HostListener, Injectable, OnDestroy, OnInit } from '@angular/core';
import { GetDataService } from 'src/services/get-data.service';
import { StoreDataService } from 'src/services/store-data.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-predict30',
  templateUrl: './predict30.component.html',
  styleUrls: ['./predict30.component.css']
})
@Injectable({
  providedIn: "root"
})
export class Predict30Component implements OnInit   {
  loading = false;
  first_chart = true;
  chart1: any = [];
  show_spinner = false;
  buffer_prediction:any = []
  stock_symbol:any;
  predicted_values:any = [] 
  date_string_array:string[] = []
  date_array:any = []
  last_60_values:any = []
  response_data:any;
  buffer_var = true
  show_predict = false;
  constructor(private store_data: StoreDataService,
    private get_data : GetDataService) {
    Chart.register(...registerables);

    }

  ngOnInit(): void {
    this.store_data.stock_searched.subscribe(response=>{
      this.stock_symbol = response;
      this.buffer_var = true
      if(this.first_chart==false){
        this.chart1.destroy()
      }
    })

    console.log("Finished creating chart")
    this.store_data.show_predictions30.subscribe(async response=>{
      // this.show_predict = response;
      // if(this.show_predict==true){
      //   this.populateChart('IGL')
      //   console.log("Inside showpredict is true")
      // }
      this.show_predict = response;
      if(this.show_predict==true){
        console.log("show rpedction30 triggered with showpredict true")
        if(this.buffer_var == true){
          await this.populateChart(this.stock_symbol)
  
        }
      }

    })

  }
  destroyCharts(){
    this.chart1.destroy()
  }
  populateChart(symbol:string){
      this.buffer_var = false

      this.show_spinner = true;
      if(this.first_chart==false){
        this.destroyCharts()
      }
        console.log("Inside populatechart of predict30")
        let data = {
          "symbol" : symbol
        }
        return new Promise((resolve,err)=>{
          this.get_data.getNext30Days(data).subscribe(response=>{
            this.date_array = []
            console.log("Inside get30days populate method")
            this.response_data = response
            this.predicted_values = this.response_data['send_back']
            this.last_60_values = this.response_data['last_60_days']
            this.date_string_array = this.response_data['date_array']
            for(let i=0;i < this.date_string_array.length; i++){
              let bufferDate = this.date_string_array[i].split("T")
              this.date_array[i] = bufferDate[0];
            }
            for(let i=1; i<=30; i++){
              this.date_array.push(i.toString())
            }
            console.log("date_array is: ", this.date_array)
            console.log(this.predicted_values)
            console.log(this.last_60_values)
        
      
    
            this.last_60_values.forEach((a: any) => {
              this.buffer_prediction.push(a[0])
          });
          this.predicted_values.forEach((a: any) => {
            this.buffer_prediction.push(a[0])
        });
        
          this.chart1 = new Chart('canvas1', {
            type: 'line',          
            data: {      
             labels: this.date_array,
              // labels: [1,2,3,4,5],
              datasets: [
                {
                  fill: true,
                  pointRadius: 0,
                  label: 'Close Price',
                 data: this.buffer_prediction,
                  // data: [1,2,3,4,5],
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
    
          this.first_chart = false;
          console.log("This first chart value in predict30 set to false")
          })
      this.show_spinner = false;

        })
    }


    

}
