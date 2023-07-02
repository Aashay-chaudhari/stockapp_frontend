import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { StoreDataService } from 'src/services/store-data.service';
import { stock_options } from './stock_symbols';
import { ChartsComponent } from '../charts/charts.component';
export interface Stock {
  name: string;
}
@Component({
  selector: 'app-advanced-watchlist',
  templateUrl: './advanced-watchlist.component.html',
  styleUrls: ['./advanced-watchlist.component.css']
})
export class AdvancedWatchlistComponent implements OnInit {
 //Getting value of stock input and suggesting auto complete
 myControl = new FormControl<string | Stock>('');
 stockinputvalue = ''
 filteredOptions: Observable<Stock[]>;
 options: Stock[] = [];
 watchlist : string[]= []

 //Default watchlist
 default_watchlist = [{symbolName : "TSLA"}]

 constructor(private store_data: StoreDataService,
   private chartComponent: ChartsComponent) {
   this.filteredOptions = this.myControl.valueChanges.pipe(
     startWith(''),
     map(value => {
       const name = typeof value === 'string' ? value : value?.name;
       return name ? this._filter(name as string) : this.options.slice();
     }),
   );
  }

 ngOnInit(): void {
   stock_options.forEach(stockName => {
     this.options.push({
       name: stockName
     })
   });
 }

 //Functions associated with search input
 displayFn(user: Stock): string {
   return user && user.name ? user.name : '';
 }
 addStock(symbol: string){
   console.log("name is: ", symbol)
   console.log("name is: ", symbol)
   if(this.watchlist.includes(symbol)){
     
   }else{
     this.default_watchlist.push({
       symbolName: symbol
     })
   }
   this.stockinputvalue = ''
 }

 private _filter(name: string): Stock[] {
   const filterValue = name.toLowerCase();

   return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
 }
 async getStockData(symbolName: any){
   console.log("Symbol name is: ", symbolName)
   this.store_data.updateStockSearched(symbolName);
   localStorage.setItem('stock', symbolName)
 }
}
