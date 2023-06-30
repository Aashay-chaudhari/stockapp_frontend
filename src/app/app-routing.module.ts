import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildComponent } from './build/build.component';
import { CheckComponent } from './check/check.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CheckingComponent } from './checking/checking.component';
import { AdvancedChartingComponent } from './advanced-charting/advanced-charting.component';

const routes: Routes = [
  {
		path: '', component: HomeComponent,
	},
	{
		path: 'check', component: CheckComponent,
	},
  {
		path: 'createUser', component: CreateUserComponent,
	},
  {
		path: 'dashboard', component: DashboardComponent,
	},
	{
		path: 'advanced', component: AdvancedChartingComponent,
	},
	{
		path: 'build', component: BuildComponent,
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
