var bpms = [],
    data = {},
    ranges = [],
    ranges2 = [],
    ranges3 = [],
    lowerLimit = 73,
    upperLimit = 84;

$(document).ready(function () {

  Highcharts.chart('container', {

      title: {
          text: 'Beats per Minute'
      },

      yAxis: {
          title: {
              text: 'Beats Per Minute'
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },

      plotOptions: {

            series: {
                cursor: 'pointer',
                pointStart: 500,
                point: {
                    events: {
                        mouseOver: function (e) {
                            x: e.pageX || e.clientX
                            y: e.pageY || e.clientY
                            // console.log(data[this.x]);
                            setCurTime(data[this.x].time);
                        }
                    }
                },
                marker: {
                    lineWidth: 1
                }
          }

      },
      series: [{
          name: 'BPM',
          data: bpms,
          color: '#000000'
        },
        {
            name: 'Range',
            data: ranges,
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: '#99b799',
            fillOpacity: 0.2,
            zIndex: 0
        },
        {
            name: 'Range',
            data: ranges2,
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: '#B22222',
            fillOpacity: 0.2,
            zIndex: -1
        },
        {
            name: 'Range',
            data: ranges3,
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: '#99b799',
            fillOpacity: 0.4,
            zIndex: -1
        }]

  });
});


function processData(allText) {
  console.log("in processData");
  var lines = allText.split("\n");

  for (var i=1; i<lines.length; i++) {
    l = lines[i-1];
    l = l.split(",");
    frame = l[0];
    bpm = Number(l[2]);
    time = l[3];
    data[frame] = {'bpm':bpm, 'time':time};
    bpms.push(bpm);
    // 73=average, 84=below average
    ranges.push([Number(frame), lowerLimit, upperLimit]);
    ranges2.push([Number(frame), 84, 95]);
    ranges3.push([Number(frame), 70, 73]);

  // console.log(ranges);

  }



}
