rocket = function(){
  this.position = new vector(width/2, height-20);
  this.velocity = new vector(0,0);
  this.acceleration = new vector(0,0);
  this.inithealth=200;
  this.health = this.inithealth;
  this.crashed = false;
  this.motion=[];
  this.fitness = null;
  this.reachedtarget = false;
  for(var i=0; i<this.inithealth; i++){
    this.motion[i] = new vector(0,0)
    this.motion[i] = getMotion();
  }
}

rocket.prototype.show = function(){
  let x = this.position.x;
  let y = this.position.y;
  push();
  translate(x,y);
  rotate(this.velocity.getAngle()+PI/2);
  fill(255);
  if(this.reachedtarget){
    fill(255,255,0)
  }
  strokeWeight(2);
  stroke(0,0,255);
  beginShape();
  vertex(0,-10);
  vertex(-5,0);
  vertex(-5,20);
  vertex(5,20);
  vertex(5,0);
  vertex(0,-10);
  endShape();
  pop();
}
rocket.prototype.move = function(){
  this.velocity.x+=this.acceleration.x;
  this.velocity.y+=this.acceleration.y;
  this.position.x+=this.velocity.x;
  this.position.y+=this.velocity.y;
  if(this.velocity.getR() > 4) this.velocity.setR(4);
}
rocket.prototype.update = function() {
  if(this.health>0){
    this.acceleration = this.motion[this.health-1];
  } else{
    this.velocity.setR(0);
  }
}
rocket.prototype.ifcrashed = function(){
  if(this.position.x<0 || this.position.x>width || this.position.y>height || this.position.y<0){
    this.crashed = true;
  }
  for(let e of obstacle){
    if(this.position.x>e.x-100 && this.position.x<e.x+100 && this.position.y<e.y+20 && this.position.y>e.y-20){
      this.crashed = true;
    }
  }
  let d = dist(this.position.x,this.position.y,target.x,target.y);
  if(d<13){
    this.reachedtarget=true;
  }
}
rocket.prototype.calcfitness = function(){
  let d = dist(this.position.x,this.position.y,target.x,target.y);
  this.fitness = 100*pow(5,2/(d+1));
  if(this.crashed && !this.reachedtarget){
    this.fitness/=10;
  }
  if(this.reachedtarget){
    this.fitness*=25;
  }
}
