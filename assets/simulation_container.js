import VirtualBot from './virtual_robot';
import VirtualGuess from './virtual_guess';
import * as Util from './utils';

class SimulationContainer {
  constructor(stage) {

    this.stage = stage;
    window.stage = stage;
    this.run = this.run.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.guesses = [];
    this.scores = [];
    this.addWalls();
    this.addLandMarks();
    this.robot = new VirtualBot(stage,this);
    window.robot = this.robot;
    this.robot.x = 250;
    this.robot.y =250;
    this.populateGuesses();
    stage.update();
  }

  setSimilarityScores(){
    this.guesses.forEach((el,idx)=>{
      this.scores[idx] = (Util.arraySimilarityScalar(this.robot.measurement,el.measurement));
    })
    console.log(this.scores);
  }



  handleKeyboard(){
    let movement = [0,0];
    if(key.isPressed("w")) {
      movement[0] = 2;
    }
    if (key.isPressed("a"))  {
      movement[1] = -2;
    }
    if (key.isPressed("d"))  {
      movement[1] = 2;
    }
    if (key.isPressed("s"))  {
      movement[0] = -2;
    }
    return movement;
  }


  populateGuesses(){
    for (var i = 0; i < 100; i++) {
      this.guesses.push(new VirtualGuess(this.stage,this))
    }
  }

  run () {

    const handleTick = (e) => {
      if (this.robot.travelDistance >= 50) {
        this.robot.takeMeasurement();
        this.setSimilarityScores();
        this.robot.travelDistance = 0;
      } else {
        this.robot.updatePosition(this.handleKeyboard());
        console.log(this.robot.travelDistance);
      }

      this.stage.update();
    };


    this.ticker = createjs.Ticker;
    this.ticker.addEventListener("tick",handleTick.bind(this));


  }

  addWalls(){
    let floor = new createjs.Shape();
    floor.graphics.beginFill("#f2f2f2").drawRect(0,0,500,500);
    this.stage.addChild(floor);


    let wallNorth = new createjs.Shape();
    wallNorth.graphics.beginFill("black").drawRect(0,0,500,10);
    wallNorth.x = 0;
    wallNorth.y = 0;
    this.stage.addChild(wallNorth);

    let wallSouth = new createjs.Shape();
    wallSouth.graphics.beginFill("black").drawRect(0,0,500,10);
    wallSouth.x = 0;
    wallSouth.y = 490;
    this.stage.addChild(wallSouth);

    let wallWest = new createjs.Shape();
    wallWest.graphics.beginFill("black").drawRect(0,0,10,500);
    wallWest.x = 0;
    wallWest.y = 0;
    this.stage.addChild(wallWest);

    let wallEast = new createjs.Shape();
    wallEast.graphics.beginFill("black").drawRect(0,0,10,500);
    wallEast.x = 490;
    wallEast.y = 0;
    this.stage.addChild(wallEast);
  }
  addLandMarks() {

  }
}

document.addEventListener("DOMContentLoaded",()=>{
  const stage = new createjs.Stage("simulation-canvas");
  const simContainer = new SimulationContainer(stage);
  simContainer.run();

});
