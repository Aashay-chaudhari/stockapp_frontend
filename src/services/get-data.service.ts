import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  url: any;
  constructor(private httpClient: HttpClient) { }

  getStockData(param: any){
    this.url = "http://127.0.0.1:8000/getStockData/"
    return this.httpClient.post(this.url, param);
  }
  getModelData(param: any){
    this.url = "http://127.0.0.1:8000/getModelData/"
    return this.httpClient.post(this.url, param);
  }
  predict(param: any){
    this.url = "http://127.0.0.1:8000/predict/"
    return this.httpClient.post(this.url, param);
  }
  getNext30Days(param: any){
    this.url = "http://127.0.0.1:8000/getNext30Days/"
    return this.httpClient.post(this.url, param);
  }
  getSimilarCharts(param:any){
    this.url = "http://127.0.0.1:8000/show_similar/"
    return this.httpClient.post(this.url, param);
  }
}
