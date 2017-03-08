var bpms = [];
var data = {};

$(document).ready(function () {


  Highcharts.chart('container', {

      title: {
          text: 'Beats per Minute'
      },

      // subtitle: {
      //     text: 'Source: thesolarfoundation.com'
      // },

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
          data: bpms
      }]

  });
});


function processData(allText) {
  console.log("in processData");
  var lines = allText.split("\n");
  // data = {}
  // bpms = []
  for (var i=1; i<lines.length; i++) {
    l = lines[i-1];
    l = l.split(",");
    frame = l[0];
    bpm = Number(l[2]);
    time = l[3];
    data[frame] = {'bpm':bpm, 'time':time};
    bpms.push(bpm);
    // console.log(bpms);

  }



}
