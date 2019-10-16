// (C) 2019 EPHOD SAS all rights reserved | tous droits reservées
//author: marecl mateescu, 02/01/2019


function lpt1(){
    $.ajax({
      url: "/run/tpl.html",
      cache: false
    })
      .done(function( html ) {
        var r0=0;var r1=0;var rq=0;
        h1=html.substr(0,html.indexOf("<tbody>")+7)
        tbody=html.substring(html.indexOf("<tbody>")+7,html.indexOf("</tbody>"))
        h2=html.substr(html.indexOf("</tbody>"))
        tbb=''
        for (var i=1;i<=nlines;i++){
          try{
            
            var sc = "__"+i;
            
            dv=document.getElementById("badge"+sc).innerHTML;
            rq+=parseInt($("#claim-input__"+i).val())
            r0+=evlo[i]
            r1+=evhi[i]
            ffile='&nbsp;'
            if(ufiles[i].trim()!=''){
              ffile='<img src="/ws/img?file='+ufiles[i]+'"/>';
            }
            tbb+=tbody
                .replace('{FILE}',ffile)
                .replace('{NR}',i.toString())
                .replace('{DESCR}',$("#textarea-input__"+i).val())
                .replace('{DATEA}',deta($("#date-input__"+i).val()))
                .replace('{REQ}',$("#claim-input__"+i).val())
                .replace('{EVAL}',evlo[i]+' - '+evhi[i])
                              
          }catch{
           // console.log("catch "+i)
          }
        }
        html=h1+tbb+h2
        html=html.replace('{9999}',r0+' - '+r1+' &euro;')
        html=html.replace('{8888}',rq+' &euro;')
        html=html.replace('{DOSS}',$("#doss").val())
        html=html.replace('{DATE}',deta($("#ddate").val()))
        html=html.replace('{CLIENT}',$("#client").val())
  
        var newWin = open('about:blank','EPHOD - Report','height=600,width=1000');
        newWin.document.write(html);
        newWin.document.close()
      });
  }



function add1line(){
    nowbody=$("#thebody").html();
    nlines++;
    bbody=thebody.replace(/__1/g,"__"+nlines)
    bbody=bbody.replace("#1","#"+nlines)
    $("#thebody").append(bbody)
}

function delete1line(n){
    $("#thebodyrow"+n).remove()
}
var nevs=0;
var ufiles=[];
var evlo=[]
var evhi=[]
var var_i = 0;

function init_thebody(){
    thebody=$("#thebody").html();
    console.log(thebody)
}



function dracula(){//eval many
    $("#btn_eval").attr("disabled", "disabled");
    $("#btn_print").attr("disabled", "disabled");
    ufiles=[];
    evlo=[]
    evhi=[]
    nevs=0;
    for (i=1;i<=nlines;i++){
      ufiles.push('');
      evlo.push(0)
      evhi.push(0)
      
    }
    var_i=1;
    sequence_load();
  }
  
  function sequence_load(){
    var i = var_i;
    try{
      var sc = "__"+i;
      dv="évaluation...";
      s="attendez svp, sans rafraichir"
      pgc="secondary";
      document.getElementById("badge"+sc).innerHTML = dv;
      document.getElementById("badge"+sc).title = s;
      document.getElementById("badge"+sc).className = "badge badge-pill badge-" + pgc;
  
      var formData = new FormData(document.getElementById('eform__'+i)); //alert("formdata formatted,sending")
      nevs++;
      $.ajax({
        url: '/ws/eval',
        type: 'POST',
        xhr: function xhr() {
          var myXhr = $.ajaxSettings.xhr();
          return myXhr;
        },
        success: function success(data) {
          nevs--;
          var ejs = 0;
          ejs= data;
          var s = 'Valeur certifiée par Ephod';
          var dv = ejs.eur_from + " - " + ejs.eur_to + " &euro;";
          var z = "Toutes les informations nécessaires à l'inférence ont été détectées.";
          var pgc = "success";
          var pg = 100;
          
          if (ejs.approx == 1) {
            s = "Bonne approximation";
            z = "L'inférence est partiellement basée sur les attributs les plus communs.";
            pgc = "warning";
            pg = 67;
          }
    
          if (ejs.approx > 1) {
            s = "Approximation très brute";
            z = "L'inférence est plutôt basée sur les attributs les plus courants.";
            pgc = "danger";
            pg = 33;
          }
    
          if (ejs.error == "dump") {
            s = "Approximation impossible - infos insuffisantes.";
            z = "pas assez d'éléments pour l'inférence";
            pg = 5;
            pgc = "dark";
            dv = "?";
          }
    
          var sc = ejs.abscons;
          document.getElementById("badge"+sc).innerHTML = dv;
          document.getElementById("badge"+sc).title = s;
          document.getElementById("badge"+sc).className = "badge badge-pill badge-" + pgc;
          var ii=parseInt(sc.replace('__',''))
          ufiles[ii]='';
          if(typeof(ejs.ufile)!="undefined"){
            ufiles[ii]=ejs.ufile;
          }
          evlo[ii]=ejs.eur_from
          evhi[ii]=ejs.eur_to
          console.log(ejs);
  
          if(nevs==0){
            $("#btn_eval").removeAttr("disabled");
            $("#btn_print").removeAttr("disabled");
          }
  
          var_i++;
          sequence_load()
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false
      }).fail(function (jqXHR, textStatus) {
        alert("Echec: " + textStatus); // alert(jqXHR)
        nevs--;
        var sc = "__"+var_i;
        document.getElementById("badge"+sc).innerHTML = 'erreur !' ;
        document.getElementById("badge"+sc).title = 'Erreur moteur IA';
        document.getElementById("badge"+sc).className = "badge badge-pill badge-dark";
        var_i++;
        sequence_load()
      });
  
    }catch{
      console.log("catch "+i)
    }
  
  }
  
  
function dsave(){
    var dn='';
    dn=$("#doss").val()+' / '+$("#ddate").val()+' [ '+$("#client").val()+' ]';
    dn=prompt("Sauvgarder sous ...",dn)
    ufiles=[];
    evlo=[]
    evhi=[]
    nevs=0;
    for (i=1;i<=nlines;i++){
      ufiles.push('');
      evlo.push(0)
      evhi.push(0)
      
    }      
}
//EXECUTE
init_thebody();