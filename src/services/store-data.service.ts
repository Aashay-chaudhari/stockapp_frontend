import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreDataService {
  show_predictions30 = new Subject<boolean>();
  show_predictions = new Subject<boolean>();
  stock_searched = new Subject();
  advanced_stock_searched = new Subject();
  show_signal = new Subject<boolean>();
  reset_home = new Subject<boolean>();

  access_token : String = 'none';
  user_name : String = 'none';

  setCreds(access_token: string, user_name: string){
    this.access_token = access_token;
    this.user_name = user_name;
  }

  logout(){
    this.access_token = 'none';
    this.user_name = 'none'; 
  }


  updateStockSearched(stockSymbol: string){
    this.stock_searched.next(stockSymbol);
  }
  updateAdvancedStockSearched(stockSymbol: string){
    this.advanced_stock_searched.next(stockSymbol);
  }
  updateShowSignal(show: boolean){
    this.show_signal.next(show);
  }
  updateResetHome(reset: boolean){
    this.reset_home.next(reset);
  }
  updateShowPredicted(show: boolean){
    this.show_predictions.next(show);
  }
  updateShowPredicted30(show: boolean){
    this.show_predictions30.next(show);
  }
  constructor() { }
}
