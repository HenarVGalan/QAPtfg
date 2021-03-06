import { Component, OnInit, Inject } from '@angular/core';
import { AirMeasurementService } from '../../servicios/air-measurement.service';
import { AirMeasurement } from '../../modelos/air-measurement';
import * as $ from 'jquery';

import * as Highcharts from 'highcharts/highstock';

declare const hs: any;

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

//var $report = $('#report');



@Component({
  selector: 'app-air-measurement',
  templateUrl: './air-measurement.component.html',
  styleUrls: ['./air-measurement.component.scss'],
  providers: [AirMeasurementService]
})
export class AirMeasurementComponent implements OnInit {

  series: any = [];
  seriesBatchDiario: any = [];
  seriesBatchAnual: any = [];


  constructor(public airMeasurementService: AirMeasurementService) { }

  ngOnInit() {
    this.init_graph()
  }

  async init_graph() {
    /*
         await this.getAirMeasurement("Barrax");
         await this.getAirMeasurement("Gobierno");
         await this.getAirMeasurement("Poligono");
         await this.getAirMeasurement("Educacion")
         await this.getAirMeasurement("Universidad")
     */
    await this.getBatchDiario("Barrax");
    await this.getBatchDiario("Gobierno");
    await this.getBatchDiario("Poligono");
    await this.getBatchDiario("Educacion");
    await this.getBatchDiario("Universidad");

    await this.getBatchAnual("Barrax");
    await this.getBatchAnual("Gobierno");
    await this.getBatchAnual("Poligono");
    await this.getBatchAnual("Educacion")
    await this.getBatchAnual("Universidad");


  }

  async getAirMeasurement(idStation: String) {
    await this.airMeasurementService.getPM10_idStation(idStation)
      .subscribe(res => {
        this.airMeasurementService.airMs = res as AirMeasurement[];
        this.series.push(res);
        this.options.series = this.series;
        this.options.navigator.series = this.series;
        this.options.title.text = 'normal';
        // Highcharts.seriesTypes.line.prototype.drawLegendSymbol
        Highcharts.stockChart('container', this.options);
        //Highcharts.chart('container', this.options);
        //  Highstock.chart('container', this.options);

      });
  }
  //por ahora solo pm10
  async getBatchDiario(idStation: String) {
    await this.airMeasurementService.getPM10_idStation_BatchDiario(idStation)
      .subscribe(res => {
        this.airMeasurementService.airMs = res as AirMeasurement[];
        this.seriesBatchDiario.push(res);
        this.options.series = this.seriesBatchDiario;
        this.options.navigator.enabled = true;
        this.options.navigator.series = this.seriesBatchDiario;
        this.options.title.text = 'PM10 Batch Diario';
        Highcharts.stockChart('containerBatchDiario', this.options);
      });
  }
  //getPM10_idStation_BatchAnual
  async getBatchAnual(idStation: String) {
    await this.airMeasurementService.getPM10_idStation_BatchAnual(idStation)
      .subscribe(res => {
        this.airMeasurementService.airMs = res as AirMeasurement[];
        this.seriesBatchAnual.push(res);
        this.options.series = this.seriesBatchAnual;
        this.options.title.text = 'PM10 Batch Anual';
        this.options.navigator.enabled = false;
        Highcharts.stockChart('containerBatchAnual', this.options);
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
        relativeTo: 'chart',
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
            layout: 'horizontal',
          }
        }
      }]
    },
    title: {
      text: ''
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
    navigator: {
      series: []
    },
    scrollbar: {
      // liveRedraw: false,
      barBackgroundColor: '#bdbdbd',
      barBorderRadius: 5,
      barBorderWidth: 0,
      buttonBackgroundColor: '#bdbdbd',
      buttonBorderWidth: 0,
      buttonBorderRadius: 5,
      trackBackgroundColor: 'none',
      trackBorderWidth: 1,
      trackBorderRadius: 8,
      trackBorderColor: '#CCC'
    },
    legend: {
      enabled: true,
      align: 'center',
      squareSymbol: false,
      itemStyle: {
        fontSize: 15,
      },
      symbolWidth: 30,
      symbolHeight: 30,

      /*       symbolPadding: 10,
            symbolWidth:30,
            symbolHeight: 30,
            symbolRadius: 30,
            symbolPadding: 20,
            symbolWidth: 50, */
    },
    plotOptions: {
      series: {
        //lineWidth: 3,
        cursor: 'pointer',
        point: {
          events: {
            click: function (e) {
              hs.htmlExpand(null, {
                pageOrigin: {
                  x: e.pageX || e.clientX,
                  y: e.pageY || e.clientY
                },
                headingText: this.series.name + ' ' +  this.title,
                //%H:%M:%S.%L
                maincontentText: Highcharts.dateFormat('%A %e, %b', this.x) + '<br/>PM10: ' +
                  this.y + ' µg/m3',
                width: 200
              })
            }
          }
        },
        marker: {
          enabled: true,
          enabledThreshold: 5,
          width: 16,
          height: 16,
          //fillColor: 'red',
          radius: 4,
          lineColor: '#f3f1f162',
          lineWidth: 2,

        }
      }
    },
    tooltip: {
      split: false,
      shared: true,
      dateTimeLabelFormats: {
        millisecond: ['%H:%M:%S.%L <br/> %A %e, %b, , %Y', '%A, %b %e, %H:%M:%S.%L', '%H:%M:%S.%L'],
        second: ['%A %e, %b %Y <br/> %H:%M:%S', '%A, %b %e, %H:%M:%S.%L', '%H:%M:%S.%L'],
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
      type: 'datetime',
      align: 'center',
      labels: {
        align: 'center',
        y: 20,
        staggerLines: 2,
        formatter: function () {
          return Highcharts.dateFormat('%e %b %Y', this.value);
        }
      },
    },
    yAxis: {
      labels: {
        format: '{value} µg/m3',
        align: 'left'
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
        to: 1500,
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
    series: []

  }
}

