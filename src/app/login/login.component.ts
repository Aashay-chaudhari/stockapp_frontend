import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name = new FormControl('');
  pass = new FormControl('');
  constructor(private login: LoginService,
    private router: Router,
    ) { }
  errmsg = ''

  ngOnInit(): void {
  }
  loginUser(){
    if(this.name.value == ''){
      this.errmsg = "The username can not be empty."
    }else if(this.pass.value == ''){
      this.errmsg = "The password can not be empty."
    }else{
      let data = {
        "name" : this.name.value,
        "password" : this.pass.value
      }
      this.login.checkUser(data).subscribe(response=>{
        if(response=="Success"){
          this.router.navigate(['/dashboard']);
        }else{
          this.errmsg = "Login Failed. Please check your username and password."
        }
      })
    }
  }

}
