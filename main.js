var r=[];
var target;
var obstacle = [];
var count;
var matingpool = [];
var mutationRate = 0.01;
var generation = 1;
var para;
function setup(){
  createCanvas(600,600);
  for(let i=0; i<100; i++){
    r[i] = new rocket();
  }
  target = new vector(width/2,30);
  obstacle[0] = new vector(width/4+25,150);
  obstacle[1] = new vector(3*width/4-25,350);
  count = 0;
  para = createP("")
}

function draw(){
  para.html("Generation : " + generation)
  count++;
  background(10);
  fill(0);
  stroke(55,255,55);
  strokeWeight(2);
  ellipse(target.x,target.y,25);
  rectMode(CENTER);
  for(each of obstacle){
    fill(150);
    noStroke();
    rect(each.x,each.y,200,20)
  }
  for(let each of r){
    each.ifcrashed();
    each.show();
    if(!each.crashed){
      each.update();
      each.move();
    }
    each.health-=1;
    var n= each.inithealth;
  }
  if(count>n){
    //calculate fitness
    for(each of r){
      each.calcfitness();
      for(let i=0; i<each.fitness; i++){
        matingpool.push(each);
      }
    }
    reproduce(matingpool);
  }
}


function getMotion(){
  let a = new vector(random(-0.3,0.3),random(-0.3,0.3));
  return a;
}
function reproduce(list){
  var newPopulation = [];
  for(i=0; i<100; i++){
    let m = floor(random(list.length));
    let n = floor(random(list.length));
    var child = new rocket;
    child = crossoverandmutate(list[m],list[n]);
    newPopulation.push(child);
  }
  r = newPopulation.slice();
  count = 0;
  matingpool.splice(0,matingpool.length);
  generation++;
}
function crossoverandmutate(a,b){
  var child = new rocket;
  for(let i=0; i<a.inithealth; i++){
    if(random(1)<0.5){
      child.motion[i] = a.motion[i];
    } else{
      child.motion[i] = b.motion[i];
    }
  }
  for(let i=0; i< child.motion.length; i++){
    if(random(1)<mutationRate){
      child.motion[i] = getMotion();
    }
  }
  return child;
}
