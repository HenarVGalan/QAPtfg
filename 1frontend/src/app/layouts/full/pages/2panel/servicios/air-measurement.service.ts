import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { AirMeasurement } from '../modelos/air-measurement';

@Injectable({
  providedIn: 'root'
})
export class AirMeasurementService {

  readonly URL_API = 'http://localhost:3000/api/airMeasurement';

  selectedAirMeasurement: AirMeasurement;
  airMs: AirMeasurement[];
  seriesPM10: Object;

  constructor(private http: HttpClient) {
    this.selectedAirMeasurement = new AirMeasurement();
  }
  //Obtiene todo AirMeasurement
  getAirMeasurement() {
    return this.http.get(this.URL_API);
  }

  getPM10(idStation: String) {
    return this.http.get(this.URL_API + '/pm10/' + idStation);
  }

  getPM10_idStation(idStation: String): Observable<AirMeasurement[]> {
    return this.http.get<AirMeasurement[]>(this.URL_API + `/pm10/${idStation}`)
    .do(data => console.log('Prueba datos: '+  JSON.stringify(data)))
   // .do(data => console.log('Prueba datos: '+  data))
    .catch(this.handleError);
  }
  private handleError( err : HttpErrorResponse){
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
