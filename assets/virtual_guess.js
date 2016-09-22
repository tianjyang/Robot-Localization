import * as Util from './utils';
import VirtualBot from './virtual_robot';

class VirtualGuess extends createjs.Shape {
  constructor (stage,simulation) {
    super();
    this.stageVar = stage;
    this.simulation = simulation;
    stage.addChild(this);
    this.drawSelf();
    this.measurement = [];
    this.takeMeasurement();
    return this;
  }

  takeMeasurement(){
    this.simulation.walls.forEach((el,idx)=>{
      let otherPoint = [el.x,el.y];
      let thisPoint = [this.x,this.y];
      this.measurement[idx] = Util.distanceBetweenPoints(otherPoint,thisPoint);
    });
  }

  drawSelf() {
    let alpha = 1/this.simulation.numParticles;
    this.graphics.beginFill("rgba(255,0,0,.02)").drawCircle(0,0,20);
    this.x = Math.random()* 500;
    this.y = Math.random()* 500;
  }
}

export default VirtualGuess;
