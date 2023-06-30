import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedChartingComponent } from './advanced-charting.component';

describe('AdvancedChartingComponent', () => {
  let component: AdvancedChartingComponent;
  let fixture: ComponentFixture<AdvancedChartingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedChartingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedChartingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
