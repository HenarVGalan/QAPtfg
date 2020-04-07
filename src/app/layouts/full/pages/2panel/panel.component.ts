/* Highcharts.chart('container', {

    chart: {
        scrollablePlotArea: {
            minWidth: 700
        }
    },

    data: {
        csvURL: 'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/analytics.csv',
        beforeParse: function (csv) {
            return csv.replace(/\n\n/g, '\n');
        }
    },

    title: {
        text: 'Daily sessions at www.highcharts.com'
    },

    subtitle: {
        text: 'Source: Google Analytics'
    },

    xAxis: {
        tickInterval: 7 * 24 * 3600 * 1000, // one week
        tickWidth: 0,
        gridLineWidth: 1,
        labels: {
            align: 'left',
            x: 3,
            y: -3
        }
    },

    yAxis: [{ // left y axis
        title: {
            text: null
        },
        labels: {
            align: 'left',
            x: 3,
            y: 16,
            format: '{value:.,0f}'
        },
        showFirstLabel: false
    }, { // right y axis
        linkedTo: 0,
        gridLineWidth: 0,
        opposite: true,
        title: {
            text: null
        },
        labels: {
            align: 'right',
            x: -3,
            y: 16,
            format: '{value:.,0f}'
        },
        showFirstLabel: false
    }],

    legend: {
        align: 'left',
        verticalAlign: 'top',
        borderWidth: 0
    },

    tooltip: {
        shared: true,
        crosshairs: true
    },

    plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function (e) {
                        hs.htmlExpand(null, {
                            pageOrigin: {
                                x: e.pageX || e.clientX,
                                y: e.pageY || e.clientY
                            },
                            headingText: this.series.name,
                            maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                this.y + ' sessions',
                            width: 200
                        });
                    }
                }
            },
            marker: {
                lineWidth: 1
            }
        }
    },

    series: [{
        name: 'All sessions',
        lineWidth: 4,
        marker: {
            radius: 4
        }
    }, {
        name: 'New users'
    }]
}); */

import { Component } from '@angular/core';
/* import { Chart } from 'angular-highcharts';*/

import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
var limite = 1;
@Component({
    selector: 'panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']

})

export class PanelComponent {
     
    
    public options: any = {
        chart: {
          type: 'line',
          height: 500
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
        tooltip: {
          formatter: function() {
            return 'x: ' + Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x) +
              '  y: ' + this.y.toFixed(2);
          }
        },
        xAxis: {
          type: 'datetime',
          labels: {
            formatter: function() {
              return Highcharts.dateFormat('%e %b %y', this.value);
            }
          }
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: limite,
                color: 'red',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: 'Límite > 50 µg / m3'
                }
            }]
        },
        series: [
          {
            name: 'Estación 1',
            turboThreshold: 500000,
            data: [
                [new Date('2018-01-25 18:38:31').getTime(), 2],
                [new Date('2018-01-17 18:38:31').getTime(), 1]
            ]
          },
          {
            name: 'Estación 2',
            turboThreshold: 500000,
            data: [[new Date('2018-02-05 18:38:31').getTime(), 7]]
          }
        ],
      }
      constructor() { }
    
      ngOnInit(){
        Highcharts.chart('container', this.options);
      }
}


