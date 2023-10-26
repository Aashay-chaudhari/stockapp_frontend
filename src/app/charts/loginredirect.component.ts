import { Component, Input, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StoreDataService } from "src/services/store-data.service";
import { Router } from '@angular/router';

@Component({
  selector: "loginredirect",
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

    <div class='login-dialog-container'>
    <h3 mat-dialog-title>Please login to use this service.</h3>

    <div mat-dialog-actions>
      <button mat-button (click)="redirect_to_login()">OK</button>
    </div>
    </div>
  `
})
export class LoginRedirectComponent {

  constructor(
    private router: Router,
    private _mdr: MatDialogRef<LoginRedirectComponent>,
    private store_data: StoreDataService
  ) {

  }
  redirect_to_login(){
    this.router.navigate(['/'])
    this._mdr.close(true)
  }

}

