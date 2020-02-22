var canvas = document.querySelector("#canvas");
var winner = document.querySelector("#winner");


var ctx = canvas.getContext("2d");
ctx.font="50px Georgia";


var tics = [];

function draw(x, y, rectSize, color){
  this.x = x;
  this.y = y;
  this.color = color;
  this.rectSize = rectSize;
  this.checked = false;
  this.symbol = "";
  this.drawSelf = function(color = "green"){
    this.color = color;
    ctx.beginPath()
    ctx.rect(this.x , this.y , this.rectSize, this.rectSize );
    ctx.lineWidth = "3";
    ctx.strokeStyle = this.color;
    ctx.stroke();

  }
  this.drawSelf();

  this.check = function(symbol){
    if(!this.checked){
      this.symbol = symbol;
      ctx.fillStyle = "orange";
      ctx.fillText(symbol, (this.x+(this.rectSize/2))-15, this.y + (rectSize/2)+15);
      this.checked = true;
      return true;
    }
    else{
      return false;
    }
  }

}

function randomColor(){
  var result;
  var colors = ["orange", "white", "green", "blue", "pink"]
  randNum = Math.random();
  if (randNum < 0.20) {
    result = colors[0];
  }
  else if (randNum < 0.40) {
    result = colors[1];
  }
  else if (randNum < 0.60) {
    result = colors[2];
  }
  else if (randNum < 0.80) {
    result = colors[3];
  }
  else if (randNum <= 1) {
    result = colors[4];
  }
  return result;


}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    tics.push(new draw(i * (canvas.width / 3), j * (canvas.height / 3), canvas.width/3, "green"));
  }
}

var plays = 0;
function moveM(event){


  var x = event.clientX;
    var y = event.clientY;
    for (var i = 0; i < tics.length; i++) {
      
      if (x > tics[i].x && x < tics[i].x+tics[i].rectSize && y < tics[i].y+tics[i].rectSize && y > tics[i].y) {
        tics[i].drawSelf("green");
        if(plays % 2 == 0  && tics[i].check("X")){
            tics[i].check("X");
            
            plays++;
            isWin();
            if(plays == 9){
              ended();
            }
            do{
              var result = false;
              var result  = tics[getRandomInt(0, tics.length-1)].check("O");
              if(result){
                plays++;
              }
            }while(result == false  && plays < tics.length);
            isWin()
            if(plays == 9){
              ended();
            }


        }

      }
      else{

      }
    }
}

function isWin(){
  var symbol;
  var string;
  //vertical
  for (var i = 0; i < 3; i++) {
    if(tics[i*3].symbol != ""){
      if((tics[i*3].symbol == tics[(i*3)+1].symbol  && tics[i*3].symbol == tics[(i*3)+2].symbol)){
    
        ended(tics[i*3].symbol);
      }
    }
  }
  //horizontal
  for (var i = 0; i < 3; i++) {
    if(tics[i].symbol != ""){
      if((tics[i].symbol == tics[i+3].symbol  && tics[i].symbol == tics[i+6].symbol)){
    
        ended(tics[i].symbol);
      }
    }
  }
if(tics[0].symbol != ""){
  if((tics[0].symbol == tics[4].symbol && tics[0].symbol == tics[8].symbol)){

    ended(tics[0].symbol);
  }
}
if(tics[6].symbol != ""){
  if(tics[6].symbol == tics[4].symbol && tics[6].symbol == tics[2].symbol){

    ended(tics[6].symbol);
  }
}





}
var end = false;
function ended(symbol){


  if(symbol == "X" && end == false){
    
    winner.innerHTML = "The player Wins";
     end = true;

    return 1;
  }
  if(symbol == "O" && end == false){
 
    winner.innerHTML = "The Machine Wins";
    end = true;
    return 1;
  }
  else if(end == false){
    
    winner.innerHTML = "No one Wins";
    end = true;
    return 0;
  }
  for (var i = 0; i < tics.length; i++) {
    if(tics[i].symbol != "X" || tics[i].symbol != "O" ){
      tics[i].check("-");
    }
  }

}
