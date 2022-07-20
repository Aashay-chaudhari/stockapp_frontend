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
  updateStockSearched(stockSymbol: string){
    this.stock_searched.next(stockSymbol);
    console.log("Inside updatestocksearched")
  }
  updateShowPredicted(show: boolean){
    console.log("Inside updateShowPredicted")
    this.show_predictions.next(show);
  }
  updateShowPredicted30(show: boolean){
    console.log("Inside updateShowPredicted")
    this.show_predictions30.next(show);
  }
  constructor() { }
}
