import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AirMeasurementService } from '../../servicios/air-measurement.service';
import { AirMeasurement } from '../../modelos/air-measurement';

//import * as Highcharts from 'highcharts';
import * as Highcharts from 'highcharts/highstock';
//import{Highslide} from '../../../../../../../assets/highslide/src/assets/highslide';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
//import ('../../../../../../../assets/highslide/src/assets/highslide/highslide-full.min');


Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

var limite_bdiario_eea_who = 50;  //µg / m3
var limite_banual_eea = 40 //µg / m3
var limite_banual_who = 20 //µg / m3

@Component({
  selector: 'app-air-measurement',
  templateUrl: './air-measurement.component.html',
  styleUrls: ['./air-measurement.component.scss'],
  providers: [AirMeasurementService]
})
export class AirMeasurementComponent implements OnInit {

  series: any = [];
  constructor(public airMeasurementService: AirMeasurementService, public dialog: MatDialog) { }

  ngOnInit() {
    this.init_graph()
  }

  async init_graph() {
    await this.getAirMeasurement("Barrax");
    await this.getAirMeasurement("Gobierno");
    await this.getAirMeasurement("Poligono");
    await this.getAirMeasurement("Educacion")
    await this.getAirMeasurement("Universidad")
  }

  async getAirMeasurement(idStation: String) {
    await this.airMeasurementService.getPM10_idStation(idStation)
      .subscribe(res => {
        this.airMeasurementService.airMs = res as AirMeasurement[];
        this.series.push(res);
        this.options.series = this.series;
        Highcharts.stockChart('container', this.options);
        //Highcharts.chart('container', this.options);
        //  Highstock.chart('container', this.options);

      });
  }

  public options: any = {
    chart: {

      zoomType: 'xy',
      panning: true,
      panKey: 'shift',
      animation: true,
      resetZoomButton: {
        position: {
          x: -720,
          y: 370
        },
        //relativeTo: 'chart'
      },
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          chart: {
            height: 300
          },
          subtitle: {
            text: null
          },
          navigator: {
            enabled: false
          },
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          }
        }
      }]
    },
    title: {
      text: 'PM10'
    },
    navigation: {
      menuItemStyle: {
          fontWeight: 'normal',
          background: 'none'
      },
      menuItemHoverStyle: {
          fontWeight: 'bold',
          background: 'none',
          color: 'black'
      }
  },
    legend: {
      enabled: true,
      align: 'center',
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function (e) {

              /* this.dialog.openDialog(DialogPointgraphicComponent, {
                pageOrigin: {
                  x: e.pageX || e.clientX,
                  y: e.pageY || e.clientY
                },
                headingText: this.series.name,
                maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                  this.y + ' sessions',
                width: 200
              }) */
              /*htmlExpand(null, {
                pageOrigin: {
                  x: e.pageX || e.clientX,
                  y: e.pageY || e.clientY
                },
                headingText: this.series.name,
                maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                  this.y + ' sessions',
                width: 200
              })*/
            }
          }
        },
        marker: {
          lineWidth: 1
        }
      }
    },
    tooltip: {
      split: false,
      shared: true,
      dateTimeLabelFormats: {
        millisecond: ['%A %e, %b, %H:%M:%S.%L, %Y', '%A, %b %e, %H:%M:%S.%L', '%H:%M:%S.%L'],
        second: ['%A, %b %e, %H:%M:%S', '%A, %b %e, %H:%M:%S', '-* %H:%M:%S'],
        minute: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-** %H:%M'],
        hour: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-* %H:%M'],
        day: ['%A %e, %b, %Y', '%H:%M:%S'],
        week: ['Settimana del %d/%m/%Y', '%A, %b %e', '-** %A, %b %e, %Y'],
        month: ['%B %Y', '%B', '-*** %B %Y'],
        year: ['%Y', '%Y', '-** %Y']
      },
      distance: 25,
    },
    xAxis: {
     // spacingBottom: 300,
      type: 'datetime',
      align: 'center',

       labels: {
        align: 'center',

        y: 20,
        staggerLines: 2,
        formatter: function () {
          return Highcharts.dateFormat('%e %b %y %H:%M:%S', this.value);
        }
      },
    },
    yAxis: {
      labels: {
        format: '{value} µg/m3',
        align:'left'
    },

      plotBands: [{
        color: '#f8ff7936',
        from: 20,
        to: 40
      },
      {
        color: '#f1b15e54',
        from: 40,
        to: 50
      },
      {
        color: '#f1805e31',
        from: 50,
        to: 125,
      }],
      plotLines: [
        {
          value: limite_bdiario_eea_who,
          color: '#f1805e94',
          dashStyle: 'shortdash',
          width: 2,
          label: {
            verticalAlign: 'bottom',
            text: 'EAA WHO Batch Diario > 50 µg / m3'
          }
        },
        {
          value: limite_banual_eea,
          color: '#f1b15ec5',
          dashStyle: 'shortdash',
          width: 2,
          label: {
            text: 'EEA Batch Anual > 40 µg / m3'
          }
        },
        {
          value: limite_banual_who,
          color: '#FCFFC5',
          dashStyle: 'shortdash',
          width: 2,
          label: {
            text: 'WHO Batch Anual > 20 µg / m3'
          }
        }

      ]
    },
    series: [ ]

  }
}
@Component({
  selector: 'app-dialog-overview-example-dialog',
  template: ``
})
export class DialogPointgraphicComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogPointgraphicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
