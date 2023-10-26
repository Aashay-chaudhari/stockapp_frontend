import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  name = new FormControl('');
  pass = new FormControl('');
  constructor(private login: LoginService,
    private router: Router,
    ) { }
  errmsg = ''
  ngOnInit(): void {
  }
  
  check_email_validity(){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return (this.name.value && emailPattern.test(this.name.value)) 
  }

  createUser(){
    if(!this.check_email_validity()){
      this.errmsg = "Please enter valid email address."
    }
    else if(this.name.value == ''){
      this.errmsg = "The username can not be empty."
    }else if(this.pass.value == ''){
      this.errmsg = "The password can not be empty."
    }else{
      let data = {
        "email" : this.name.value,
        "password" : this.pass.value
      }
      this.login.addUser(data).subscribe(response=>{
        if(response=='Email'){
          this.errmsg = "The email is already associated with an account."
        }
        else{
          console.log("Response is: ", response)
          this.router.navigate(['/']);
        }
      })
    }

  }

  redirectToSignIn(){
    this.router.navigate(['/']);

  }
}
