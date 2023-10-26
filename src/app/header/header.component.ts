import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { StoreDataService } from 'src/services/store-data.service';
import { ChartsComponent } from '../charts/charts.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class HeaderComponent implements OnInit {
  resetHome(){
    this.store_data.updateResetHome(true)
    this.router.navigate(['/basic-charting']);
    this.chartsComponent.destroyChart()
    localStorage.setItem("us_stock", "false")

  }
  constructor(private store_data : StoreDataService,
    private chartsComponent: ChartsComponent,
    private router: Router) { }

  ngOnInit(): void {
  }
  goToAdvanced(){
    console.log("Inside go to advanced")
    localStorage.setItem("us_stock", "true")
    this.router.navigate(['/advanced-charting']);
  }
  goToBasic(){
    this.store_data.updateResetHome(true)
    localStorage.setItem("us_stock", "false")
    this.router.navigate(['/basic-charting']);
    this.chartsComponent.destroyChart()
  }
  logout(){
    this.store_data.logout();
    this.router.navigate(['/']);

  }
}
