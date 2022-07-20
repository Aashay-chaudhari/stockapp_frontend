import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
		path: '', component: LoginComponent,
	},
  {
		path: 'createUser', component: CreateUserComponent,
	},
  {
		path: 'dashboard', component: DashboardComponent,
	},
	{
		path: 'home', component: HomeComponent,
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
