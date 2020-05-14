import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AirMeasurementService } from '../../servicios/air-measurement.service';
import { AirMeasurement } from '../../modelos/air-measurement';

import * as Highcharts from 'highcharts';
import { interval, Subscription } from 'rxjs';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

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

  constructor(public airMeasurementService: AirMeasurementService) { }

  ngOnInit(): void {

    // console.log('air-measurement Component:'+this.getPM10idstation('Gobierno'));
    // this.getPM10idstation('Gobierno');
    //this.options.series[1]['data'] = this.getAirMeasurement('Gobierno');
    //this.options.series[1].data = this.getPM10idstation('Universidad');
    //this.options.series[0].data =this.getAirMeasurement('Gobierno');
    //this.options.series[0].data =  this.getAirMeasurement('estacion3');
    //this.options.series[0].data = this.getAirMeasurement('estacion3');
    this.getAirMeasurement('estacion3');
    Highcharts.chart('container', this.options);

  }

  getAirMeasurement(idStation: String) {
    this.airMeasurementService.getPM10_idStation(idStation)
      .subscribe(res => {
        this.airMeasurementService.airMs = res as AirMeasurement[];
      });

  }

  public options: any = {

    data: {
      //table: 'datos'
      /*  csvURL: 'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/analytics.csv',
       beforeParse: function (csv) {
         return csv.replace(/\n\n/g, '\n');
       } */
    },
    chart: {
      //renderTo: 'Container',
      zoomType: 'xy',
      panning: true,
      panKey: 'shift',
      resetZoomButton: {
        position: {
          // align: 'right', // by default
          // verticalAlign: 'top', // by default
          x: 0,
          y: -30
        }
      },
      scrollablePlotArea: {
        minWidth: 1000
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
    tooltip: {
      distance: 25,
      shared: true,
      crosshairs: true,
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
      labels: {
        align: 'left',
        x: 3,
        y: -3,
        formatter: function () {
          return Highcharts.dateFormat('%e %b %y %H:%M:%S', this.value);
        }
      },
    },
    yAxis: {
      title: {
        text: ''
      },
      plotBands: [{
        color: '#f8ff7965',
        from: 20,
        to: 40
      },
      {
        color: '#f1b25e81',
        from: 40,
        to: 50
      },
      {
        color: '#f1805e86',
        from: 50,
        to: 70,
      }],
      plotLines: [
        {
          value: limite_bdiario_eea_who,
          color: 'red',
          dashStyle: 'shortdash',
          width: 2,
          label: {
            verticalAlign: 'bottom',
            text: 'EAA WHO Batch Diario > 50 µg / m3'
          }
        },
        {
          value: limite_banual_eea,
          color: 'orange',
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
/*     series: [
      {
        name: 'Barrax',
        data: []
      },
      {
        name: 'Gobierno',
        data: []
      }
    ] */
    //series: JSON.parse('hj'),
     series: [
       {
         name: 'Barrax',
         data: [
           [Date.UTC(2019, 12, 11, 7, 0, 0, 0), 50],
           [Date.UTC(2019, 12, 11, 8, 0, 0, 0), 30],
           [Date.UTC(2019, 12, 11, 9, 0, 0, 0), 12],
           [Date.UTC(2019, 12, 11, 10, 0, 0, 0), 25]
         ]
       },
       {
         name: 'Gobierno',
         data: [
           [Date.UTC(2019, 12, 11, 7, 0, 0, 0), 23],
           [Date.UTC(2019, 12, 11, 8, 0, 0, 0), 10],
           [Date.UTC(2019, 12, 11, 9, 0, 0, 0), 15],
           [Date.UTC(2019, 12, 11, 10, 0, 0, 0), 45]]
       }
     ]
    /*    series: [
         {
           name: 'Barrax',
           data: [
             [new Date('2019-12-11 09:00:00').getTime(), 50],
             [new Date('2019-12-11 08:00:00').getTime(), 30],
             [new Date('2019-12-11 07:00:00').getTime(), 12],
             [new Date('2019-12-11 06:00:00').getTime(), 25]
           ]
         },
         {
           name: 'Gobierno',
           data: [
             [new Date('2019-12-11 09:00:00').getTime(), 23],
             [new Date('2019-12-11 08:00:00').getTime(), 10],
             [new Date('2019-12-11 07:00:00').getTime(), 15],
             [new Date('2019-12-11 06:00:00').getTime(), 45]]
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
    /* series: [
      {
        name: 'Gobierno',
        turboThreshold: 500000,

      },
      {
        name: 'Universidad',
        turboThreshold: 500000,

      }
    ] */
  }
}
