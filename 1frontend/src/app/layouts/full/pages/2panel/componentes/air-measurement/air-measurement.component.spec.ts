import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirMeasurementComponent } from './air-measurement.component';

describe('AirMeasurementComponent', () => {
  let component: AirMeasurementComponent;
  let fixture: ComponentFixture<AirMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
