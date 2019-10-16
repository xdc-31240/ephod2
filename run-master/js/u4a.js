var fa = '';
var fc = '';
var fp = '';
var des = '';
var False = false;
var True = true;

var imgf = "https://ephod.ai/logo.png";
var imgc = imgf;
var imgp = imgf;

$("#div-step2").hide();
$("#div-step3").hide();
//$("input[type='number']").inputSpinner();
var magnifiermoving = true;
var glass = false;
var nestemate = ['Actinolite', 'Agate', 'Alexandrite', 'Allanite', 'Ambre', 'Améthyste', 'Ammolite', 'Andalousite', 'Anglésite', 'Apatite', 'Apophyllite', 'Bleu vert', 'Aragonite', 'Axinite', 'Azurite', 'Barytine', 'Benitoite', 'Béryl', 'Brésilien', 'Bytownite', 'Calcite', 'Célestine', 'Célestite', 'Cerussite', 'Chambersite', 'Chrysobéryl', 'Chrysocolle', 'Chrysoprase', 'Cinabre', 'Citrine', 'Diamants Colorés', 'Perles de conque', 'Corail', 'Crocoite', 'Cuprite', 'Danburite', 'Datolite', 'Diaspore', 'Diopside', 'Enstatite', 'Épidote', 'Fluorine', 'Grenat', 'Quartz', 'Iolite', 'Kunzite', 'Lapis', 'Lazuli', 'Malachite', 'Moissanite', 'Moldavite', 'Morganite', 'Pierre de lune', 'Opale', 'Oregon', 'Péridot', 'Phenakite', 'Quartz', 'Rhodochrosite', 'Saphirine', 'Scapolite', 'Sphalérite', 'Spinelle', 'Sugilite', 'Sunstone', 'Tanzanite', 'Titanite', 'Topaze', 'Tourmaline', 'Turquoise', 'Wulfénite'];

function magnify(imgID, zoom) {
    var img, w, h, bw;
    img = document.getElementById(imgID);

    /* Create magnifier glass: */
    if (!glass) {
        glass = document.createElement("DIV");
        img.parentElement.insertBefore(glass, img);
        glass.addEventListener("mousemove", moveMagnifier);
        img.addEventListener("mousemove", moveMagnifier);
        glass.addEventListener("mousedown", clickMagnifier);
        img.addEventListener("mousedown", clickMagnifier);
        /*and also for touch screens:*/
        glass.addEventListener("touchmove", moveMagnifier);
        img.addEventListener("touchmove", moveMagnifier);

    }
    glass.setAttribute("class", "img-magnifier-glass");

    /* Insert magnifier glass: */


    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    /* Execute a function when someone moves the magnifier glass over the image: */


    function clickMagnifier(e) {
        magnifiermoving = !magnifiermoving;
        console.log("mag moving:=")
        console.log(magnifiermoving)
        if (magnifiermoving) {
            glass.style.cursor = "none"
        } else {
            glass.style.cursor = "move"
        }
    }

    function moveMagnifier(e) {
        if (!magnifiermoving) {
            return;
        }
        var pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /* Prevent the magnifier glass from being positioned outside the image: */
        if (x > img.width - (w / zoom)) {
            x = img.width - (w / zoom);
        }
        if (x < w / zoom) {
            x = w / zoom;
        }
        if (y > img.height - (h / zoom)) {
            y = img.height - (h / zoom);
        }
        if (y < h / zoom) {
            y = h / zoom;
        }
        /* Set the position of the magnifier glass: */
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /* Display what the magnifier glass "sees": */
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0,
            y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {
            x: x,
            y: y
        };
    }
}

function carusel(tabname) {
    $('#tabFacture').removeClass("active")
    $('#tabCertificat').removeClass("active")
    $('#tabPhoto').removeClass("active")
    $('#tabDescr').removeClass("active"); //disabled
    $('#' + tabname).addClass("active")
    I = document.getElementById("myimage")
    I.onload = resizemagnify;
    switch (tabname) {
        case "tabFacture":
            $("#myimage").prop('src', imgf)
            $("#txt_descr").hide()
            $("#myimage").show()
            if (glass) glass.style.display = "block"
            break
        case "tabCertificat":
            $("#myimage").prop('src', imgc)
            $("#txt_descr").hide()
            $("#myimage").show()
            if (glass) glass.style.display = "block"
            break
        case "tabPhoto":
            $("#myimage").prop('src', imgp)
            $("#txt_descr").hide()
            $("#myimage").show()
            if (glass) glass.style.display = "block"
            break
        case "tabDescr":
            $("#myimage").hide()
            $("#txt_descr").show()
            if (glass) glass.style.display = "none"
            break
    }
}

function resizemagnify() {
    w = $("#myimage").width()
    h = $("#myimage").height()
    if ((fa == "") && (fc == "") && (fp == "")) {
        if (glass) glass.style.display = "none"
        return;
    }
    console.log(w, h)
    if (w <= 0) {
        setTimeout("resizemagnify()", 100);
        return;
    }
    if (w > h) {
        if (w > 300) {
            $("#myimage").width(300);
        }
    }
    if (w <= h) {
        if (h > 400) {
            $("#myimage").height(400);
        }
    }

    magnify("myimage", 3);
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
            labels: ['Metal', 'Gemme', 'Marque', 'État'],
            datasets: [{
                data: [props.dueto_metal, props.dueto_gem, props.dueto_brand, 0, 0],
                backgroundColor: [color(chartColors.orange).alpha(0.5).rgbString(), color(chartColors.blue).alpha(
                        0.5).rgbString(), color(chartColors.green).alpha(0.5).rgbString(),
                    color(chartColors.red).alpha(0.5).rgbString()
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
    //polarAreaChart.height = 350;
    polarAreaChart.update();
    console.log("charted.");

}


function dracu(ufile, des = "", abscons = "__1") {
    var formData = new FormData();
    if (ufile != "") {
        formData.append('ufile', ufile);
    } else {
        formData.append('textarea-input', des)
    }
    formData.append('abscons', abscons)
    $.ajax({
        url: '/ws/eval',
        type: 'POST',
        xhr: function xhr() {
            var myXhr = $.ajaxSettings.xhr();
            return myXhr;
        },
        success: bangSuccess,
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus); // alert(jqXHR)
    });
}

var eva_d = {},
    eva_f = {},
    eva_c = {},
    eva_t = {};
var Alerts = [];

function bangSuccess(data) {
    console.log(data)
    switch (data.abscons) {
        case "__0":
            eva_d = data;
            break;
        case "__1":
            eva_f = data;
            break;
        case "__2":
            eva_c = data;
            break;
    }
    if (todo_d && (!eva_d)) {
        return
    }
    if (todo_f && (!eva_f)) {
        return
    }
    if (todo_c && (!eva_c)) {
        return
    }
    //consolidate

    Alerts = [];
    var docstrong = "";
    if (eva_c) {
        eva = eva_c;
        carusel("tabCertificat")
        docstrong = "Certificat"
    } else {
        if (eva_f) {
            eva = eva_f;
            carusel("tabFacture")
            docstrong = "Facture"
        } else {
            eva = eva_d;
            carusel("tabDescr")
            docstrong = "Description"
        }
    }
    Alerts.push({
        "field": "doc",
        "err": "info",
        "msg": "Evaluation basée sur : " + docstrong
    })
    allTogoether(eva);



    deltaeva(eva_f, eva_c, "certificat", "facture")
    deltaeva(eva_d, eva_c, "certificat", "description")
    deltaeva(eva_f, eva_d, "description", "facture")
    dowarnings(eva);
    if (Alerts.length > 0) {
        var al = Alerts.length - 1
        $("#wpill1").html(al.toString()).show()
        $("#wpill2").html(al.toString()).show()
    } else {
        $("#wpill1").html(Alerts.length.toString()).hide()
        $("#wpill2").html(Alerts.length.toString()).hide()
        var A = $(".app")
        A[0].classList.remove("aside-menu-show")
    }
    var ht = `
    <div class="list-group-item list-group-item-accent-%0 list-group-item-divider">
        <div class="avatar float-right">%1</div>
        <small>%2  </small>
    </div>`;
    var hta = `<div class="list-group-item list-group-item-accent-secondary 
                bg-light text-center font-weight-bold text-muted text-uppercase small" >Alertes</div>
                `;
    debugger;
    for (ia in Alerts) {
        var s = ht;
        var a = Alerts[ia];
        s = s.replace("%0", a.err).replace("%2", a.msg)
        var sym = "";
        switch (a.field) {
            case "weight_g":
            case "metal":
            case "conc":
                sym = '<span class="nav-icon fa fa-balance-scale"></span>';
                break;
            case "num_gems":
                sym = '<i class="nav-icon icon-diamond"></i>'
                break
            case "brand":
                sym = '<i class="nav-icon icon-trophy"></i>'
                break
        }
        s = s.replace("%1", sym)
        hta += s + "\n";
    }
    var A = $(".app")
    A[0].classList.add("aside-menu-show")
    if (Alerts.length > 0) {

        $("#div-alerts").html(hta);
    } else {
        A[0].classList.remove("aside-menu-show")
    }
}
String.prototype.toSentenceCase = function () {

    var stringArray = this.split(" ");

    for (var index = 0; index < stringArray.length; index++) {

        stringArray[index] = stringArray[index].substr(0,1).toUpperCase() + stringArray[index].substr(1).toLowerCase();
    }
    return stringArray.join(" ");
}
var toFR = {
    "weight_g": "poids(g)",
    "purity": "pureté",
    "color": "couleur",
    "cut": "taille",
    "conc":"alliage (mil.)",
    "carats": "carats"
}
function dowarnings(eva) {
    if (('defaults' in eva.alloy[0]) && (eva.alloy[0].defaults.length > 0)) {
        for (i in eva.alloy[0].defaults) {
            var D = eva.alloy[0].defaults[i]
            var msg = "%1 manquante, default: %2.";

            msg = msg.replace("%1", toFR[D].toSentenceCase())
            var vd = ""
            if (D == "weight_g") {
                vd = eva.weight_g.toString()
            } else {
                vd=eva.alloy[0][D].toString();
            }
            msg = msg.replace("%2", vd)

            Alerts.push({
                "field": D,
                "err": "warning",
                "msg": msg
            })
        }
    }
    if (eva.num_gems > 0) {
        for (g = 1; g <= 4; g++) {
            if ("gem" + g.toString() in eva) {
                var G = eva["gem" + g.toString()]
                if (('defaults' in G) && (G.defaults.length > 0)) {
                    for (i in G.defaults) {
                        var D = G.defaults[i]
                        var msg = "<strong>Gem#%9 (%0)</strong> %1 manquante, default: %2.";
                        msg = msg.replace("%9", g.toString())
                        msg = msg.replace("%0", G.type)
                        msg = msg.replace("%1", toFR[D].toSentenceCase())
                        var vd = G[D].toString();
                        msg = msg.replace("%2", vd)
                        Alerts.push({
                            "field": D,
                            "err": "warning",
                            "msg": msg
                        })
                    }
                }
            }
        }
    }
}

function isDefault(eva, field, gem = "") {
    if (field == "weigth_g") {
        if (("defaults" in eva.alloy[0]) && (field in eva.alloy[0].defaults)) {
            return true;
        }
    }
    if (field in ["conc", "metal"]) {
        if (("defaults" in eva.alloy[0]) && (field in eva.alloy[0].defaults)) {
            return true;
        }
    }
    if (field == "brand") {
        if (("defaults" in eva.brand) && (field in eva.brand.defaults)) {
            return true;
        }
    }
    if (gem == "") {
        return false; //??
    }
    if (("defaults" in eva[gem]) && (field in eva[gem].defaults)) {
        return true;
    }
    return false;
}

function deltaeva(eva1, eva2, t1, t2) {
    if (eva2 && eva1) {
        if ((eva2.weight_g != eva1.weight_g) && (eva2.weight_g > 0) && (eva1.weight_g > 0)) {
            var msg = "Poids sur %3 <b>%1</b>g different du poids sur %4 <b>%2</b>g.";
            msg = msg.replace("%1", eva2.weight_g.toString())
            msg = msg.replace("%2", eva1.weight_g.toString())
            msg = msg.replace("%3", t1).replace("%4", t2)

            Alerts.push({
                "field": "weight_g",
                "err": "danger",
                "msg": msg
            })
        }
        if ((eva2.alloy[0].metal != eva1.alloy[0].metal) && (eva2.alloy[0].metal != "")) {
            if (eva1.alloy[0].metal != "") {
                var msg = "Métal sur %3 <b>%1</b> different du cela sur %4 <b>%2</b>";
                msg = msg.replace("%1", eva2.alloy[0].metal)
                msg = msg.replace("%2", eva1.alloy[0].metal)
                msg = msg.replace("%3", t1).replace("%4", t2)
                Alerts.push({
                    "field": "metal",
                    "err": "danger",
                    "msg": msg
                })
            }
        }
        if ((eva2.alloy[0].conc != eva1.alloy[0].conc) && (eva2.alloy[0].conc > 0)) {
            if ((eva1.alloy[0].conc > 0) && (!isDefault(eva1, "conc")) && (!isDefault(eva2, "conc"))) {
                var msg = "Karats métal sur %3 <b>%1</b> different du cela sur %4 <b>%2</b>";
                msg = msg.replace("%1", eva2.alloy[0].conc.toString())
                msg = msg.replace("%2", eva1.alloy[0].conc.toString())
                msg = msg.replace("%3", t1).replace("%4", t2)
                Alerts.push({
                    "field": "conc",
                    "err": "danger",
                    "msg": msg
                })
            }
        }
        if ((eva2.brand.brand != eva1.brand.brand) && (eva2.brand.brand != "")) {
            if ((eva1.brand.brand != "") && (!isDefault(eva1, "brand")) && (!isDefault(eva2, "brand"))) {
                var msg = "Marque sur %3 <b>%1</b> differente de cela sur %4 <b>%2</b>";
                msg = msg.replace("%1", eva2.brand.brand)
                msg = msg.replace("%2", eva1.brand.brand)
                msg = msg.replace("%3", t1).replace("%4", t2)
                Alerts.push({
                    "field": "brand",
                    "err": "danger",
                    "msg": msg
                })
            }
        }
        if ((eva2.num_gems != eva1.num_gems) && (eva2.num_gems > 0)) {
            if (eva1.num_gems > 0) {
                var msg = "Nombre gemmes sur %3 <b>%1</b> different de cela sur %4 <b>%2</b>";
                msg = msg.replace("%1", eva2.num_gems)
                msg = msg.replace("%2", eva1.num_gems)
                msg = msg.replace("%3", t1).replace("%4", t2)
                Alerts.push({
                    "field": "num_gems",
                    "err": "danger",
                    "msg": msg
                })
            }
        }
        if ((eva2.num_gems > 0) && (eva1.num_gems > 0)) {
            if (eva2.gem1.type != eva1.gem1.type) {
                var msg = "Gemme #1 sur %3 <b>%1</b> different de cela sur %4 <b>%2</b>";
                msg = msg.replace("%1", eva2.gem1.type)
                msg = msg.replace("%2", eva1.gem1.type)
                msg = msg.replace("%3", t1).replace("%4", t2)
                Alerts.push({
                    "field": "gem1.type",
                    "err": "danger",
                    "msg": msg
                })
            }
            if (eva2.gem1.carats != eva1.gem1.carats) {
                var msg = "Carats gemme #1 sur %3 <b>%1</b> different de cela sur %4 <b>%2</b>";
                msg = msg.replace("%1", eva2.gem1.carats)
                msg = msg.replace("%2", eva1.gem1.carats)
                msg = msg.replace("%3", t1).replace("%4", t2)
                Alerts.push({
                    "field": "gem1.carats",
                    "err": "danger",
                    "msg": msg
                })
            }
            if ((eva2.gem1.purity != eva1.gem1.purity) && (!isDefault(eva1, "purity")) && (!isDefault(eva2, "purity"))) {
                var msg = "Clareté gemme #1 sur %3 <b>%1</b> differente de cela sur %4 <b>%2</b>";
                msg = msg.replace("%1", eva2.gem1.purity)
                msg = msg.replace("%2", eva1.gem1.purity)
                msg = msg.replace("%3", t1).replace("%4", t2)
                Alerts.push({
                    "field": "gem1.purity",
                    "err": "danger",
                    "msg": msg
                })
            }
            if ((eva2.gem1.color != eva1.gem1.color) && (!isDefault(eva1, "color")) && (!isDefault(eva2, "color"))) {
                var msg = "Couleur gemme #1 sur %3 <b>%1</b> differente de cela sur %4 <b>%2</b>";
                msg = msg.replace("%1", eva2.gem1.color)
                msg = msg.replace("%2", eva1.gem1.color)
                msg = msg.replace("%3", t1).replace("%4", t2)
                Alerts.push({
                    "field": "gem1.color",
                    "err": "danger",
                    "msg": msg
                })
            }
        }
    }
}


function allTogoether(data) {
    //alert("Data Uploaded: "+data);
    //alert("success")
    $("#div-step1").hide();
    $("#div-step2").hide();
    $("#div-step3").show();
    if (fa + fc + fp != "") {
        magnify("myimage", 3);
    } else {
        if (glass) {
            glass.style.display = "none";
        }
    }

    document.getElementById("ecard").style.display = "block";
    var ejs = 0;
    ejs = data;
    chartit(ejs);
    var s = 'Valeur determinée par Ephod';
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
    ///document.getElementById("ufile").value = ejs.ufile;
    document.getElementById("evalue").innerHTML = dv;
    document.getElementById("evaluecomment").innerHTML = s;
    document.getElementById("pgres").style.width = pg + "%";
    document.getElementById("pgres").className = "progress-bar " + pgc;
    document.getElementById("evaluecomment2").innerHTML = z;
    if ($("#textarea-input").html() == "") {
        $("#textarea-input").html(ejs.text);
    }
    console.log(ejs);
    edpoids = document.getElementById("ed_poids")
    edpoids.setAttribute('value', ejs["weight_g"]);

    $("#card_gem1").hide();
    $("#card_gem2").hide();
    //      $("#card_gem3").hide();
    //      $("#card_gem4").hide();
    //debugger;
    var mtl = ejs.alloy[0]['metal'];
    $("#cb_metal").val(mtl);
    //n-y $("#cb_metal").selectpicker('val', mtl);
    //n-y $("#cb_metal").selectpicker('refresh');
    $("#eur_metal").html(Math.round(ejs["metal_eur"]).toString() + " €");
    var conc = ejs.alloy[0]['conc'];
    var CB = document.getElementById("cb_karat");
    for (io = 0; io < CB.options.length; io++) {
        o = CB.options[io];
        if (o.value.toLowerCase() == conc.toString()) {
            CB.selectedIndex = io;
            CB.value = o.value;
            //n-y $("#cb_karat").selectpicker('val', o.value);
            //n-y $("#cb_karat").selectpicker('refresh');

            break;
        }
    }

    for (g = 1; g <= ejs["num_gems"]; g++) {
        if (!("gem" + g.toString() in ejs)) {
            continue;
        }
        var gtype = ejs["gem" + g.toString()]["type"];

        $("#cb_gem" + g.toString() + "_type").val(gtype);
        if (gtype == "diamant") {
            $('#' + "cb_gem" + g.toString() + "_color").show(); ////n-y selectpicker("show")
            $('#' + "cb_gem" + g.toString() + "_clarity").show(); //n-y selectpicker("show")
            $('#' + "cb_gem" + g.toString() + "_cut").show();
        } else {
            $('#' + "cb_gem" + g.toString() + "_color").hide(); //n-y selectpicker("hide")
            $('#' + "cb_gem" + g.toString() + "_clarity").hide(); //n-y selectpicker("hide")
            $('#' + "cb_gem" + g.toString() + "_cut").hide();
        }
        $("#ed_gem" + g.toString() + "_ct").val(ejs["gem" + g.toString()]["carats"]);
        $("#eur_gem" + g.toString()).html(Math.round((ejs["gem" + g.toString()]["val_from"] + ejs["gem" + g.toString()]["val_to"]) / 2).toString() + " €");
        $("#card_gem" + g.toString()).show();
    }


}

$(document).ready(function () {
    console.log("page fully loaded, init ui :  STEP1");
    $('.file_upload').file_upload();
    $("#file_facture").change(function () {
        console.log('facture file changed!');
        var file_data = $('#file_facture').prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        form_data.append('nature', 'facture');
        fa = '*';
        $.ajax({
            url: '/ws/upload',
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function (data) {
                console.log(data);
                //$("#h2facture").html('<i class="fab fa-mixcloud"></i>');
                var ejs;
                q = "ejs=" + data;
                eval(q)
                fa = ejs["files"][0]["url"];
            }
        }); //ajax upload facture

    }); //filefactur_changed

    $("#file_certificat").change(function () {
        console.log('certificat file changed!');
        var file_data = $('#file_certificat').prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        form_data.append('nature', 'certificat');
        fc = '*';
        $.ajax({
            url: '/ws/upload',
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function (data) {
                console.log(data);
                //$("#h2certificat").html('<i class="fab fa-mixcloud"></i>');
                var ejs;
                q = "ejs=" + data;
                eval(q)
                fc = ejs["files"][0]["url"];
            }
        }); //ajax upload certificat

    }); //file certificat_changed


    $("#file_photo").change(function () {
        console.log('photo file changed!');
        var file_data = $('#file_photo').prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        form_data.append('nature', 'photo');
        form_data.append('skipocr', 'TRUE');
        fp = '*';
        $.ajax({
            url: '/ws/upload',
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function (data) {
                console.log(data);
                //$("#h2photo").html('<i class="fab fa-mixcloud"></i>');
                var ejs;
                q = "ejs=" + data;
                eval(q)
                fp = ejs["files"][0]["url"];
            }
        }); //ajax upload photo

    }); //file photo_changed


    console.log("0. hide sidebar")
    $(".sidebar-minimizer").click();

    console.log("2. ephod");
    // get reference to select element
    var gembox = document.getElementById('cb_gem1_type');
    for (ig in nestemate) {
        g = nestemate[ig]
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(g));
        opt.value = g.toLowerCase();
        gembox.appendChild(opt);
    }
    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode("Perle c. Tahiti"));
    opt.value = "pc_tahiti";
    gembox.appendChild(opt);
    var gemscontainer = document.getElementById("gemscontainer")
    var gem1card = document.getElementById("card_gem1")
    var gemtpl = gem1card.innerHTML;
    for (i = 2; i <= 4; i++) {
        var gemx = document.createElement('div');
        var ht = gemtpl.replace(/_gem1/g, "_gem" + i.toString());
        gemx.classList.add("card")
        gemx.classList.add("m-1")
        gemx.innerHTML = ht
        gemx.id = "card_gem" + i.toString()
        gemscontainer.appendChild(gemx)
        $("#" + gemx.id).hide()
    }
    //not yet  $('.zelectpicker').selectpicker();
    // initEphod();
})

function gotogold() {
    debugger;
    var nw = window.location.href.split('#')[0] + '#base/au.html';
    window.location.href = nw;
    $("#a_au").click();
}

function kill(gemid) {
    $("#card" + gemid).hide()
}

function summon() {
    for (i = 1; i <= 4; i++) {
        var card_id = "card_gem" + i.toString()
        if (!($("#" + card_id).is(":visible"))) {
            $("#" + card_id).show()
            break;
        }
    }
}

function reeval() {
    var json = {
        "weight_g": 1.43,
        "alloy": [{
            "metal": "or",
            "type": "blanc",
            "conc": 750
        }],
        "tdd": 0,
        "brand": {
            "brand": "-",
            "factor": 1
        },
        "approx": 0,
        "num_gems": 0,
        "error": "ok",
        "lang": "fr",
        "text": "unk"
    }
    edpoids = document.getElementById("ed_poids")
    json["weight_g"] = parseFloat(edpoids.value);
    json["alloy"][0]["metal"] = $("#cb_metal").val()
    json["alloy"][0]["conc"] = $("#cb_karat").val()

    for (g = 1; g <= 4; g++) {
        var gg = g.toString()
        var card_id = "card_gem" + gg
        if ($("#" + card_id).is(":visible")) {
            json["num_gems"]++;
            var gemnr = "gem" + json["num_gems"].toString()
            json[gemnr] = {}
            json[gemnr]["type"] = $("#cb_gem" + gg + "_type").val()
            json[gemnr]["carats"] = parseFloat($("#ed_gem" + gg + "_ct").val())
            json[gemnr]["color"] = $("#cb_gem" + gg + "_color").val()
            json[gemnr]["cut"] = $("#cb_gem" + gg + "_cut").val()
            json[gemnr]["purity"] = $("#cb_gem" + gg + "_clarity").val()

        }
    }
    console.log(json)

    var formData = new FormData();
    formData.append('propsjson', JSON.stringify(json));

    $.ajax({
        url: '/ws/eval',
        type: 'POST',
        xhr: function xhr() {
            var myXhr = $.ajaxSettings.xhr();
            return myXhr;
        },
        success: bangSuccess,
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus); // alert(jqXHR)
    });
}
des = '';

function ephod0() {
    $("#wpill1").html(Alerts.length.toString()).hide()
    $("#wpill2").html(Alerts.length.toString()).hide()
    var A = $(".app")
    A[0].classList.remove("aside-menu-show")
    $("#div-step1").show();
    $("#div-step2").hide();
    $("#div-step3").hide();

}

function fname(fup) {
    fake_path = document.getElementById(fup).value
    return fake_path.split("\\").pop()
}

function ephod() {
    $("#div-step1").hide();
    $("#div-step2").show();

    xfa = fname("file_facture");
    xfc = fname("file_certificat");
    xfp = fname("file_photo");
    if ((fa != "") && xfa == "") {
        fa = "";
    }
    if ((fc != "") && xfc == "") {
        fc = "";
    }
    if ((fp != "") && xfp == "") {
        fp = "";
    }
}

function ephod2() {
    /*
    if(!($("#ck_gdpr").is(":checked"))){
        alert("Veuillez accepter les termes RGPD pour continuer");
        return;
    }
    if($("#ed_buydate").val()==""){
        alert("Veuillez saisir la date d'entrée en possession");
        return;
    }
    */
    if ((fc == "*") || (fp == "*") || (fa == "*")) {
        $.LoadingOverlay("show");
        console.log("waiting for uploads to finish")
        setTimeout("ephod2()", 500);
        return;
    }
    console.log("all uploads finished")
    fa = fa.replace("/ws/img?file=", "")
    fc = fc.replace("/ws/img?file=", "")
    fp = fp.replace("/ws/img?file=", "")
    des = $("#ed_descr").val()

    console.log("1. glass");
    $.LoadingOverlay("hide");
    initEphod();
}
var todo_f = False;
var todo_c = False;
var todo_p = False;
var todo_d = False;

function initEphod() {
    /*des = getUrlParameter('d')[0];
    fa = getUrlParameter('ff')[0];
    fc = getUrlParameter('fc')[0];
    fp = getUrlParameter('fp')[0];*/
    imgf = "/ws/img?file=" + fa;
    imgc = "/ws/img?file=" + fc;
    imgp = "/ws/img?file=" + fp;
    eva_d = false;
    eva_f = false;
    eva_c = false;
    $('#tabFacture').show()
    $('#tabCertificat').show()
    $('#tabPhoto').show()
    $('#tabDesc').show()
    if ($("#ed_descr").val() == "") {
        $('#tabDesc').hide()
    } else {
        todo_d = True;
        dracu("", $("#ed_descr").val(), "__0")
    }
    $("#txt_descr").hide()
    $("#txt_descr").html($("#ed_descr").val())
    if (fa == "") {
        $('#tabFacture').hide()
    }
    if (fc == "") {
        $('#tabCertificat').hide()
    }
    if (fp == "") {
        $('#tabPhoto').hide()
    }
    if (fa != "") {
        dracu(fa, '', "__1");
        todo_f = True;
        carusel("tabFacture");
    }
    if (fc != "") {
        dracu(fc, '', "__2");
        todo_c = True;
        carusel("tabCertificat");
    }
    if ((fa == "") && (fc == "") && (fp != "")) {
        carusel("tabPhoto");
        todo_p = True;
    }
    if ((fa == "") && (fc == "") && (fp == "")) {
        carusel("tabDescr");
        $("#div-step1").hide();
        $("#div-step2").hide();
        $("#div-step3").show();
    }
    $("#txt_descr").hide()
    $("#txt_descr").html($("#ed_descr").val())
    //n-y  
    /*
    for (g = 1; g <= 4; g++) {
        $('#cb_gem' + g.toString() + '_type').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
            if (typeof ("clickedIndex") != "undefined") {
                var sndr=e.currentTarget.id;
                sndr=sndr.replace("cb_gem","").replace("_type","")
                var ig=parseInt(sndr)    
                Sel_gem_type[ig] = clickedIndex;
            }
        });
    }
    */
}

function somehelp() {
    alert("Ephod.AI démo Generali \n\n------------------\n\n Éléments traités: \n * métaux, \n * pierres precieuses les plus communes, \n * marques communes, \n * traitement OCR. \n\n Suggestions/demandes: contact@ephod.ai .")
}