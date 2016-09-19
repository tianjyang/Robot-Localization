// import * as Utils from './utils';
import BaseRobot from './base_robot';

class VirtualBot extends createjs.Container {
  constructor (stage,simulation) {
    super(stage,simulation);
    this.simulation = simulation;
    stage.addChild(this);
    this.drawSelf();
    return this;
  }

  updateState() {
  }

  updatePosition(inputVelocity) {
    this.rotation += inputVelocity[1];
    let radians = (this.rotation-90)*Math.PI/180;
    this.x += inputVelocity[0]*Math.cos(radians);
    this.y += inputVelocity[0]*Math.sin(radians);
  }

  drawSelf() {
      let robotBody = new createjs.Shape()
      robotBody.graphics.beginFill("blue").drawRect(0,0,50,50);
      robotBody.x = -25
      robotBody.y = -25
      let robotWheel1 = new createjs.Shape()
      robotWheel1.graphics.beginFill("black").drawRect(0,0,5,10);
      robotWheel1.x = 25;
      robotWheel1.y = -25
      let robotWheel2 = new createjs.Shape();
      robotWheel2.graphics.beginFill("black").drawRect(0,0,5,10);
      robotWheel2.x = 25;
      robotWheel2.y = 15;
      let robotWheel3 = new createjs.Shape()
      robotWheel3.graphics.beginFill("black").drawRect(0,0,5,10);
      robotWheel3.x = -30;
      robotWheel3.y = 15;
      let robotWheel4 = new createjs.Shape()
      robotWheel4.graphics.beginFill("black").drawRect(0,0,5,10);
      robotWheel4.x = -30;
      robotWheel4.y = -25;
      let robotHead = new createjs.Shape()
      robotHead.graphics.beginFill("yellow").drawPolyStar(0,0,20,3,0,-90);
      robotHead.x = 0;
      robotHead.y = 5;
      robotHead.scaleY = 1.5;

      this.addChild(robotBody);
      this.addChild(robotWheel1);
      this.addChild(robotWheel2);
      this.addChild(robotWheel3);
      this.addChild(robotWheel4);
      this.addChild(robotHead);
  }
}

export default VirtualBot;
