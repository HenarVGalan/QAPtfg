import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { ButtonsComponent } from './buttons/buttons.component';

import { GridComponent } from './grid/grid.component';
import { ListsComponent } from './lists/lists.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import {
  DialogComponent,
  DialogOverviewExampleDialogComponent
} from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';

import { InicioComponent } from '../layouts/full/pages/0inicio/inicio.component';
import { InfoComponent } from '../layouts/full/pages/1info/info.component';

import { ConsultaComponent } from '../layouts/full/pages/3consulta/consulta.component';

import { PanelComponent } from '../layouts/full/pages/2panel/panel.component';
import { PM10Component } from '../layouts/full/pages/2panel/componentes/pm10/pm10.component';
import { AirMeasurementComponent } from '../layouts/full/pages/2panel/componentes/air-measurement/air-measurement.component';
import { AirMeasurementService } from '../layouts/full/pages/2panel/servicios/air-measurement.service'
import { O3Component } from '../layouts/full/pages/2panel/componentes/o3/o3.component';
import { O3Service } from '../layouts/full/pages/2panel/servicios/o3.service'


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [
    AirMeasurementService,
    O3Service
  ],
  entryComponents: [DialogOverviewExampleDialogComponent],
  declarations: [
    InicioComponent,
    InfoComponent,
    PanelComponent,
    PM10Component,
    AirMeasurementComponent,
    O3Component,
    ConsultaComponent,
    ButtonsComponent,
    GridComponent,
    ListsComponent,
    MenuComponent,
    TabsComponent,
    StepperComponent,
    ExpansionComponent,
    ChipsComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    ProgressComponent,
    DialogComponent,
    DialogOverviewExampleDialogComponent,
    TooltipComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent
  ]
})
export class MaterialComponentsModule {}
