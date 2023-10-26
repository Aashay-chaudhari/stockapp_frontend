import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, /* other http imports */ } from "@angular/common/http";
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { ChartsComponent } from './charts/charts.component';
import { PredictionComponent } from './prediction/prediction.component';
import { Predict30Component } from './predict30/predict30.component';
import {MatDialogModule} from '@angular/material/dialog';
import { HelloComponent } from './charts/hello.component'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SignalsComponent } from './signals/signals.component';
import { BuildComponent } from './build/build.component';
import { CheckComponent } from './check/check.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { CheckingComponent } from './checking/checking.component';
import { AdvancedChartingComponent } from './advanced-charting/advanced-charting.component';
import { AdvancedWatchlistComponent } from './advanced-watchlist/advanced-watchlist.component';
import { SimilarChartsComponent } from './similar-charts/similar-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    WatchlistComponent,
    ChartsComponent,
    PredictionComponent,
    Predict30Component,
    HelloComponent,
    SignalsComponent,
    BuildComponent,
    CheckComponent,
    CheckingComponent,
    AdvancedChartingComponent,
    AdvancedWatchlistComponent,
    SimilarChartsComponent,
  ],
  imports: [
    BrowserModule,
    NgApexchartsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
