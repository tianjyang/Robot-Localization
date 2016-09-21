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

  takeMeasurement() {
    let startingPoint, distance;
    let index = 0
    startingPoint = [this.x,this.y];
    for (let i = 0; i <= 360; i+=90) {
      startingPoint = [this.x,this.y];
      distance = this.takeSensorReading(startingPoint,i);
      this.measurement[index] = distance;
      index += 1;
    }
  }

  takeSensorReading(startingPoint,angle) {
    const thisContext = this;
    let radians = angle*Math.PI/180;
    let startPoint = startingPoint;
    let endPoint = startingPoint.slice(0);
    let keepLooping = true;
    const colorAtPix = (x,y) => {
      return Array.from(thisContext.stageVar.canvas.getContext('2d').getImageData(x,y,5,5).data);
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
    this.graphics.beginFill("rgba(255,0,0,0.05)").drawCircle(0,0,20);
    this.x = Math.random()* 500;
    this.y = Math.random()* 500;
  }
}

export default VirtualGuess;
