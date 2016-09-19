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

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _virtual_robot = __webpack_require__(1);
	
	var _virtual_robot2 = _interopRequireDefault(_virtual_robot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SimulationContainer = function () {
	  function SimulationContainer(stage) {
	    _classCallCheck(this, SimulationContainer);
	
	    this.robot = new _virtual_robot2.default(stage, this);
	    window.robot = this.robot;
	    this.stage = stage;
	    window.stage = stage;
	    this.run = this.run.bind(this);
	    this.handleKeyboard = this.handleKeyboard.bind(this);
	    this.robot.x = 250;
	    this.robot.y = 250;
	    stage.update();
	  }
	
	  _createClass(SimulationContainer, [{
	    key: "handleKeyboard",
	    value: function handleKeyboard() {
	      var movement = [0, 0];
	      if (key.isPressed("w")) {
	        movement[0] = 1;
	      }
	      if (key.isPressed("a")) {
	        movement[1] = -1;
	      }
	      if (key.isPressed("d")) {
	        movement[1] = 1;
	      }
	      // if (key.isPressed("s"))  {
	      //   movement[0] = -1;
	      // }
	      return movement;
	    }
	  }, {
	    key: "run",
	    value: function run() {
	      var _this = this;
	
	      var handleTick = function handleTick(e) {
	        _this.robot.updatePosition(_this.handleKeyboard());
	        _this.stage.update();
	      };
	
	      this.ticker = createjs.Ticker;
	      this.ticker.framerate = 60;
	      this.ticker.addEventListener("tick", handleTick.bind(this));
	    }
	  }, {
	    key: "checkRobotCollision",
	    value: function checkRobotCollision() {}
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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _base_robot = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./base_robot\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _base_robot2 = _interopRequireDefault(_base_robot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import * as Utils from './utils';
	
	
	var VirtualBot = function (_createjs$Container) {
	  _inherits(VirtualBot, _createjs$Container);
	
	  function VirtualBot(stage, simulation) {
	    var _ret;
	
	    _classCallCheck(this, VirtualBot);
	
	    var _this = _possibleConstructorReturn(this, (VirtualBot.__proto__ || Object.getPrototypeOf(VirtualBot)).call(this, stage, simulation));
	
	    _this.simulation = simulation;
	    stage.addChild(_this);
	    _this.drawSelf();
	    return _ret = _this, _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(VirtualBot, [{
	    key: "updateState",
	    value: function updateState() {}
	  }, {
	    key: "updatePosition",
	    value: function updatePosition(inputVelocity) {
	      this.rotation += inputVelocity[1];
	      var radians = (this.rotation - 90) * Math.PI / 180;
	      this.x += inputVelocity[0] * Math.cos(radians);
	      this.y += inputVelocity[0] * Math.sin(radians);
	    }
	  }, {
	    key: "drawSelf",
	    value: function drawSelf() {
	      var robotBody = new createjs.Shape();
	      robotBody.graphics.beginFill("blue").drawRect(0, 0, 50, 50);
	      robotBody.x = -25;
	      robotBody.y = -25;
	      var robotWheel1 = new createjs.Shape();
	      robotWheel1.graphics.beginFill("black").drawRect(0, 0, 5, 10);
	      robotWheel1.x = 25;
	      robotWheel1.y = -25;
	      var robotWheel2 = new createjs.Shape();
	      robotWheel2.graphics.beginFill("black").drawRect(0, 0, 5, 10);
	      robotWheel2.x = 25;
	      robotWheel2.y = 15;
	      var robotWheel3 = new createjs.Shape();
	      robotWheel3.graphics.beginFill("black").drawRect(0, 0, 5, 10);
	      robotWheel3.x = -30;
	      robotWheel3.y = 15;
	      var robotWheel4 = new createjs.Shape();
	      robotWheel4.graphics.beginFill("black").drawRect(0, 0, 5, 10);
	      robotWheel4.x = -30;
	      robotWheel4.y = -25;
	      var robotHead = new createjs.Shape();
	      robotHead.graphics.beginFill("yellow").drawPolyStar(0, 0, 20, 3, 0, -90);
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
	  }]);
	
	  return VirtualBot;
	}(createjs.Container);
	
	exports.default = VirtualBot;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map