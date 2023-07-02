import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarChartsComponent } from './similar-charts.component';

describe('SimilarChartsComponent', () => {
  let component: SimilarChartsComponent;
  let fixture: ComponentFixture<SimilarChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimilarChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimilarChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
