import VirtualBot from './virtual_robot';

class SimulationContainer {
  constructor(stage) {
    this.robot = new VirtualBot(stage,this);
    window.robot = this.robot
    this.stage = stage;
    window.stage = stage;
    this.run = this.run.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.robot.x = 250;
    this.robot.y =250;
    stage.update()
  }



  handleKeyboard(){
    let movement = [0,0];
    if(key.isPressed("w")) {
      movement[0] = 1;
    }
    if (key.isPressed("a"))  {
      movement[1] = -1;
    }
    if (key.isPressed("d"))  {
      movement[1] = 1;
    }
    // if (key.isPressed("s"))  {
    //   movement[0] = -1;
    // }
    return movement;
  }


  run () {

    const handleTick = (e) => {
      this.robot.updatePosition(this.handleKeyboard());
      this.stage.update();
    };


    this.ticker = createjs.Ticker;
    this.ticker.framerate = 60;
    this.ticker.addEventListener("tick",handleTick.bind(this));


  }

  checkRobotCollision(){
  }
}

document.addEventListener("DOMContentLoaded",()=>{
  const stage = new createjs.Stage("simulation-canvas");
  const simContainer = new SimulationContainer(stage);
  simContainer.run();

});
