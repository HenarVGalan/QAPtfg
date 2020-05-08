import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AirMeasurement } from '../modelos/air-measurement';

@Injectable({
  providedIn: 'root'
})
export class AirMeasurementService {

  readonly URL_API = 'http://localhost:3000/api/airMeasurement/pm10';

  selectedAirMeasurement: AirMeasurement;
  airMs : AirMeasurement[];

  constructor(private http: HttpClient) {
    //this.selectedAirMeasurement = new AirMeasurement();
  }

  /* getPM10_idStation(air: AirMeasurement ) {
    return this.http.get(this.URL_API+ `/${air.idStation}`);
  } */
  getPM10_idStation(idStation: String) {

    console.log(this.URL_API+ `/${idStation}`);
    return this.http.get(this.URL_API+ `/${idStation}`);

  }
}
