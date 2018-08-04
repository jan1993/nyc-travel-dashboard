import Highcharts from 'highcharts';

const ChartConfigs = {
    stepChart: {
        chart: {
            type: 'column'            
        },
        title: {
            text: null
        },
        xAxis: {
            categories: ['June 29th', 'June 30th', 'July 1st', 'July 2nd', 'July 3rd', 'July 4th', 'July 5th', 'July 6th']
        },
        yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value} Photos',
                },
                title: {
                    text: 'Photo Count'
                },
                opposite: true

            },
            { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Step Count'                    
                },
                labels: {
                    format: '{value} steps'                  
                }

            }
        ],

        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y;
            }
        },

        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },

        series: [{        
            yAxis: 1,
            name: "Step Count",
            stack: 'Steps',
            data: [23520, 20773, 20195, 15100, 21095, 15144, 17466, 19759],
        }, {            
            yAxis: 0,
            name: "Photo Count",
            stack: 'Photo',
            data: [500, 600, 700, 500, 600, 700, 500, 600],
        }]
    }
}

export default ChartConfigs;