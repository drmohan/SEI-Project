var bpms = [],
    data = {},
    avg = [],
    aboveAvg = [],
    belowAvg = [],
    belowAvgLower = 0,
    belowAvgUpper = 0,
    avgLower = 0,
    avgUpper = 0,
    aboveAvgLower = 0,
    aboveAvgUpper = 0;


$(document).ready(function () {

  Highcharts.chart('chart-container', {

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
                pointStart: Number(data[Object.keys(data)[0]].time),
                pointInterval: Number(data[Object.keys(data)[1]].time) - Number(data[Object.keys(data)[0]].time),
                point: {
                    events: {
                        mouseOver: function (e) {
                            x: e.pageX || e.clientX
                            y: e.pageY || e.clientY

                            var vid = document.getElementById("myVideo");
                            vid.currentTime = this.x;

                            var bpmContainer = document.getElementById("bpm-container")
                            bpmContainer.style.display = "";

                            var bpm = document.getElementById("bpm");
                            bpm.textContent = this.y;

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
        }
        ,
        {
            name: 'Range',
            data: belowAvg,
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: '#B22222',
            fillOpacity: 0.2,
            zIndex: 0
        },
        {
            name: 'Range',
            data: avg,
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: '#99b799',
            fillOpacity: 0.2,
            zIndex: -1
        },
        {
            name: 'Range',
            data: aboveAvg,
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
  localStorage.age = getParameterByName('age');
  localStorage.gender = getParameterByName('dropdown');

  var lines = allText.split("\n");

  for (var i=1; i<lines.length; i++) {
    l = lines[i-1];
    l = l.split(",");
    frame = l[0];
    bpm = Number(l[2]);
    time = l[3];
    data[frame] = {'bpm':bpm, 'time':time};
    bpms.push(bpm);

  }

  var start = Number(data[Object.keys(data)[0]].time);
  var diff = Number(data[Object.keys(data)[1]].time) - Number(data[Object.keys(data)[0]].time);
  var age = localStorage.age;
  var gender = localStorage.gender;
  var rangeValues = getRanges(Number(age), gender);

  for(var n=0; n<lines.length; n++){
    aboveAvg.push([start, rangeValues.aboveAvgLower, rangeValues.aboveAvgUpper]);
    avg.push([start, rangeValues.avgLower, rangeValues.avgUpper]);
    belowAvg.push([start, rangeValues.belowAvgLower, rangeValues.belowAvgUpper]);
    start += diff;
  }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getRanges(age, gender){

  var belowAvgLower = 76;
  var belowAvgUpper = 82;
  var avgLower = 71;
  var avgUpper = 75;
  var aboveAvgLower = 67;
  var aboveAvgUpper = 70;

  if( gender == "M" ){
    if( age >= 18 && age <= 25 ){
      belowAvgLower = 74;
      belowAvgUpper = 81;
      avgLower = 70;
      avgUpper = 73;
      aboveAvgLower = 66;
      aboveAvgUpper = 69;
    }
    else if( age >= 26 && age <= 35 ){
      belowAvgLower = 75;
      belowAvgUpper = 81;
      avgLower = 71;
      avgUpper = 74;
      aboveAvgLower = 66;
      aboveAvgUpper = 70;
    }
    else if( age >= 36 && age <= 45 ){
      belowAvgLower = 76;
      belowAvgUpper = 82;
      avgLower = 71;
      avgUpper = 75;
      aboveAvgLower = 67;
      aboveAvgUpper = 70;
    }
    else if( age >= 46 && age <= 55 ){
      belowAvgLower = 77;
      belowAvgUpper = 83;
      avgLower = 72;
      avgUpper = 76;
      aboveAvgLower = 68;
      aboveAvgUpper = 71;
    }
    else if( age >= 56 && age <= 65 ){
      belowAvgLower = 76;
      belowAvgUpper = 81;
      avgLower = 72;
      avgUpper = 75;
      aboveAvgLower = 68;
      aboveAvgUpper = 71;
    }
    else if( age > 65 ){
      belowAvgLower = 74;
      belowAvgUpper = 79;
      avgLower = 70;
      avgUpper = 73;
      aboveAvgLower = 66;
      aboveAvgUpper = 79;
    }
  }
  else{
    if( age >= 18 && age <= 25 ){
      belowAvgLower = 79;
      belowAvgUpper = 84;
      avgLower = 74;
      avgUpper = 78;
      aboveAvgLower = 70;
      aboveAvgUpper = 73;
    }
    else if( age >= 26 && age <= 35 ){
      belowAvgLower = 77;
      belowAvgUpper = 82;
      avgLower = 73;
      avgUpper = 76;
      aboveAvgLower = 69;
      aboveAvgUpper = 72;
    }
    else if( age >= 36 && age <= 45 ){
      belowAvgLower = 79;
      belowAvgUpper = 84;
      avgLower = 74;
      avgUpper = 78;
      aboveAvgLower = 70;
      aboveAvgUpper = 73;
    }
    else if( age >= 46 && age <= 55 ){
      belowAvgLower = 78;
      belowAvgUpper = 83;
      avgLower = 74;
      avgUpper = 77;
      aboveAvgLower = 70;
      aboveAvgUpper = 73;
    }
    else if( age >= 56 && age <= 65 ){
      belowAvgLower = 78;
      belowAvgUpper = 83;
      avgLower = 74;
      avgUpper = 77;
      aboveAvgLower = 69;
      aboveAvgUpper = 73;
    }
    else if( age > 65 ){
      belowAvgLower = 77;
      belowAvgUpper = 84;
      avgLower = 73;
      avgUpper = 76;
      aboveAvgLower = 69;
      aboveAvgUpper = 72;
    }
  }
  return {
    belowAvgLower: belowAvgLower,
    belowAvgUpper: belowAvgUpper,
    avgLower: avgLower,
    avgUpper: avgUpper,
    aboveAvgLower: aboveAvgLower,
    aboveAvgUpper: aboveAvgUpper
  };

}
