import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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

  /*
  router.get('/pm10/:idStation', airM.getAirMeasurement_pm10);
  router.get('/pm10/batchDiario/:idStation', airM.getAirMeasurement_pm10_batchdiario);
  router.get('/pm10/batchAnual/:idStation', airM.getAirMeasurement_pm10_batchanual);
  */
  getPM10_idStation(idStation: String): Observable<AirMeasurement[]> {
    return this.http.get<AirMeasurement[]>(this.URL_API + `/pm10/${idStation}`)
    .do(data => console.log('Prueba datos: '+  JSON.stringify(data)))
    .catch(this.handleError);
  }
  //getAirMeasurement_pm10_batchdiario
  getPM10_idStation_BatchDiario(idStation: String): Observable<AirMeasurement[]> {
    return this.http.get<AirMeasurement[]>(this.URL_API + `/pm10/batchDiario/${idStation}`)
    .do(data => console.log('Prueba datos Batch Diario: '+  JSON.stringify(data)))
    .catch(this.handleError);
  }
  private handleError( err : HttpErrorResponse){
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
