



function dracu() {
  var formData = new FormData(document.getElementById('eform')); //alert("formdata formatted,sending")
debugger;
  $.ajax({
    url: '/ws/eval',
    type: 'POST',
    xhr: function xhr() {
      var myXhr = $.ajaxSettings.xhr();
      return myXhr;
    },
    success: function success(data) {
      //alert("Data Uploaded: "+data);
      //alert("success")
      document.getElementById("ecard").style.display = "block";
      var ejs = 0;
      ejs=data;
      chartit(ejs);
      var s = 'Valeur certifiée par Ephod';
      var dv = ejs.eur_from + " - " + ejs.eur_to + " &euro;";
      var z = "Toutes les informations nécessaires à l'inférence ont été détectées.";
      var pgc = "bg-success";
      var pg = 100;

      if (ejs.approx == 1) {
        s = "Bonne approximation";
        z = "L'inférence est partiellement basée sur les attributs les plus communs.";
        pgc = "bg-warning";
        pg = 67;
      }

      if (ejs.approx > 1) {
        s = "Approximation très brute";
        z = "L'inférence est plutôt basée sur les attributs les plus courants.";
        pgc = "bg-danger";
        pg = 33;
      }

      if (ejs.error == "dump") {
        s = "Approximation impossible - infos insuffisantes.";
        z = "pas assez d'éléments pour l'inférence";
        pg = 5;
        pgc = "bg-dark";
        dv = "?";
      }
      document.getElementById("ufile").value = ejs.ufile;
      document.getElementById("evalue").innerHTML = dv;
      document.getElementById("evaluecomment").innerHTML = s;
      document.getElementById("pgres").style.width = pg + "%";
      document.getElementById("pgres").className = "progress-bar " + pgc;
      document.getElementById("evaluecomment2").innerHTML = z;
      if($("#textarea-input").html()==""){
        $("#textarea-input").html(ejs.text);
      }
      console.log(ejs);
    },
    data: formData,
    cache: false,
    contentType: false,
    processData: false
  }).fail(function (jqXHR, textStatus) {
    alert("Request failed: " + textStatus); // alert(jqXHR)
  });
}



function chartit(props) {
  var chartColors = {
    yellow: "rgb(255, 205, 86)",
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)"
  };
  var color = Chart.helpers.color;
  document.getElementById('cacanvas').innerHTML = '<canvas id="canvas-6"> </canvas>';
  var polarAreaChart = new Chart($('#canvas-6'), {
    type: 'polarArea',
    data: {
      labels: ['Metal', 'Gemme', 'Marque', 'Style', 'État'],
      datasets: [{
        data: [props.dueto_metal, props.dueto_gem, props.dueto_brand, 0, 0],
        backgroundColor: [color(chartColors.orange).alpha(0.5).rgbString(), color(chartColors.blue).alpha(0.5).rgbString(), color(chartColors.green).alpha(0.5).rgbString(), color(chartColors.purple).alpha(0.5).rgbString(), color(chartColors.red).alpha(0.5).rgbString()]
      }]
    },
    options: {
      responsive: true
    }
  });
  console.log("charted.");
}
