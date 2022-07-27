import { Component, Input, Inject } from "@angular/core";
import { RippleGlobalOptions } from "@angular/material/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StoreDataService } from "src/services/store-data.service";

@Component({
  selector: "hello",
  template: `
    <style>
    button{
      background-color: white;
      border: none;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      cursor: pointer;
      border-radius: 5px;
      font-weight: 600;
      height: 35px;
      width: 70px;

    }
     button:hover{
      background-color: rgb(238, 235, 235);
  
  }
    </style>
    <div style="width:200px;text-align: center">
      <h6 mat-dialog-title style="font-size: 15px; margin: 0px !important;">Predictions</h6>
      <div mat-dialog-actions align="center">
        <div style="font-size: 14px; margin-bottom: 10px">
        Today's Close Price: <b>{{last_close_price}}</b>
        </div>
        <div style="font-size: 14px; margin-bottom: 10px;">
        Tomorrow's Close Price:  <b>{{predicted_close_price}}</b>
        </div>
        <div style="font-size: 14px; margin-bottom: 10px;">
        Point movement:  <b>{{point_movement}}</b>
        </div>
        <div style="font-size: 14px; margin-bottom: 10px;">
        ROI: <b>{{ROI}}%</b><br>
        <div style="min-height: 20px"></div>
        <button
        style="margin-right: 15px;"
        type="button"
        mat-flat-button
        color="primary"
        [mat-dialog-close]="true"
      >
        Done
      </button>
      <button
      type="button"
      mat-flat-button
      color="primary"
      (click)="signals()"
      [mat-dialog-close]="true"
    >
      Signals
    </button>
        </div>

      </div>
    </div>
  `
})
export class HelloComponent {
  last_close_price: any ;
  predicted_close_price: any;
  point_movement: any;
  ROI: any;
  constructor(
    private _mdr: MatDialogRef<HelloComponent>,
    private store_data: StoreDataService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.last_close_price = data.last_close_price
    this.predicted_close_price = data.predicted_close_price
    this.point_movement = data.point_movement
    this.ROI = data.ROI
  }
  signals(){
    this.store_data.updateShowSignal(true)
  }
  CloseDialog() {
    this._mdr.close(false)
  }
}
export interface DialogData {
  last_close_price: any ;
  predicted_close_price: any;
  point_movement: any;
  ROI: any;
}
