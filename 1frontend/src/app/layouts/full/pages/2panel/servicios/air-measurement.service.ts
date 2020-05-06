import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AirMeasurement } from '../modelos/air-measurement';

@Injectable({
  providedIn: 'root'
})
export class AirMeasurementService {
  
  readonly URL_API = 'http://localhost:3000/api/airMeasurement';
 
  selectedAirMeasurement: AirMeasurement;
  airMs : AirMeasurement[];

  constructor(private http: HttpClient) {
    this.selectedAirMeasurement = new AirMeasurement();
  }

  getAirMeasurements() {
    return this.http.get(this.URL_API);
  }
}
