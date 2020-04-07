import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
//import { ChartsModule } from 'ng2-charts';

import { HighchartsChartComponent } from 'highcharts-angular';


@NgModule({
    imports: [
        FormsModule, 
        CommonModule, 
        ],
        
    declarations: [
        
        HighchartsChartComponent
    ]
})
export class PanelModule {



    
 }
