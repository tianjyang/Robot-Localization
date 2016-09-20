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
	
	var _virtual_robot = __webpack_require__(1);
	
	var _virtual_robot2 = _interopRequireDefault(_virtual_robot);
	
	var _virtual_guess = __webpack_require__(3);
	
	var _virtual_guess2 = _interopRequireDefault(_virtual_guess);
	
	var _utils = __webpack_require__(2);
	
	var Util = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SimulationContainer = function () {
	  function SimulationContainer(stage) {
	    _classCallCheck(this, SimulationContainer);
	
	    this.stage = stage;
	    window.stage = stage;
	    this.run = this.run.bind(this);
	    this.handleKeyboard = this.handleKeyboard.bind(this);
	    this.guesses = [];
	    this.scores = [];
	    this.addWalls();
	    this.addLandMarks();
	    this.robot = new _virtual_robot2.default(stage, this);
	    window.robot = this.robot;
	    this.robot.x = 250;
	    this.robot.y = 250;
	    this.populateGuesses();
	    stage.update();
	  }
	
	  _createClass(SimulationContainer, [{
	    key: 'setSimilarityScores',
	    value: function setSimilarityScores() {
	      var _this = this;
	
	      this.guesses.forEach(function (el) {
	        _this.scores.push(Util.arraySimilarityScalar(_this.robot.measurement, el.measurement));
	      });
	      debugger;
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
	      for (var i = 0; i < 100; i++) {
	        this.guesses.push(new _virtual_guess2.default(this.stage, this));
	      }
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      var _this2 = this;
	
	      var handleTick = function handleTick(e) {
	        if (_this2.robot.travelDistance >= 50) {
	          _this2.robot.takeMeasurement();
	          _this2.setSimilarityScores();
	          _this2.robot.travelDistance = 0;
	        } else {
	          _this2.robot.updatePosition(_this2.handleKeyboard());
	          console.log(_this2.robot.travelDistance);
	        }
	
	        _this2.stage.update();
	      };
	
	      this.ticker = createjs.Ticker;
	      this.ticker.addEventListener("tick", handleTick.bind(this));
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
	
	      var wallSouth = new createjs.Shape();
	      wallSouth.graphics.beginFill("black").drawRect(0, 0, 500, 10);
	      wallSouth.x = 0;
	      wallSouth.y = 490;
	      this.stage.addChild(wallSouth);
	
	      var wallWest = new createjs.Shape();
	      wallWest.graphics.beginFill("black").drawRect(0, 0, 10, 500);
	      wallWest.x = 0;
	      wallWest.y = 0;
	      this.stage.addChild(wallWest);
	
	      var wallEast = new createjs.Shape();
	      wallEast.graphics.beginFill("black").drawRect(0, 0, 10, 500);
	      wallEast.x = 490;
	      wallEast.y = 0;
	      this.stage.addChild(wallEast);
	    }
	  }, {
	    key: 'addLandMarks',
	    value: function addLandMarks() {}
	  }]);
	
	  return SimulationContainer;
	}();
	
	document.addEventListener("DOMContentLoaded", function () {
	  var stage = new createjs.Stage("simulation-canvas");
	  var simContainer = new SimulationContainer(stage);
	  simContainer.run();
	});

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
	    return _ret = _this, _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(VirtualBot, [{
	    key: 'takeMeasurement',
	    value: function takeMeasurement() {
	      var measureNotice = new createjs.Shape();
	      measureNotice.graphics.beginFill("yellow").drawRect(0, 0, 200, 50);
	      measureNotice.x = 10;
	      measureNotice.y = 10;
	      this.stageVar.addChild(measureNotice);
	      this.stageVar.update();
	      var startingPoint = void 0,
	          distance = void 0;
	      startingPoint = [this.x, this.y];
	      for (var i = 0; i < 360; i += 5) {
	        startingPoint = [this.x, this.y];
	        distance = this.takeSensorReading(startingPoint, this.rotation + i);
	        this.measurement[i] = distance;
	      }
	      this.stageVar.removeChild(measureNotice);
	      this.stageVar.update();
	    }
	  }, {
	    key: 'takeSensorReading',
	    value: function takeSensorReading(startingPoint, angle) {
	      var _this2 = this;
	
	      var radians = angle * Math.PI / 180;
	      var startPoint = startingPoint;
	      var endPoint = startingPoint.slice(0);
	      var keepLooping = true;
	      var avgColor = void 0;
	      var colorAtPix = function colorAtPix(x, y) {
	        return Array.from(_this2.stageVar.canvas.getContext('2d').getImageData(x, y, 5, 5).data);
	      };
	
	      var isBlack = function isBlack(rgbArray) {
	        rgbArray.pop();
	        return rgbArray.every(function (el) {
	          return el === 0;
	        });
	      };
	      while (keepLooping) {
	        endPoint = Util.stepInDirectionDegs(endPoint, radians, 10);
	        keepLooping = !Util.hasBlack(colorAtPix(endPoint[0], endPoint[1]));
	      }
	      var vector = Util.vectorBetweenCenters(startPoint, endPoint);
	      return Util.vectorMagnitude(vector);
	    }
	  }, {
	    key: 'updatePosition',
	    value: function updatePosition(inputVelocity) {
	      this.rotation += inputVelocity[1] * (inputVelocity[0] || 1);
	      var radians = this.rotation * Math.PI / 180;
	      this.x += inputVelocity[0] * Math.cos(radians);
	      this.y += inputVelocity[0] * Math.sin(radians);
	      this.travelDistance += Math.abs(inputVelocity[0]);
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
	  for (var i = 0; i < 360; i += 5) {
	    var measuredValue = measurement[i];
	    var guessedValue = array2[i];
	    var difference = Math.abs(measuredValue - guessedValue);
	    difference = difference / measuredValue;
	    difference = 1 - difference;
	    output += difference;
	  }
	  return output / measurement.length;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	var Util = _interopRequireWildcard(_utils);
	
	var _virtual_robot = __webpack_require__(1);
	
	var _virtual_robot2 = _interopRequireDefault(_virtual_robot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VirtualGuess = function (_VirtualBot) {
	  _inherits(VirtualGuess, _VirtualBot);
	
	  function VirtualGuess(stage, simulation) {
	    var _ret;
	
	    _classCallCheck(this, VirtualGuess);
	
	    var _this = _possibleConstructorReturn(this, (VirtualGuess.__proto__ || Object.getPrototypeOf(VirtualGuess)).call(this, stage, simulation));
	
	    _this.stageVar = stage;
	    _this.simulation = simulation;
	    stage.addChild(_this);
	    _this.drawSelf();
	    _this.measurement = [];
	    _this.travelDistance = 0;
	    _this.takeMeasurement();
	    return _ret = _this, _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(VirtualGuess, [{
	    key: 'takeMeasurement',
	    value: function takeMeasurement() {
	      var measureNotice = new createjs.Shape();
	      measureNotice.graphics.beginFill("yellow").drawRect(0, 0, 200, 50);
	      measureNotice.x = 10;
	      measureNotice.y = 10;
	      this.stageVar.addChild(measureNotice);
	      this.stageVar.update();
	      var startingPoint = void 0,
	          distance = void 0;
	      startingPoint = [this.x, this.y];
	      for (var i = 0; i < 360; i += 5) {
	        startingPoint = [this.x, this.y];
	        distance = this.takeSensorReading(startingPoint, this.rotation + i);
	        this.measurement[i] = distance;
	      }
	      this.stageVar.removeChild(measureNotice);
	      this.stageVar.update();
	    }
	  }, {
	    key: 'takeSensorReading',
	    value: function takeSensorReading(startingPoint, angle) {
	      var _this2 = this;
	
	      var radians = angle * Math.PI / 180;
	      var startPoint = startingPoint;
	      var endPoint = startingPoint.slice(0);
	      var keepLooping = true;
	      var colorAtPix = function colorAtPix(x, y) {
	        return Array.from(_this2.stageVar.canvas.getContext('2d').getImageData(x, y, 5, 5).data);
	      };
	
	      var isBlack = function isBlack(rgbArray) {
	        rgbArray.pop();
	        return rgbArray.every(function (el) {
	          return el === 0;
	        });
	      };
	      while (keepLooping) {
	        endPoint = Util.stepInDirectionDegs(endPoint, radians, 10);
	        keepLooping = !Util.hasBlack(colorAtPix(endPoint[0], endPoint[1]));
	      }
	      var vector = Util.vectorBetweenCenters(startPoint, endPoint);
	      return Util.vectorMagnitude(vector);
	    }
	  }, {
	    key: 'drawSelf',
	    value: function drawSelf() {
	      var guessHead = new createjs.Shape();
	      guessHead.graphics.beginFill("rgba(255,0,0,0.05)").drawPolyStar(0, 0, 20, 3, 0, 0);
	      guessHead.x = -5;
	      guessHead.y = 0;
	      guessHead.scaleX = 1.5;
	      this.addChild(guessHead);
	    }
	  }]);
	
	  return VirtualGuess;
	}(_virtual_robot2.default);
	
	exports.default = VirtualGuess;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map