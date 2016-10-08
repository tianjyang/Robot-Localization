import VirtualBot from './virtual_robot';
import VirtualGuess from './virtual_guess';
import { distanceBetweenPoints } from './utils';
// import { rnorm } from 'randgen';

import * as Util from './utils';

class SimulationContainer {
  constructor(stage) {
    this.sensorNoise = 1;
    this.numParticles = 500;
    this.numMeasures = 10;
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
    stage.update();
    this.robot = new VirtualBot(stage,this);
    this.robot.setSensorNoise(this.sensorNoise);
    window.robot = this.robot;
    this.robot.x = 250;
    this.robot.y =250;
    this.populateGuesses();
    this.robot.takeMeasurement();
    this.setSimilarityScores.bind(this)();
    this.bestGuess = null;
    stage.update();
    this.target = {x:300,y:300};
  }

  setSimilarityScores(){
    let maxScore = 0;
    this.scores = [];
    this.cumulativeScores = [];
    this.guesses.forEach((el,idx)=>{
      let temp = Util.arraySimilarityScalar(this.robot.measurement,el.measurement)
      this.scores[idx] = (temp);
      if ( temp > maxScore ) {
        this.bestGuess = el;
        maxScore = temp;
      }

      if (idx === 0) {
        this.cumulativeScores[idx] = temp;
      } else {
        this.cumulativeScores[idx] = temp + this.cumulativeScores[idx-1];
      }
    });

    this.updateHTMLWithParams()
  }

  updateHTMLWithParams(){
    let robotX = document.getElementById("robot-x");
    robotX.innerHTML = this.robot.x.toFixed(1)
    let robotY = document.getElementById("robot-y");
    robotY.innerHTML = this.robot.y.toFixed(1)

    let bestGuessX = document.getElementById("best-guess-x");
    bestGuessX.innerHTML = this.bestGuess.x.toFixed(1)
    let bestGuessY = document.getElementById("best-guess-y");
    bestGuessY.innerHTML = this.bestGuess.y.toFixed(1)
  }

  kickRobot(){
    this.robot.x = Math.random()*500;
    this.robot.y = Math.random()*500;
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
    for (var i = 0; i < this.numParticles; i++) {
      this.guesses.push(new VirtualGuess(this.stage,this));
    }
  }

  resetKnowledge(){
    let currentStage = this.stage;
    this.guesses.forEach((el)=>{
      currentStage.removeChild(el);
    });
    this.guesses =[];
    this.populateGuesses();
    this.stage.update();
  }

  resampleGuesses(){
    let numGuesses = this.cumulativeScores.length;
    let maxRange = this.cumulativeScores[numGuesses-1];
    let numToSample = Math.floor(numGuesses*.75);
    let output = [];
    let stdDevX = 0;
    let stdDevY = 0;
    let avgX = 0
    let avgY = 0
    for (var i = 0; i < numToSample; i++) {
      let currentSample = maxRange * Math.random();
      let currentGuess = this.guesses[Util.findApproxIndex(this.cumulativeScores,currentSample)];
      let newGuess = new VirtualGuess(this.stage,this);
      newGuess.x = currentGuess.x;
      stdDevX += Math.pow((newGuess.x - this.bestGuess.x),2);
      newGuess.y = currentGuess.y;
      stdDevY += Math.pow((newGuess.y - this.bestGuess.y),2);
      avgX += newGuess.x;
      avgY += newGuess.y;
      newGuess.measurement = currentGuess.measurement;
      output.push(newGuess);
    }
    stdDevX = Math.sqrt(stdDevX / numToSample);
    stdDevY = Math.sqrt(stdDevY / numToSample);


    let posOptions = {
      x: this.bestGuess.x,
      y: this.bestGuess.y,
      stdDevX,
      stdDevY
    };

    while (output.length < numGuesses) {
      let temp = new VirtualGuess(this.stage,this,posOptions);
      output.push(temp)
    }
    this.guesses.forEach((el)=>{
      this.stage.removeChild(el);
    });
    this.guesses = output;

  }

  pickNewTarget() {
    let pos1 = [this.target.x, this.target.y];
    let pos2 = [this.robot.x, this.robot.y];
    if (distanceBetweenPoints(pos1,pos2) <= 5 ) {
      this.target.x = Math.random()*500
      this.target.y = Math.random()*500
    }

  }

  run () {

    const handleTick = (e) => {
      if (this.robot.travelDistance >= this.numMeasures) {
        this.robot.takeMeasurement();
        this.setSimilarityScores();
        this.resampleGuesses();
        this.robot.travelDistance = 0;
      } else {
        this.robot.updatePosition(this.handleKeyboard());
      }
      this.pickNewTarget();
      this.stage.update();
    };

    if (this.ticker) {
      this.ticker.setPaused(false);
    } else {
      this.ticker = createjs.Ticker;
      this.ticker.addEventListener("tick",handleTick.bind(this));
    }
  }

  stop () {
    if (this.ticker) {
      this.ticker.setPaused(true);
    }
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
  updateSensorNoise(){
    let percent = document.getElementById("sensor-noise").value/100;
    this.sensorNoise = 1 + 9*percent;
    this.robot.setSensorNoise(this.sensorNoise);
  }

  updateParticleCount(){
    let percent = document.getElementById("num-particles").value/100;
    this.numParticles = Math.floor(50 + percent*1950);
    this.resetKnowledge();
  }

  updateNumberMeasurement(){
    let percent = document.getElementById("num-measures").value/100;
    this.numMeasures = 20 - 19*percent;
  }
}
const hideElement = (e,callback) => {
  $(e.currentTarget.parentElement).fadeOut(500,callback);
};



const startSim = (event) => {
  event.preventDefault();
  if ( event.target.id === "start-help" ){
    window.directions = $(".directions");
    window.directionIndex = 0;
    $(window.directions[0]).fadeIn();
  } else {
  }

  hideElement(event,()=>{
    $('#simulation-container').fadeIn(300);
  });

  const stage = new createjs.Stage("simulation-canvas");
  const simContainer = new SimulationContainer(stage);
  window.simContainer = simContainer;
};

document.getElementById("start-help").addEventListener("click",startSim);





$(".close-button").click(hideElement);
$("#no").click(hideElement);
