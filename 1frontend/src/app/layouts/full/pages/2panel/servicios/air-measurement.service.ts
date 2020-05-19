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
  seriesPM10 : Object;

  constructor(private http: HttpClient) {
    this.selectedAirMeasurement = new AirMeasurement();
  }
  //Obtiene todo AirMeasurement
  getAirMeasurement(){
    return this.http.get(this.URL_API);
  }

  getPM10_idStation(idStation: String) {
    return this.http.get(this.URL_API+'/pm10/'+idStation);
  }

  getPM10_idStation2(idStation: String) {

    console.log(this.URL_API+ `/pm10/${idStation}`);
    return this.http.get(this.URL_API+ `/pm10/${idStation}`);

  }
}
