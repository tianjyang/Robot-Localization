import * as Util from './utils';
import VirtualBot from './virtual_robot';

class VirtualGuess extends VirtualBot {
  constructor (stage,simulation) {
    super(stage,simulation);
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
    measureNotice.graphics.beginFill("yellow").drawRect(0,0,200,50);
    measureNotice.x = 10;
    measureNotice.y = 10;
    this.stageVar.addChild(measureNotice);
    this.stageVar.update();
    let startingPoint, distance;
    startingPoint = [this.x,this.y];
    for (let i = 0; i < 360; i+=5) {
      startingPoint = [this.x,this.y];
      distance = this.takeSensorReading(startingPoint, this.rotation + i);
      this.measurement[i] = distance
    }
    this.stageVar.removeChild(measureNotice);
    this.stageVar.update();
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
    let guessHead = new createjs.Shape()
      guessHead.graphics.beginFill("rgba(255,0,0,0.05)").drawPolyStar(0,0,20,3,0,0);
      guessHead.x = -5;
      guessHead.y = 0;
      guessHead.scaleX = 1.5;
      this.addChild(guessHead);
  }
}

export default VirtualGuess;
