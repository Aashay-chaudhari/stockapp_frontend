import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StoreDataService } from 'src/services/store-data.service';
import { PredictionComponent } from '../prediction/prediction.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  chartClass: any;
  predictionClass: any;
  show_predict = false;
  show_chart = false;
  show_info = true;
  show_predict30 = false;
  constructor(private store_data : StoreDataService) {
    localStorage.clear()
   }

  ngOnInit(): void {

    this.store_data.show_predictions.subscribe(response=>{
        this.show_predict = response;
        if(this.show_predict==true){
          this.show_chart =false
          this.show_info = false;
          this.show_predict30 = false;
        }
        // this.show_chart = false;
        // this.show_predict30 = false;
        // console.log("change in show predict detected")
        // console.log("Value of show predict is: ", this.show_predict)
        // if(response==true){
        //   this.predictionClass.style.display = 'block';
        //   this.chartClass.style.display = 'none';

        // }
    })
    this.store_data.show_predictions30.subscribe(response=>{
        this.show_predict30 = response;
        if(this.show_predict30==true){
          this.show_chart =false
          this.show_info = false;
          this.show_predict = false;
        }
        // this.show_chart = false;
        // this.show_predict30 = false;
        // console.log("change in show predict detected")
        // console.log("Value of show predict is: ", this.show_predict)
        // if(response==true){
        //   this.predictionClass.style.display = 'block';
        //   this.chartClass.style.display = 'none';

        // }
    })
    this.store_data.stock_searched.subscribe(response=>{
      this.show_predict30 = false;
      this.show_predict = false;
      this.show_chart = true;
      this.show_info = false;
    })
  }


}
