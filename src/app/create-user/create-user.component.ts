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
  createUser(){
    if(this.name.value == ''){
      this.errmsg = "The username can not be empty."
    }else if(this.pass.value == ''){
      this.errmsg = "The password can not be empty."
    }else{
      let data = {
        "name" : this.name.value,
        "password" : this.pass.value
      }
      this.login.addUser(data).subscribe(response=>{
        console.log("Response is: ", response)
        this.router.navigate(['/']);
      })
    }

  }

  redirectToSignIn(){
    this.router.navigate(['/']);

  }
}
