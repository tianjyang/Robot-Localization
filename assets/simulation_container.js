import VirtualBot from './virtual_robot';
import VirtualGuess from './virtual_guess';
import { merge } from 'lodash';
import * as Util from './utils';

class SimulationContainer {
  constructor(stage) {
    window.sim = this;
    this.stage = stage;
    window.stage = stage;
    this.run = this.run.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.guesses = [];
    this.scores = [];
    this.cumulativeScores=[];
    this.walls = [];
    this.addWalls();
    this.addLandMarks();
    stage.update();
    this.robot = new VirtualBot(stage,this);
    window.robot = this.robot;
    this.robot.x = 250;
    this.robot.y =250;
    this.populateGuesses();
    this.robot.takeMeasurement();
    this.setSimilarityScores.bind(this)();
    stage.update();
  }

  setSimilarityScores(){
    this.guesses.forEach((el,idx)=>{
      let temp = Util.arraySimilarityScalar(this.robot.measurement,el.measurement)
      this.scores[idx] = (temp);
      if (idx === 0) {
        this.cumulativeScores[idx] = temp;
      } else {
        this.cumulativeScores[idx] = temp + this.cumulativeScores[idx-1];
      }
    });
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
      this.guesses.push(new VirtualGuess(this.stage,this));
    }
  }

  resampleGuesses(){
    let numGuesses = this.cumulativeScores.length;
    let maxRange = this.cumulativeScores[numGuesses-1];
    let output = [];
    for (var i = 0; i < numGuesses; i++) {
      let currentSample = maxRange * Math.random();
      let currentGuess = this.guesses[Util.findApproxIndex(this.cumulativeScores,currentSample)];
      let newGuess = new VirtualGuess(this.stage,this);
      newGuess.x = currentGuess.x;
      newGuess.y = currentGuess.y;
      newGuess.measurement = currentGuess.measurement;
      output.push(newGuess);
    }
    this.guesses.forEach((el)=>{
      this.stage.removeChild(el);
    });
    this.guesses = output;

  }

  run () {

    const handleTick = (e) => {
      if (this.robot.travelDistance >= 50) {
        this.robot.takeMeasurement();
        this.setSimilarityScores();
        this.resampleGuesses();
        this.robot.travelDistance = 0;
      } else {
        this.robot.updatePosition(this.handleKeyboard());
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
    this.walls.push(wallNorth);

    let wallSouth = new createjs.Shape();
    wallSouth.graphics.beginFill("black").drawRect(0,0,500,10);
    wallSouth.x = 0;
    wallSouth.y = 490;
    this.stage.addChild(wallSouth);
    this.walls.push(wallSouth);
    let wallWest = new createjs.Shape();
    wallWest.graphics.beginFill("black").drawRect(0,0,10,500);
    wallWest.x = 0;
    wallWest.y = 0;
    this.stage.addChild(wallWest);
    this.walls.push(wallWest);
    let wallEast = new createjs.Shape();
    wallEast.graphics.beginFill("black").drawRect(0,0,10,500);
    wallEast.x = 490;
    wallEast.y = 0;
    this.stage.addChild(wallEast);
    this.walls.push(wallEast);
  }
  addLandMarks() {

  }
}

document.addEventListener("DOMContentLoaded",()=>{
  const stage = new createjs.Stage("simulation-canvas");
  const simContainer = new SimulationContainer(stage);
  simContainer.run();

});
