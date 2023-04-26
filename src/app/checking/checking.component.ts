import { Component, OnInit } from '@angular/core';

declare const TradingView: any;

@Component({
  selector: 'app-checking',
  templateUrl: './checking.component.html',
  styleUrls: ['./checking.component.css']
})
export class CheckingComponent implements OnInit {

  constructor() { }
  symbol = ''
  ngOnInit(): void {
    this.symbol = 'NASDAQ:AAPL'
    this.load_chart()
  }
  change(){
    console.log("Inside change")
    this.symbol = 'NASDAQ:TSLA'
    this.load_chart()
  }
  load_chart(){
    console.log("Inside load_chart")
    console.log("screen height: ", screen)
    new TradingView.widget(
      {
      "width": screen.width - 800,
      "height": screen.height - 500,
      "symbol": this.symbol,
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

}
