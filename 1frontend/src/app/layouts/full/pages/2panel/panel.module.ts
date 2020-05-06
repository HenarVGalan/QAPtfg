import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { Routes, RouterModule } from '@angular/router';
//import { ChartsModule } from 'ng2-charts';

import { HighchartsChartComponent } from 'highcharts-angular';

import { AirMeasurementComponent } from './air-measurement/air-measurement.component';
import { AirMeasurementListComponent } from './air-measurement/air-measurement-list/air-measurement-list.component';
import { AirMeasurementDetailsComponent } from './air-measurement/air-measurement-details/air-measurement-details.component';

import { HttpModule } from '@angular/http';

import { AirMeasurementService } from './air-measurement/air-measurement.service'
//import { PM10Module } from './pm10/pm10.module';



@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        BrowserModule,
        FlexLayoutModule,
        HttpModule

    ],
    providers: [
        AirMeasurementService
    ],
    declarations: [
        HighchartsChartComponent,
        AirMeasurementComponent,
        AirMeasurementListComponent,
        AirMeasurementDetailsComponent
    ]

})
export class PanelModule {

}
