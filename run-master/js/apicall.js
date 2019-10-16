
function ns(s){
  if(s==null){return '';}
  return s;
}

apidata=[]

function flt(){
  $.ajax({
    url: "/ws/apilist",
    cache: false
  })
    .done(function( jsondata ) {
      apidata=jsondata
      ht=''
      for(i in apidata){
        ht+='<tr><td>'+apidata[i][0]+'</td><td>'+
            apidata[i][3]+'</td><td>'+
            apidata[i][4]+'</td><td>'+
            ns(apidata[i][2]).substr(0,20)+'[...]'+'</td><td>'+
            apidata[i][11]+'</td><td>'+
            apidata[i][4]+'</td><td>'+            
            apidata[i][7]+' - '+apidata[i][8]+'</td><td>'+
            apidata[i][14]+'</td><td>'+
            ns(apidata[i][13]).substr(0,20)+'[...]'+'</td></tr>';
      }
      $("#tbbapilist").html(ht)
    })
}
 
  
  
//INIT >>>>>  
  flt();