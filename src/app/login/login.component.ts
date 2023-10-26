import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { StoreDataService } from 'src/services/store-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name = new FormControl('');
  pass = new FormControl('');
  access_key: string | null = '';
  result : any;
  constructor(private login: LoginService,
    private store_data: StoreDataService,
    private router: Router,
    ) { }
  errmsg = ''

  ngOnInit(): void {
  }
  guessLogin(){
    this.router.navigate(['/basic-charting']);
  }

  check_email_validity(){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return (this.name.value && emailPattern.test(this.name.value)) 
  }

  loginUser(){
    if(!this.check_email_validity()){
      this.errmsg = "Please enter valid email address."
    }

    else if(this.name.value == ''){
      this.errmsg = "The username can not be empty."
    }
    else if(this.pass.value == ''){
      this.errmsg = "The password can not be empty."
    }
    else{
      let data = {
        "name" : this.name.value,
        "password" : this.pass.value
      }
      this.login.checkUser(data).subscribe(response=>{
        if(response!="Failed"){
          this.result = response;

          this.store_data.setCreds(this.result[0], this.result[1])
          
          this.router.navigate(['/basic-charting']);
        }else{
          this.errmsg = "Login failed. Please check your username and password."
        }
      })
    }
  }

}
