import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');


Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
var limite1 = 48614.1863730758;
var limite2 = 50000.1863730758;

@Component({
  selector: 'app-pm10',
  templateUrl: './pm10.component.html',
  styleUrls: ['./pm10.component.scss']
})
export class PM10Component implements OnInit {


  public options: any = {
    /*    data: {
         csvURL: 'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/analytics.csv',
         beforeParse: function (csv) {
             return csv.replace(/\n\n/g, '\n');
         }
     }, */
    chart: {
      zoomType : 'xy',
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
              alert('Category: hola');

           /*    hs.htmlExpand(null, {
                  pageOrigin: {
                      x: e.pageX || e.clientX,
                      y: e.pageY || e.clientY
                  },
                  headingText: this.series.name,
                  maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                      this.y + ' sessions',
                  width: 200
              }); */
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
    series: [
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
    ],
  }


  constructor() { }

  ngOnInit() {
    Highcharts.chart('container', this.options);
  }


}
