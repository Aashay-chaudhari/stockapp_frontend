import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/services/get-data.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { HelloComponent } from '../charts/hello.component';
import { Chart, registerables } from 'chart.js';
import { StoreDataService } from 'src/services/store-data.service';
import { Router } from '@angular/router';

declare const TradingView: any;

@Component({
  selector: 'app-advanced-charting',
  templateUrl: './advanced-charting.component.html',
  styleUrls: ['./advanced-charting.component.css']
})
export class AdvancedChartingComponent implements OnInit {
  matDialogRef: any;

  constructor(private get_data : GetDataService,
    private matDialog: MatDialog,
    private router: Router,
    private store_data: StoreDataService,
    ) {
      Chart.register(...registerables);
      this.matDialogRef =  MatDialogRef<HelloComponent>;
     }
  symbol: any;
  show_spinner = false;
  predicted_price:any;
  last_closing_price: any;

  ngOnInit(): void {
    this.load_chart("NASDAQ:TSLA")
    this.store_data.stock_searched.subscribe(response=>{
      this.symbol = response;
      this.load_chart(this.symbol);
    })
  }
  // change(){
  //   console.log("Inside change")
  //   this.symbol = 'NASDAQ:TSLA'
  //   this.load_chart()
  // }
  load_chart(symbol:string){
    console.log("Inside load_chart")
    console.log("screen height: ", screen)
    new TradingView.widget(
      {
      "width": screen.width - 700,
      "height": screen.height - 350,
      "symbol": symbol,
      "timezone": "Etc/UTC",
      "interval": "D",
      "theme": "light",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "withdateranges": true,
      "range": "ytd",
      "hide_top_toolbar": true,
      "hide_side_toolbar": false,
      "allow_symbol_change": false,
      "show_popup_button": false,
      "popup_width": "1000",
      "popup_height": "650",
      "no_referral_id": true,
      "container_id": "tradingview_bac65"
    }
      );
  }

  predict(){
    this.show_spinner = true;
    if(this.symbol==undefined){
      this.symbol = "TSLA"
    }
    let data= {
      "symbol": this.symbol,
      "us_stock": true
    }
    console.log("Inside predict, data: ", data)
    this.get_data.predict(data).subscribe((response: any)=>{
      this.show_spinner= false;
      console.log("data is: ", response)
      this.predicted_price = this.getDecimals(response.predicted_price[0])
      console.log("Predicted pric eis: ", this.predicted_price)
      // this.last_closing_price = this.getDecimals(this.filtered_close_price_array[this.filtered_close_price_array.length-1])
      this.last_closing_price = this.getDecimals(response.last_closing_price)
      console.log("last_closing_price eis: ", response.last_closing_price)
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
  similar_charts(){
    this.router.navigate(['/show-similar']);
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
