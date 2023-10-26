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
import { SimilarChartsComponent } from './similar-charts/similar-charts.component';

const routes: Routes = [
  {
		path: '', component: LoginComponent,
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
		path: 'advanced-charting', component: AdvancedChartingComponent,
	},
	{
		path: 'build', component: BuildComponent,
	},
	{
		path: 'basic-charting', component: HomeComponent,
	},
	{
		path: 'show-similar', component: SimilarChartsComponent,
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
