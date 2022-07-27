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
    this.router.navigate(['/home']);
    this.chartsComponent.destroyChart()
  }
  constructor(private store_data : StoreDataService,
    private chartsComponent: ChartsComponent,
    private router: Router) { }

  ngOnInit(): void {
  }

}
