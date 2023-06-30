import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedWatchlistComponent } from './advanced-watchlist.component';

describe('AdvancedWatchlistComponent', () => {
  let component: AdvancedWatchlistComponent;
  let fixture: ComponentFixture<AdvancedWatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedWatchlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
