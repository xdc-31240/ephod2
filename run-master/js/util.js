// (C) 2019 EPHOD SAS all rights reserved | tous droits reservées
//author: marecl mateescu, 02/01/2019

function prepeleac() {
  s = "STERLE \nBAGUE en platine (950 milli\xE8mes) ajour\xE9 et tress\xE9, serti d\u2019un diamant taille brillant pesant 2,87 carats, entour\xE9 et soulign\xE9 de diamants 8/8\nTravail fran\xE7ais, vers 1950\nSign\xE9e STERLE, Paris et num\xE9rot\xE9e. \nLe diamant est accompagn\xE9 d\u2019un rapport d\u2019analyse gemmologique du laboratoire LF.G., datant du 12/7/2018, attestant son poids de 2,87 carats, sa couleur J, sa puret\xE9 VS1, sans fluorescence. \nDoigt : 52. Poids brut : 4,6 g.\"";
  $("#textarea-input").val(s);
}



function deta(s){
  if (s) { 
    s = s.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match,y,m,d) { 
        return d + '/' + m + '/' + y;  
    });
  }
  return s;
}

//# sourceMappingURL=util.js.map