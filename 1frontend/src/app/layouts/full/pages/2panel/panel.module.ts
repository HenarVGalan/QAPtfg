import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';

//import { Routes, RouterModule } from '@angular/router';
//import { ChartsModule } from 'ng2-charts';

//import { HighchartsChartComponent } from 'highcharts-angular';

import { AirMeasurementComponent } from './componentes/air-measurement/air-measurement.component';
import { AirMeasurementService } from './servicios/air-measurement.service';
import { O3Component } from './componentes/o3/o3.component'
import { O3Service } from './servicios/o3.service'


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
        AirMeasurementService,
        O3Service
    ],
    declarations: [
       // HighchartsChartComponent,
        AirMeasurementComponent,
        O3Component
    ]

})
export class PanelModule {

}
