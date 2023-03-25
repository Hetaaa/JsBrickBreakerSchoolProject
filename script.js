var kulka ={
    x: 450,
    y: 400,
    speed: 1,
    angle: 90,
}
var platforma ={
    x: 350,
    y: 840,
    speed: 20,
}
var kwadratIDcount =0
var listaKwadratow = []
var xKwadratu = 44
var yKwadratu = 10

var kolory1 = ["#FFACAC","#FFBFA9", "#FFEBB4", "#FBFFB1"]
var kolory2 = ["#ECF2FF","#3E54AC","#655DBB","#BFACE2"]
var kolory3 = ["#EDF1D6","#9DC08B","#609966","#40513B"]
var kolory4 = ["#2C3333","#2E4F4F","#0E8388","#CBE4DE"]
var kolory5 = ["#8618ff","#865DFF","#E384FF","#FFA3FD"]
var kolory6 = ["#4D455D","#E96479","#F5E9CF","#7DB9B6"]
var kolor = kolory6
const kwadratTemplate = {
    x: 0,
    y: 0,
    id: "",
}
var lose = false
var punkty = 0;

var hiscor = 0;

 function pong(){
    kulkaPhisiscs()
    colisionCheck()
    kwadratCollision()
    kwadratStartSpawn()
    pointsyUpdateYext()

}
obama = setInterval(pong,3)

function colisionCheck(){
    if (kulka.x >=900-35){
    kulka.angle = 180-kulka.angle
    }
    if (kulka.x <=0){
        kulka.angle = 180-kulka.angle
     }
     if (kulka.y<=-3){
        kulka.angle = 360-kulka.angle 
     }
     if (kulka.y>=900-55 && kulka.x>=platforma.x-35 && kulka.x<=platforma.x+200 && kulka.angle>0 && kulka.angle<180) {
        czarnoksieznik = kulka.x-platforma.x
        czarnoksieznik = czarnoksieznik / 200
        czarnoksieznik = czarnoksieznik *150
        czarnoksieznik = czarnoksieznik + 195
        czarnoksieznik = Math.round(czarnoksieznik)
        kulka.angle = czarnoksieznik
     }
     if(kulka.y>=900-17){
        kulka.angle = 360-kulka.angle
        clearInterval(obama)
        document.getElementById("kulka").style.backgroundColor = "red";
        document.getElementById("gamovr").style.display = 'flex';
        document.getElementById("scor").innerHTML = "Twoj wynik: <br>" + punkty;


    //kwadrat sprawdźcollison
}
}


function kwadratCollision(){
    for (let i = 0; i < listaKwadratow.length; i++) {
       if(kulka.x < listaKwadratow[i].x+90 && kulka.x > listaKwadratow[i].x -35){
        if(kulka.y < listaKwadratow[i].y+10 && kulka.y > listaKwadratow[i].y && kulka.angle >= 0 && kulka.angle <= 180){
            kulka.angle = 360-kulka.angle
            //dol kulki
             document.getElementById(listaKwadratow[i].id).style.display = "none"
             listaKwadratow.splice(i,1)
             punkty = punkty + 100 * kulka.speed;
        }
        if (kulka.y < listaKwadratow[i].y+45+35 && kulka.y > listaKwadratow[i].y + 35+35 && kulka.angle >= 180 && kulka.angle <= 360){
            //gora moz kulki
            kulka.angle = 360-kulka.angle
            
             document.getElementById(listaKwadratow[i].id).style.display = "none"
            listaKwadratow.splice(i,1)
            punkty = punkty + 100 * kulka.speed;
        }
       } 

       if(kulka.y > listaKwadratow[i].y && kulka.y < listaKwadratow[i].y +75){
           if (kulka.x >listaKwadratow[i].x -35 && kulka.x < listaKwadratow[i].x -25 && kulka.angle >= 270 && kulka.angle <= 360 || kulka.x >listaKwadratow[i].x -35 && kulka.x < listaKwadratow[i].x -25 && kulka.angle <=90 && kulka.angle >=0){
               // lewo może kwad
               kulka.angle = 180-kulka.angle
            document.getElementById(listaKwadratow[i].id).style.display = "none"
            listaKwadratow.splice(i,1)
            punkty = punkty + 100 * kulka.speed;
           }
           if (kulka.x >listaKwadratow[i].x +80 && kulka.x < listaKwadratow[i].x +90 && kulka.angle >= 90 && kulka.angle <= 270){
            // && kulka.angle >= 135 && kulka.angle <= 225
               //prawo może kwad
               kulka.angle = 180-kulka.angle
            document.getElementById(listaKwadratow[i].id).style.display = "none"
            listaKwadratow.splice(i,1)
            punkty = punkty + 100 * kulka.speed;
            }
       }
        
    }
}



function kulkaPhisiscs(){
    kulka.x = kulka.x +  Math.cos(kulka.angle * (Math.PI / 180)) * kulka.speed
    kulka.y = kulka.y +  Math.sin(kulka.angle * (Math.PI / 180)) * kulka.speed
    
    if (kulka.angle>=360){kulka.angle=kulka.angle-360}
    if (kulka.angle<0){kulka.angle=kulka.angle+360}

    document.getElementById("kulka").style.transform = "translate(" + kulka.x + "px," + kulka.y + "px)";
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;
    //lewo
    if (e.keyCode == '37') {
        if (platforma.x>=5){
        platforma.x = platforma.x - 1 * platforma.speed
    }
        document.getElementById("platforma").style.transform = "translate(" + platforma.x + "px," + platforma.y + "px)";
    }
    //prawo
    else if (e.keyCode == '39') {
        if (platforma.x<=690){
        platforma.x = platforma.x + 1 * platforma.speed
    }
        document.getElementById("platforma").style.transform = "translate(" + platforma.x + "px," + platforma.y + "px)";
    }

}

function kwadratStworz(){
    kwadratIDcount++
    id = "k"+kwadratIDcount
    var rando = Math.floor(Math.random() * 4)
    document.getElementById("cont").innerHTML += "<div class='kwadrat' id='"+ id +"'></div>"
    document.getElementById(id).style.transform = "translate(" + xKwadratu + "px," + yKwadratu + "px)";
    document.getElementById(id).style.backgroundColor = kolor[rando] 
    tymczasowyKwadrat = Object.create(kwadratTemplate)
    tymczasowyKwadrat.x = xKwadratu
    tymczasowyKwadrat.y = yKwadratu
    tymczasowyKwadrat.id = id
    listaKwadratow.push(tymczasowyKwadrat)
    console.log(rando)
    //wwdwwwwwwewe tutj obiekz
}



function kwadratStartSpawn(){
    if (listaKwadratow.length == 0){
        if (kolor == kolory1) {kolor = kolory2 }
        else if (kolor == kolory2) {kolor = kolory3 }
        else if (kolor == kolory3) {kolor = kolory4 }
        else if (kolor == kolory4) {kolor = kolory5 }
        else if (kolor == kolory5) {kolor = kolory6 }
        else if (kolor == kolory6) {kolor = kolory1 }
    for (let i = 0; i < 3; i++) {
     for (let i = 0; i < 6; i++) {
            kwadratStworz()
            xKwadratu = xKwadratu + 144
        
    }   
        xKwadratu = 44
        yKwadratu = yKwadratu + 90
        }
        xKwadratu = 44
        yKwadratu = 10


        if(kulka.speed < 4){
        platforma.speed += 3;
        kulka.speed+=0.5;
        }
}
}

function pointsyUpdateYext(){
    document.getElementById('pointsy').innerHTML = punkty;
}

function reset(){

    kulka.x = 450
    kulka.y = 400
    kulka.speed = 1
    kulka.angle = 90
    platforma.x = 350
    platforma.y = 840
    platforma.speed = 20
     kwadratIDcount =0
     listaKwadratow = []
     xKwadratu = 44
     yKwadratu = 10
    

     kolor = kolory6

     lose = false
    if (hiscor<punkty) { hiscor = punkty
    }
   
     punkty = 0;
     
     obama = setInterval(pong,3)
     document.getElementById("gamovr").style.display = 'none';
     document.getElementById("kulka").style.backgroundColor = "black";
     document.getElementById("cont").innerHTML = '<div id="kulka"></div><div id="platforma"></div>'



}