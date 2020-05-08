import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AirMeasurementService } from '../../servicios/air-measurement.service';
import { AirMeasurement } from '../../modelos/air-measurement';

import * as Highcharts from 'highcharts';
import { interval, Subscription } from 'rxjs';
/* var hs =  'https://www.highcharts.com/media/com_demo/js/highslide-full.min.js';
<script src="https://www.highcharts.com/media/com_demo/js/highslide-full.min.js"></script>
<script src="https://www.highcharts.com/media/com_demo/js/highslide.config.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="https://www.highcharts.com/media/com_demo/css/highslide.css" /> */
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

/* EEA
limites: "> 50 µg / m3", ventana: "Batch. Diario"
limites: "> 40 µg / m3", ventana: "Batch. Anual
WHO
limites: "> 50 µg / m3", ventana: "Batch. Diario"
"> 20 µg / m3", ventana: "Batch. Anual" */
var limite1 = 48614.1863730758;
var limite2 = 50000.1863730758;

@Component({
  selector: 'app-air-measurement',
  templateUrl: './air-measurement.component.html',
  styleUrls: ['./air-measurement.component.scss'],
  providers: [AirMeasurementService]
})
export class AirMeasurementComponent implements OnInit {

  constructor(
    private airMeasurementService: AirMeasurementService,
    private http: HttpClient
  ) { }
  subscription: Subscription;

  ngOnInit(): void {

    console.log('air-measurement Component:'+this.getPM10idstation('Gobierno'));

    this.options.series[0]['data'] = this.getPM10idstation('Gobierno');
    this.options.series[1].data = this.getPM10idstation('Universidad');
    Highcharts.chart('container', this.options);
    // this.getAirMeasurements();
  }

  getPM10idstation(idStation: String) {
    this.airMeasurementService.getPM10_idStation(idStation)
      .subscribe(res => {
        this.airMeasurementService.airMs = res as AirMeasurement[];
      });

  }

  public options: any = {

  /*    data: {
       csvURL: 'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/analytics.csv',
       beforeParse: function (csv) {
         return csv.replace(/\n\n/g, '\n');
       }
     }, */
    chart: {
      renderTo: 'container',
      scrollablePlotArea: {
        minWidth: 700
      }
    },
    title: {
      text: 'PM10'
    },
    subtitle: {
      text: ''
    },
    credits: {
      enabled: false
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    // plotOptions: {
    //   series: {
    //     label: {
    //       connectorAllowed: false
    //     },
    //   }
    // },
    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function (e) {
              /*
                               hs.htmlExpand(null, {
                                   pageOrigin: {
                                       x: e.pageX || e.clientX,
                                       y: e.pageY || e.clientY
                                   },
                                   headingText: this.series.name,
                                   maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                       this.y + ' sessions',
                                   width: 200
                               });*/
            }
          }
        },
        marker: {
          lineWidth: 1
        }
      }
    },
    /*     tooltip: {
          formatter: function () {
            return 'Hora: ' + Highcharts.dateFormat('%H:%M:%S ', this.x) +
              ' valor: ' + this.y.toFixed(2);
          }
        }, */
    tooltip: {
      shared: true,
      crosshairs: true,
      // xDateFormat: '%e %b %y - %H:%M:%S',
      /*  dateTimeLabelFormats: {
         hour: ['%A, %b %e, %H:%M.'],
       } */
      dateTimeLabelFormats: {
        millisecond: ['%A, %b %e, %H:%M:%S.%L', '%A, %b %e, %H:%M:%S.%L', '* %H:%M:%S.%L'],
        second: ['%A, %b %e, %H:%M:%S', '%A, %b %e, %H:%M:%S', '-* %H:%M:%S'],
        minute: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-** %H:%M'],
        hour: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-*** %H:%M'],
        day: ['%A %e, %b, %Y', ' %H:%M:%S'],
        week: ['Settimana del %d/%m/%Y', '%A, %b %e', '-**** %A, %b %e, %Y'],
        month: ['%B %Y', '%B', '-***** %B %Y'],
        year: ['%Y', '%Y', '-****** %Y']
      }
    },
    xAxis: {
      type: 'datetime',
      align: 'left',
      x: 3,
      y: -3,
      tickWidth: 1,
      labels: {
        align: 'left',
        x: 3,
        y: -3,
        formatter: function () {
          return Highcharts.dateFormat('%e %b %y %H:%M:%S', this.value);
        }
      },
      accessibility: {
        rangeDescription: 'Range: 2010 to 2017'
      },

    },
    yAxis: {
      title: {
        text: ''
      },
      showFirstLabel: false,
      // gridLineWidth: 1,
      plotLines: [
        {
          value: limite1,
          color: 'red',
          dashStyle: 'shortdash',
          width: 2,
          label: {
            text: 'Límite > 120 µg / m3'
          }
        },
        {
          value: limite2,
          color: 'pink',
          dashStyle: 'shortdash',
          width: 2,
          label: {
            text: 'Límite > 300 µg / m3'
          }
        }

      ]
    },
    /* series: [
      {
        name: 'Barrax',

        data: [
          [new Date('2019-12-11 09:00:00').getTime(), 48614.1863730758],
          [new Date('2019-12-11 08:00:00').getTime(), 50814.8663438682],
          [new Date('2019-12-11 07:00:00').getTime(), 48335.8498499774],
          [new Date('2019-12-11 06:00:00').getTime(), 48491.236721052]
        ]
      },
      {
        name: 'Gobierno',

        data: [
          [new Date('2019-12-11 09:30:00').getTime(), 48614.1863730758],
          [new Date('2019-12-11 08:30:00').getTime(), 50814.8663438682],
          [new Date('2019-12-11 08:00:00').getTime(), 50814.8663438682],

          [new Date('2019-12-11 07:30:00').getTime(), 48335.8498499774],
          [new Date('2019-12-11 06:30:00').getTime(), 48491.236721052]]
      }
    ] */
    /*   series: [{
        name: 'All sessions',
        lineWidth: 4,
        marker: {
          radius: 4
        }
      }, {
        name: 'New users'
      }] */
    series: [
      {
        name: 'Gobierno',
        turboThreshold: 500000,

      },
      {
        name: 'Universidad',
        turboThreshold: 500000,

      }
    ]
  }




}
