import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Predict30Component } from './predict30.component';

describe('Predict30Component', () => {
  let component: Predict30Component;
  let fixture: ComponentFixture<Predict30Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Predict30Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Predict30Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
