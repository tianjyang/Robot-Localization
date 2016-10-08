/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	// import { rnorm } from 'randgen';
	
	var _virtual_robot = __webpack_require__(1);
	
	var _virtual_robot2 = _interopRequireDefault(_virtual_robot);
	
	var _virtual_guess = __webpack_require__(5);
	
	var _virtual_guess2 = _interopRequireDefault(_virtual_guess);
	
	var _utils = __webpack_require__(2);
	
	var Util = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SimulationContainer = function () {
	  function SimulationContainer(stage) {
	    _classCallCheck(this, SimulationContainer);
	
	    this.runSimulation = false;
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
	    this.cumulativeScores = [];
	    this.walls = [];
	    this.addWalls();
	    stage.update();
	    this.robot = new _virtual_robot2.default(stage, this);
	    this.robot.setSensorNoise(this.sensorNoise);
	    window.robot = this.robot;
	    this.robot.x = 250;
	    this.robot.y = 250;
	    this.populateGuesses();
	    this.robot.takeMeasurement();
	    this.setSimilarityScores.bind(this)();
	    this.bestGuess = null;
	    stage.update();
	    this.target = { x: 300, y: 300 };
	  }
	
	  _createClass(SimulationContainer, [{
	    key: 'setSimilarityScores',
	    value: function setSimilarityScores() {
	      var _this = this;
	
	      var maxScore = 0;
	      this.scores = [];
	      this.cumulativeScores = [];
	      this.guesses.forEach(function (el, idx) {
	        var temp = Util.arraySimilarityScalar(_this.robot.measurement, el.measurement);
	        _this.scores[idx] = temp;
	        if (temp > maxScore) {
	          _this.bestGuess = el;
	          maxScore = temp;
	        }
	
	        if (idx === 0) {
	          _this.cumulativeScores[idx] = temp;
	        } else {
	          _this.cumulativeScores[idx] = temp + _this.cumulativeScores[idx - 1];
	        }
	      });
	
	      this.updateHTMLWithParams();
	    }
	  }, {
	    key: 'updateHTMLWithParams',
	    value: function updateHTMLWithParams() {
	      var robotX = document.getElementById("robot-x");
	      robotX.innerHTML = this.robot.x.toFixed(1);
	      var robotY = document.getElementById("robot-y");
	      robotY.innerHTML = this.robot.y.toFixed(1);
	
	      var bestGuessX = document.getElementById("best-guess-x");
	      bestGuessX.innerHTML = this.bestGuess.x.toFixed(1);
	      var bestGuessY = document.getElementById("best-guess-y");
	      bestGuessY.innerHTML = this.bestGuess.y.toFixed(1);
	    }
	  }, {
	    key: 'kickRobot',
	    value: function kickRobot() {
	      this.robot.x = Math.random() * 500;
	      this.robot.y = Math.random() * 500;
	    }
	  }, {
	    key: 'handleKeyboard',
	    value: function handleKeyboard() {
	      var movement = [0, 0];
	      if (key.isPressed("w")) {
	        movement[0] = 2;
	      }
	      if (key.isPressed("a")) {
	        movement[1] = -2;
	      }
	      if (key.isPressed("d")) {
	        movement[1] = 2;
	      }
	      if (key.isPressed("s")) {
	        movement[0] = -2;
	      }
	      return movement;
	    }
	  }, {
	    key: 'populateGuesses',
	    value: function populateGuesses() {
	      for (var i = 0; i < this.numParticles; i++) {
	        this.guesses.push(new _virtual_guess2.default(this.stage, this));
	      }
	    }
	  }, {
	    key: 'resetKnowledge',
	    value: function resetKnowledge() {
	      var currentStage = this.stage;
	      this.guesses.forEach(function (el) {
	        currentStage.removeChild(el);
	      });
	      this.guesses = [];
	      this.populateGuesses();
	      this.stage.update();
	    }
	  }, {
	    key: 'resampleGuesses',
	    value: function resampleGuesses() {
	      var _this2 = this;
	
	      var numGuesses = this.cumulativeScores.length;
	      var maxRange = this.cumulativeScores[numGuesses - 1];
	      var numToSample = Math.floor(numGuesses * .75);
	      var output = [];
	      var stdDevX = 0;
	      var stdDevY = 0;
	      var avgX = 0;
	      var avgY = 0;
	      for (var i = 0; i < numToSample; i++) {
	        var currentSample = maxRange * Math.random();
	        var currentGuess = this.guesses[Util.findApproxIndex(this.cumulativeScores, currentSample)];
	        var newGuess = new _virtual_guess2.default(this.stage, this);
	        newGuess.x = currentGuess.x;
	        stdDevX += Math.pow(newGuess.x - this.bestGuess.x, 2);
	        newGuess.y = currentGuess.y;
	        stdDevY += Math.pow(newGuess.y - this.bestGuess.y, 2);
	        avgX += newGuess.x;
	        avgY += newGuess.y;
	        newGuess.measurement = currentGuess.measurement;
	        output.push(newGuess);
	      }
	      stdDevX = Math.sqrt(stdDevX / numToSample);
	      stdDevY = Math.sqrt(stdDevY / numToSample);
	
	      var posOptions = {
	        x: this.bestGuess.x,
	        y: this.bestGuess.y,
	        stdDevX: stdDevX,
	        stdDevY: stdDevY
	      };
	
	      while (output.length < numGuesses) {
	        var temp = new _virtual_guess2.default(this.stage, this, posOptions);
	        output.push(temp);
	      }
	      this.guesses.forEach(function (el) {
	        _this2.stage.removeChild(el);
	      });
	      this.guesses = output;
	    }
	  }, {
	    key: 'pickNewTarget',
	    value: function pickNewTarget() {
	      var pos1 = [this.target.x, this.target.y];
	      var pos2 = [this.robot.x, this.robot.y];
	      if ((0, _utils.distanceBetweenPoints)(pos1, pos2) <= 5) {
	        this.target.x = Math.random() * 500;
	        this.target.y = Math.random() * 500;
	      }
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      var _this3 = this;
	
	      var handleTick = function handleTick(e) {
	        if (_this3.robot.travelDistance >= _this3.numMeasures) {
	          _this3.robot.takeMeasurement();
	          _this3.setSimilarityScores();
	          _this3.resampleGuesses();
	          _this3.robot.travelDistance = 0;
	        } else {
	          _this3.robot.updatePosition(_this3.handleKeyboard());
	        }
	        _this3.pickNewTarget();
	        _this3.stage.update();
	      };
	
	      if (this.ticker) {
	        this.runSimulation = true;
	      } else {
	        this.runSimulation = true;
	        this.ticker = createjs.Ticker;
	        this.ticker.addEventListener("tick", handleTick.bind(this));
	      }
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.runSimulation = false;
	    }
	  }, {
	    key: 'addWalls',
	    value: function addWalls() {
	      var floor = new createjs.Shape();
	      floor.graphics.beginFill("#f2f2f2").drawRect(0, 0, 500, 500);
	      this.stage.addChild(floor);
	
	      var wallNorth = new createjs.Shape();
	      wallNorth.graphics.beginFill("black").drawRect(0, 0, 500, 10);
	      wallNorth.x = 0;
	      wallNorth.y = 0;
	      this.stage.addChild(wallNorth);
	      this.walls.push(wallNorth);
	
	      var wallSouth = new createjs.Shape();
	      wallSouth.graphics.beginFill("black").drawRect(0, 0, 500, 10);
	      wallSouth.x = 0;
	      wallSouth.y = 490;
	      this.stage.addChild(wallSouth);
	      this.walls.push(wallSouth);
	      var wallWest = new createjs.Shape();
	      wallWest.graphics.beginFill("black").drawRect(0, 0, 10, 500);
	      wallWest.x = 0;
	      wallWest.y = 0;
	      this.stage.addChild(wallWest);
	      this.walls.push(wallWest);
	      var wallEast = new createjs.Shape();
	      wallEast.graphics.beginFill("black").drawRect(0, 0, 10, 500);
	      wallEast.x = 490;
	      wallEast.y = 0;
	      this.stage.addChild(wallEast);
	      this.walls.push(wallEast);
	    }
	  }, {
	    key: 'updateSensorNoise',
	    value: function updateSensorNoise() {
	      var percent = document.getElementById("sensor-noise").value / 100;
	      this.sensorNoise = 1 + 9 * percent;
	      this.robot.setSensorNoise(this.sensorNoise);
	    }
	  }, {
	    key: 'updateParticleCount',
	    value: function updateParticleCount() {
	      var percent = document.getElementById("num-particles").value / 100;
	      this.numParticles = Math.floor(50 + percent * 1950);
	      this.resetKnowledge();
	    }
	  }, {
	    key: 'updateNumberMeasurement',
	    value: function updateNumberMeasurement() {
	      var percent = document.getElementById("num-measures").value / 100;
	      this.numMeasures = 20 - 19 * percent;
	    }
	  }]);
	
	  return SimulationContainer;
	}();
	
	var hideElement = function hideElement(e, callback) {
	  $(e.currentTarget.parentElement).fadeOut(500, callback);
	};
	
	var startSim = function startSim(event) {
	  event.preventDefault();
	  if (event.target.id === "start-help") {
	    window.directions = $(".directions");
	    window.directionIndex = 0;
	    $(window.directions[0]).fadeIn();
	  } else {}
	
	  hideElement(event, function () {
	    $('#simulation-container').fadeIn(300);
	  });
	
	  var stage = new createjs.Stage("simulation-canvas");
	  var simContainer = new SimulationContainer(stage);
	  window.simContainer = simContainer;
	};
	
	document.getElementById("start-help").addEventListener("click", startSim);
	
	$(".close-button").click(hideElement);
	$("#no").click(hideElement);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	var Util = _interopRequireWildcard(_utils);
	
	var _randgen = __webpack_require__(3);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VirtualBot = function (_createjs$Container) {
	  _inherits(VirtualBot, _createjs$Container);
	
	  function VirtualBot(stage, simulation) {
	    var _ret;
	
	    _classCallCheck(this, VirtualBot);
	
	    var _this = _possibleConstructorReturn(this, (VirtualBot.__proto__ || Object.getPrototypeOf(VirtualBot)).call(this));
	
	    _this.stageVar = stage;
	    _this.simulation = simulation;
	    stage.addChild(_this);
	    _this.drawSelf();
	    _this.measurement = [];
	    _this.travelDistance = 0;
	    _this.x = Math.random() * 500;
	    _this.y = Math.random() * 500;
	    _this.rotation = Math.random() * 360;
	    _this.sensorNoise = 0;
	    _this.autopilot = true;
	    return _ret = _this, _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(VirtualBot, [{
	    key: 'setSensorNoise',
	    value: function setSensorNoise(arg) {
	      this.sensorNoise = arg;
	    }
	  }, {
	    key: 'takeMeasurement',
	    value: function takeMeasurement() {
	      var _this2 = this;
	
	      this.simulation.walls.forEach(function (el, idx) {
	        var otherPoint = [el.x, el.y];
	        var thisPoint = [_this2.x, _this2.y];
	        var distance = Util.distanceBetweenPoints(otherPoint, thisPoint);
	        distance = (0, _randgen.rnorm)(distance, _this2.sensorNoise);
	        _this2.measurement[idx] = distance;
	      });
	    }
	  }, {
	    key: 'updatePosition',
	    value: function updatePosition(inputVelocity) {
	      if (this.autopilot && this.simulation.runSimulation) {
	        var target = this.simulation.target;
	        var targetAngle = Math.atan2(target.y - this.y, target.x - this.x);
	        var botAngle = this.rotation * Math.PI / 180;
	        this.rotation += 0.1 * 180 * (targetAngle - botAngle) / Math.PI;
	        this.x += 1 * Math.cos(botAngle);
	        this.y += 1 * Math.sin(botAngle);
	        this.travelDistance += 1;
	      } else if (this.simulation.runSimulation) {
	        this.rotation += inputVelocity[1] * (inputVelocity[0] || 1);
	        var radians = this.rotation * Math.PI / 180;
	        this.x += inputVelocity[0] * Math.cos(radians);
	        this.y += inputVelocity[0] * Math.sin(radians);
	        this.travelDistance += Math.abs(inputVelocity[0]);
	      }
	    }
	  }, {
	    key: 'drawSelf',
	    value: function drawSelf() {
	      var robotBody = new createjs.Shape();
	      robotBody.graphics.beginFill("blue").drawRect(0, 0, 50, 50);
	      robotBody.x = -25;
	      robotBody.y = -25;
	      var robotWheel1 = new createjs.Shape();
	      robotWheel1.graphics.beginFill("grey").drawRect(0, 0, 10, 5);
	      robotWheel1.x = 15;
	      robotWheel1.y = -30;
	      var robotWheel2 = new createjs.Shape();
	      robotWheel2.graphics.beginFill("grey").drawRect(0, 0, 10, 5);
	      robotWheel2.x = 15;
	      robotWheel2.y = 25;
	      var robotWheel3 = new createjs.Shape();
	      robotWheel3.graphics.beginFill("grey").drawRect(0, 0, 10, 5);
	      robotWheel3.x = -25;
	      robotWheel3.y = 25;
	      var robotWheel4 = new createjs.Shape();
	      robotWheel4.graphics.beginFill("grey").drawRect(0, 0, 10, 5);
	      robotWheel4.x = -25;
	      robotWheel4.y = -30;
	      var robotHead = new createjs.Shape();
	      robotHead.graphics.beginFill("yellow").drawPolyStar(0, 0, 20, 3, 0, 0);
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
	  }]);
	
	  return VirtualBot;
	}(createjs.Container);
	
	exports.default = VirtualBot;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var randomVecOfLength = exports.randomVecOfLength = function randomVecOfLength(length) {
	  var direction = Math.random() * Math.PI * 2;
	  var xComponent = Math.cos(direction) * length;
	  var yComponent = Math.sin(direction) * length;
	  return [xComponent, yComponent];
	};
	
	var initialSetupRandomPos = exports.initialSetupRandomPos = function initialSetupRandomPos(x, y) {
	  var outputX = 450;
	  var outputY = 250;
	  while (outputX < 550 && outputX > 350) {
	    outputX = Math.random() * x;
	  }
	  while (outputY < 350 && outputY > 150) {
	    outputY = Math.random() * y;
	  }
	  return [outputX, outputY];
	};
	
	var distanceBetweenPoints = exports.distanceBetweenPoints = function distanceBetweenPoints(pos1, pos2) {
	  var a = Math.pow(pos1[0] - pos2[0], 2);
	  var b = Math.pow(pos1[1] - pos2[1], 2);
	  return Math.sqrt(a + b);
	};
	
	var vectorBetweenCenters = exports.vectorBetweenCenters = function vectorBetweenCenters(pos1, pos2) {
	  var x1 = void 0,
	      x2 = void 0,
	      y1 = void 0,
	      y2 = void 0;
	  x1 = pos1[0];
	  y1 = pos1[1];
	  x2 = pos2[0];
	  y2 = pos2[1];
	  return [x2 - x1, y2 - y1];
	};
	
	var rotateVector = exports.rotateVector = function rotateVector(vector, degrees) {
	  var radians = degrees / 180 * Math.pi;
	  var xNew = vector[0] * Math.cos(radians) - vector[1] * Math.sin(radians);
	  var yNew = vector[0] * Math.sin(radians) + vector[1] * Math.cos(radians);
	  return [xNew, yNew];
	};
	
	var normalizedVector = exports.normalizedVector = function normalizedVector(vector) {
	  var x = vector[0];
	  var y = vector[1];
	  var magnitude = Math.sqrt(x * x + y * y);
	  return [x / magnitude, y / magnitude];
	};
	
	var vectorMagnitude = exports.vectorMagnitude = function vectorMagnitude(vector) {
	  var x = vector[0];
	  var y = vector[1];
	  return Math.sqrt(x * x + y * y);
	};
	
	var dotProduct = exports.dotProduct = function dotProduct(vector1, vector2) {
	  return vector1[0] * vector2[0] + vector1[1] * vector2[1];
	};
	
	var coordFromObj = exports.coordFromObj = function coordFromObj(obj) {
	  return [obj.x, obj.y];
	};
	
	var vectorScale = exports.vectorScale = function vectorScale(vector, scale) {
	  var x = vector[0];
	  var y = vector[1];
	  return [x * scale, y * scale];
	};
	
	var stepInDirectionDegs = exports.stepInDirectionDegs = function stepInDirectionDegs(point, radians) {
	  var stepSize = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	
	  var x = point[0];
	  var y = point[1];
	  x += Math.cos(radians) * stepSize;
	  y += Math.sin(radians) * stepSize;
	  return [x, y];
	};
	
	var setVectorMagnitude = exports.setVectorMagnitude = function setVectorMagnitude(vector, magnitude) {
	  return vectorScale(vector, magnitude / vectorMagnitude(vector));
	};
	
	var averageRGBAVector = exports.averageRGBAVector = function averageRGBAVector(rgbaArray) {
	  var output = [0, 0, 0, 0];
	  var count = 0;
	  for (var i = 0; i < rgbaArray.length; i += 4) {
	    output[0] += rgbaArray[i];
	    output[1] += rgbaArray[i + 1];
	    output[2] += rgbaArray[i + 2];
	    output[3] += rgbaArray[i + 3];
	    count++;
	  }
	  return output.map(function (el) {
	    return el / count;
	  });
	};
	
	var hasBlack = exports.hasBlack = function hasBlack(rgbaArray) {
	  var output = false;
	  for (var i = 0; i < rgbaArray.length; i += 4) {
	    if (rgbaArray[i] === 0 && rgbaArray[i + 1] === 0 && rgbaArray[i + 2] === 0) {
	      output = true;
	      break;
	    }
	  }
	  return output;
	};
	
	var arraySimilarityScalar = exports.arraySimilarityScalar = function arraySimilarityScalar(measurement, array2) {
	  var output = 0;
	  for (var i = 0; i < measurement.length; i++) {
	    var measuredValue = measurement[i];
	    var guessedValue = array2[i];
	    var difference = Math.abs(measuredValue - guessedValue);
	    difference = difference / measuredValue;
	
	    output += difference;
	  }
	  output = output;
	  return 1 / output;
	};
	
	var findApproxIndex = exports.findApproxIndex = function findApproxIndex(array, value) {
	  for (var i = 0; i < array.length; i++) {
	    if (array[i] > value) {
	      return i;
	    }
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// Export ./lib/randgen
	
	module.exports = __webpack_require__(4);


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*jslint indent: 2, plusplus: true, sloppy: true */
	// Generate uniformly distributed random numbers
	// Gives a random number on the interval [min, max).
	// If discrete is true, the number will be an integer.
	function runif(min, max, discrete) {
	  if (min === undefined) {
	    min = 0;
	  }
	  if (max === undefined) {
	    max = 1;
	  }
	  if (discrete === undefined) {
	    discrete = false;
	  }
	  if (discrete) {
	    return Math.floor(runif(min, max, false));
	  }
	  return Math.random() * (max - min) + min;
	}
	
	// Generate normally-distributed random nubmers
	// Algorithm adapted from:
	// http://c-faq.com/lib/gaussian.html
	function rnorm(mean, stdev) {
	  var u1, u2, v1, v2, s;
	  if (mean === undefined) {
	    mean = 0.0;
	  }
	  if (stdev === undefined) {
	    stdev = 1.0;
	  }
	  if (rnorm.v2 === null) {
	    do {
	      u1 = Math.random();
	      u2 = Math.random();
	
	      v1 = 2 * u1 - 1;
	      v2 = 2 * u2 - 1;
	      s = v1 * v1 + v2 * v2;
	    } while (s === 0 || s >= 1);
	
	    rnorm.v2 = v2 * Math.sqrt(-2 * Math.log(s) / s);
	    return stdev * v1 * Math.sqrt(-2 * Math.log(s) / s) + mean;
	  }
	
	  v2 = rnorm.v2;
	  rnorm.v2 = null;
	  return stdev * v2 + mean;
	}
	
	rnorm.v2 = null;
	
	// Generate Chi-square distributed random numbers
	function rchisq(degreesOfFreedom) {
	  if (degreesOfFreedom === undefined) {
	    degreesOfFreedom = 1;
	  }
	  var i, z, sum = 0.0;
	  for (i = 0; i < degreesOfFreedom; i++) {
	    z = rnorm();
	    sum += z * z;
	  }
	
	  return sum;
	}
	
	// Generate Poisson distributed random numbers
	function rpoisson(lambda) {
	  if (lambda === undefined) {
	    lambda = 1;
	  }
	  var l = Math.exp(-lambda),
	    k = 0,
	    p = 1.0;
	  do {
	    k++;
	    p *= Math.random();
	  } while (p > l);
	
	  return k - 1;
	}
	
	// Generate Cauchy distributed random numbers
	function rcauchy(loc, scale) {
	  if (loc === undefined) {
	    loc = 0.0;
	  }
	  if (scale === undefined) {
	    scale = 1.0;
	  }
	  var n2, n1 = rnorm();
	  do {
	    n2 = rnorm();
	  } while (n2 === 0.0);
	
	  return loc + scale * n1 / n2;
	}
	
	// Bernoulli distribution: gives 1 with probability p
	function rbernoulli(p) {
	  return Math.random() < p ? 1 : 0;
	}
	
	// Vectorize a random generator
	function vectorize(generator) {
	  return function () {
	    var n, result, i, args;
	    args = [].slice.call(arguments)
	    n = args.shift();
	    result = [];
	    for (i = 0; i < n; i++) {
	      result.push(generator.apply(this, args));
	    }
	    return result;
	  };
	}
	
	// Generate a histogram from a list of numbers
	function histogram(data, binCount) {
	  binCount = binCount || 10;
	
	  var bins, i, scaled,
	    max = Math.max.apply(this, data),
	    min = Math.min.apply(this, data);
	
	  // edge case: max == min
	  if (max === min) {
	    return [data.length];
	  }
	
	  bins = [];
	
	  // zero each bin
	  for (i = 0; i < binCount; i++) {
	    bins.push(0);
	  }
	
	  for (i = 0; i < data.length; i++) {
	    // scale it to be between 0 and 1
	    scaled = (data[i] - min) / (max - min);
	
	    // scale it up to the histogram size
	    scaled *= binCount;
	
	    // drop it in a bin
	    scaled = Math.floor(scaled);
	
	    // edge case: the max
	    if (scaled === binCount) { scaled--; }
	
	    bins[scaled]++;
	  }
	
	  return bins;
	}
	
	/**
	 * Get a random element from a list
	 */
	function rlist(list) {
	  return list[runif(0, list.length, true)];
	}
	
	exports.runif = runif;
	exports.rnorm = rnorm;
	exports.rchisq = rchisq;
	exports.rpoisson = rpoisson;
	exports.rcauchy = rcauchy;
	exports.rbernoulli = rbernoulli;
	exports.rlist = rlist;
	
	exports.rvunif = vectorize(runif);
	exports.rvnorm = vectorize(rnorm);
	exports.rvchisq = vectorize(rchisq);
	exports.rvpoisson = vectorize(rpoisson);
	exports.rvcauchy = vectorize(rcauchy);
	exports.rvbernoulli = vectorize(rbernoulli);
	exports.rvlist = vectorize(rlist);
	
	exports.histogram = histogram;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	var Util = _interopRequireWildcard(_utils);
	
	var _randgen = __webpack_require__(3);
	
	var _virtual_robot = __webpack_require__(1);
	
	var _virtual_robot2 = _interopRequireDefault(_virtual_robot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VirtualGuess = function (_createjs$Shape) {
	  _inherits(VirtualGuess, _createjs$Shape);
	
	  function VirtualGuess(stage, simulation, posOptions) {
	    var _ret;
	
	    _classCallCheck(this, VirtualGuess);
	
	    var _this = _possibleConstructorReturn(this, (VirtualGuess.__proto__ || Object.getPrototypeOf(VirtualGuess)).call(this));
	
	    _this.stageVar = stage;
	    _this.simulation = simulation;
	    stage.addChild(_this);
	    _this.drawSelf();
	    if (posOptions) {
	      _this.x = (0, _randgen.rnorm)(posOptions.x, posOptions.stdDevX);
	      _this.y = (0, _randgen.rnorm)(posOptions.y, posOptions.stdDevY);
	    } else {
	      _this.x = Math.random() * 500;
	      _this.y = Math.random() * 500;
	    }
	
	    _this.measurement = [];
	    _this.takeMeasurement();
	    return _ret = _this, _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(VirtualGuess, [{
	    key: 'takeMeasurement',
	    value: function takeMeasurement() {
	      var _this2 = this;
	
	      this.simulation.walls.forEach(function (el, idx) {
	        var otherPoint = [el.x, el.y];
	        var thisPoint = [_this2.x, _this2.y];
	        _this2.measurement[idx] = Util.distanceBetweenPoints(otherPoint, thisPoint);
	      });
	    }
	  }, {
	    key: 'drawSelf',
	    value: function drawSelf() {
	      var alpha = 1 / this.simulation.numParticles;
	      this.graphics.beginFill("rgba(255,0,0,.02)").drawCircle(0, 0, 20);
	    }
	  }]);
	
	  return VirtualGuess;
	}(createjs.Shape);
	
	exports.default = VirtualGuess;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map