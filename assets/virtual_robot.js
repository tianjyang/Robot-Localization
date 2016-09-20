import * as Util from './utils'

class VirtualBot extends createjs.Container {
  constructor (stage,simulation) {
    super();
    this.stageVar = stage;
    this.simulation = simulation;
    stage.addChild(this);
    this.drawSelf();
    this.measurement = []
    this.travelDistance = 0
    this.x = Math.random() * 500;
    this.y = Math.random() * 500;
    this.rotation = Math.random() * 360
    return this;
  }

  takeMeasurement() {
    let startingPoint, distance;
    let index = 0
    startingPoint = [this.x,this.y];
    for (let i = 0; i < 360; i+= 5) {
      startingPoint = [this.x,this.y];
      distance = this.takeSensorReading(startingPoint,i);
      this.measurement[index] = distance;
      index++;
    }
  }

  takeSensorReading(startingPoint,angle) {
    let radians = angle*Math.PI/180;
    let startPoint = startingPoint
    let endPoint = startingPoint.slice(0);
    let keepLooping = true
    let avgColor
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

  updatePosition(inputVelocity) {
    this.rotation += inputVelocity[1]*(inputVelocity[0]||1);
    let radians = (this.rotation)*Math.PI/180;
    this.x += inputVelocity[0]*Math.cos(radians);
    this.y += inputVelocity[0]*Math.sin(radians);
    this.travelDistance += Math.abs(inputVelocity[0]);
  }

  drawSelf() {
      let robotBody = new createjs.Shape()
      robotBody.graphics.beginFill("blue").drawRect(0,0,50,50);
      robotBody.x = -25
      robotBody.y = -25
      let robotWheel1 = new createjs.Shape()
      robotWheel1.graphics.beginFill("grey").drawRect(0,0,10,5);
      robotWheel1.x = 15;
      robotWheel1.y = -30
      let robotWheel2 = new createjs.Shape();
      robotWheel2.graphics.beginFill("grey").drawRect(0,0,10,5);
      robotWheel2.x = 15;
      robotWheel2.y = 25;
      let robotWheel3 = new createjs.Shape()
      robotWheel3.graphics.beginFill("grey").drawRect(0,0,10,5);
      robotWheel3.x = -25;
      robotWheel3.y = 25;
      let robotWheel4 = new createjs.Shape()
      robotWheel4.graphics.beginFill("grey").drawRect(0,0,10,5);
      robotWheel4.x = -25;
      robotWheel4.y = -30;
      let robotHead = new createjs.Shape()
      robotHead.graphics.beginFill("yellow").drawPolyStar(0,0,20,3,0,0);
      robotHead.x = -5;
      robotHead.y = 0;
      robotHead.scaleX = 1.5;

      this.addChild(robotBody);
      this.addChild(robotWheel1);
      this.addChild(robotWheel2);
      this.addChild(robotWheel3);
      this.addChild(robotWheel4);
      this.addChild(robotHead);
  }
}

export default VirtualBot;
