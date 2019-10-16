
var random = function random() {
    return Math.round(Math.random() * 40);
  }; // eslint-disable-next-line no-unused-vars
  


function chart_Au(json, how) {
  console.log(json.data);
  var k18 = [],
      k14 = [],
      k12 = [],
      k9 = [];

  for (var i in json.data) {
    k18.push({
      t: json.data[i].t,
      y: json.data[i].y * .75
    });
  }

  for (var i in json.data) {
    k14.push({
      t: json.data[i].t,
      y: json.data[i].y * .585
    });
  }

  for (var i in json.data) {
    k12.push({
      t: json.data[i].t,
      y: json.data[i].y * .5
    });
  }

  for (var i in json.data) {
    k9.push({
      t: json.data[i].t,
      y: json.data[i].y * .375
    });
  }

  var chart = new Chart($('#canvas-1'), {
    type: 'line',
    data: {
      datasets: [{
        label: "24K",
        backgroundColor: "#ffc107",
        borderColor: "#ffc107",
        pointBackgroundColor: "#ffc107",
        fill: false,
        data: json.data
      }, {
        label: "18K",
        backgroundColor: 'rgba(151, 222, 205, 0.2)',
        borderColor: 'rgba(151, 222, 205, 1)',
        pointBackgroundColor: 'rgba(151, 222, 205, 1)',
        pointBorderColor: '#fff',
        fill: false,
        data: k18
      }, {
        label: "14K",
        backgroundColor: 'rgba(151, 187, 245, 0.2)',
        borderColor: 'rgba(151, 187, 245, 1)',
        pointBackgroundColor: 'rgba(151, 187, 245, 1)',
        pointBorderColor: '#fff',
        fill: false,
        data: k14
      }, {
        label: "12K",
        backgroundColor: 'rgba(51, 257, 205, 0.2)',
        borderColor: 'rgba(151, 187, 205, 1)',
        pointBackgroundColor: 'rgba(151, 187, 205, 1)',
        pointBorderColor: '#fff',
        fill: false,
        data: k12
      }, {
        label: "9K",
        backgroundColor: 'rgba(51, 187, 205, 0.2)',
        borderColor: 'rgba(51, 187, 205, 1)',
        pointBackgroundColor: 'rgba(51, 187, 205, 1)',
        pointBorderColor: '#fff',
        fill: false,
        data: k9
      }]
    },
    options: {
      responsive: true,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: how
          }
        }]
      }
    }
  });
}
var chartht='';
var thebody='';
var nlines=1;
function init_gold_chart() {
  chartht=$("#ceausescu").html();
  $('#iepocadeaur').val(0);
  rechartgold()
}

function rechartgold(){
  var v=$('#iepocadeaur').val();
  if(v==0){
    $.getJSON("/ws/au?mode=30y", function (data) {
      $("#ceausescu").html(chartht);
      chart_Au(data, "year");
    });  
  }else  if(v==1){
    $.getJSON("/ws/au?mode=3y", function (data) {
      $("#ceausescu").html(chartht);
      chart_Au(data, "month");
    });  
  }else  if(v==2){
    $.getJSON("/ws/au?mode=1y", function (data) {
      $("#ceausescu").html(chartht);
      chart_Au(data, "month");
    });  
  }else  if(v==3){
    $.getJSON("/ws/au?mode=1m", function (data) {
      $("#ceausescu").html(chartht);
      chart_Au(data, "day");
    });  
  }
}


  
  init_gold_chart();