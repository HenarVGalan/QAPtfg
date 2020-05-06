import { Component, OnInit } from '@angular/core';

import { AirMeasurementService } from '../../servicios/air-measurement.service';
import { AirMeasurement } from '../../modelos/air-measurement';

@Component({
  selector: 'app-air-measurement',
  templateUrl: './air-measurement.component.html',
  styleUrls: ['./air-measurement.component.scss'],
  providers: [ AirMeasurementService ]
})
export class AirMeasurementComponent implements OnInit {

  constructor(private airMeasurementService: AirMeasurementService) { }

  ngOnInit(): void {
    this.getAirMeasurements();
  }

  getAirMeasurements() {
    this.airMeasurementService.getAirMeasurements()
      .subscribe(res => {
        this.airMeasurementService.airMs = res as AirMeasurement[];
      });

  }
}
