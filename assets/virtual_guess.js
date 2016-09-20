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
    this.travelDistance = 0;
    this.takeMeasurement()
    return this;
  }

  takeMeasurement() {
    let measureNotice = new createjs.Shape();
    let startingPoint, distance;
    startingPoint = [this.x,this.y];
    for (let i = 0; i < 360; i+=5) {
      startingPoint = [this.x,this.y];
      distance = this.takeSensorReading(startingPoint, this.rotation + i);
      this.measurement[i] = distance
    }
  }

  takeSensorReading(startingPoint,angle) {
    let radians = angle*Math.PI/180;
    let startPoint = startingPoint;
    let endPoint = startingPoint.slice(0);
    let keepLooping = true;
    const colorAtPix = (x,y) => {
      return Array.from(this.stageVar.canvas.getContext('2d').getImageData(x,y,5,5).data);
    };

    const isBlack = (rgbArray) => {
      rgbArray.pop();
      return rgbArray.every((el)=>{
        return el === 0;
      });
    };
    while (keepLooping) {
      endPoint = Util.stepInDirectionDegs(endPoint,radians,10);
      keepLooping = !Util.hasBlack(colorAtPix(endPoint[0],endPoint[1]));
    }
    let vector = Util.vectorBetweenCenters(startPoint,endPoint);
    return Util.vectorMagnitude(vector);

  }

  drawSelf() {
    this.graphics.beginFill("rgba(255,0,0,0.05)").drawPolyStar(0,0,20,3,0,0);
    this.x = Math.random()* 500;
    this.y = Math.random()* 500;
    this.rotation = Math.random()*360;
    this.scaleX = 1.5;
  }
}

export default VirtualGuess;
