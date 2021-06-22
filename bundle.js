/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/border.js":
/*!**********************!*\
  !*** ./js/border.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Border)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Border = /*#__PURE__*/function () {
  function Border(x, y, width, height, type) {
    _classCallCheck(this, Border);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
  }

  _createClass(Border, [{
    key: "draw",
    value: function draw(ctx) {
      if (this.type === 1) {
        ctx.fillStyle = "green";
      } else if (this.type === 2) {
        ctx.fillStyle = "brown";
      }

      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }]);

  return Border;
}();



/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ "./js/moving_object.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./js/player.js");
/* harmony import */ var _border__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./border */ "./js/border.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);

    this.DIM_X = 1200;
    this.DIM_Y = 600;
    this.keys = {
      upKey: false,
      downKey: false,
      leftKey: false,
      rightKey: false
    };
    this.player = new _player__WEBPACK_IMPORTED_MODULE_1__.default(this);
    this.borders = [];
    this.populateBorders();
  }

  _createClass(Game, [{
    key: "populateBorders",
    value: function populateBorders() {
      for (var i = 0; i < 12; i++) {
        this.borders.push(new _border__WEBPACK_IMPORTED_MODULE_2__.default(0 + 100 * i, this.DIM_Y - 100, 100, 100, 1));
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      //background
      ctx.fillStyle = "lightblue";
      ctx.fillRect(0, 0, 1200, 600);
      this.handleCollisions(); //moving object

      this.player.draw(ctx); //Borders

      this.borders.forEach(function (border) {
        border.draw(ctx);
      }); //draw circle
      // ctx.beginPath();
      // ctx.arc(10, 10, 10, 0, 2 * Math.PI);
      // ctx.strokeStyle = "red";
      // ctx.stroke();
      // ctx.fillStyle = "red";
      // ctx.fill();
    }
  }, {
    key: "handleCollisions",
    value: function handleCollisions() {
      var _this = this;

      this.player.handleGameScreenCollision();
      this.borders.forEach(function (border) {
        _this.player.handleCollision(border);
      });
    }
  }, {
    key: "step",
    value: function step() {
      this.player.step();
    }
  }]);

  return Game;
}();



/***/ }),

/***/ "./js/game_view.js":
/*!*************************!*\
  !*** ./js/game_view.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameView)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./js/game.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var GameView = /*#__PURE__*/function () {
  function GameView() {
    _classCallCheck(this, GameView);

    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1200;
    this.canvas.height = 600;
    this.game = new _game__WEBPACK_IMPORTED_MODULE_0__.default();
  }

  _createClass(GameView, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.bindKeyHandlers();
      setInterval(function () {
        _this.game.step(), _this.game.draw(_this.ctx);
      }, 1000 / 30);
    }
  }, {
    key: "bindKeyHandlers",
    value: function bindKeyHandlers() {
      var _this2 = this;

      document.addEventListener("keydown", function (e) {
        if (e.key === "w") {
          _this2.game.keys.upKey = true;
        } else if (e.key === "a") {
          _this2.game.keys.leftKey = true;
        } else if (e.key === "s") {
          _this2.game.keys.downKey = true;
        } else if (e.key === "d") {
          _this2.game.keys.rightKey = true;
        }
      });
      document.addEventListener("keyup", function (e) {
        if (e.key === "w") {
          _this2.game.keys.upKey = false;
        } else if (e.key === "a") {
          _this2.game.keys.leftKey = false;
        } else if (e.key === "s") {
          _this2.game.keys.downKey = false;
        } else if (e.key === "d") {
          _this2.game.keys.rightKey = false;
        }
      });
    }
  }]);

  return GameView;
}();



/***/ }),

/***/ "./js/moving_object.js":
/*!*****************************!*\
  !*** ./js/moving_object.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MovingObject)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MovingObject = /*#__PURE__*/function () {
  function MovingObject(x, y, width, height, game) {
    _classCallCheck(this, MovingObject);

    this.game = game;
    this.width = width;
    this.height = height;
    this.vel = {
      x: 0,
      y: 0
    };
    this.pos = {
      x: x,
      y: y
    };
  }

  _createClass(MovingObject, [{
    key: "update",
    value: function update() {}
  }, {
    key: "step",
    value: function step() {
      this.update();
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = "blue"; // console.log(this.pos.x);

      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }]);

  return MovingObject;
}();



/***/ }),

/***/ "./js/player.js":
/*!**********************!*\
  !*** ./js/player.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ "./js/moving_object.js");
/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sprite */ "./js/sprite.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var Player = /*#__PURE__*/function (_MovingObject) {
  _inherits(Player, _MovingObject);

  var _super = _createSuper(Player);

  function Player(game) {
    var _this;

    _classCallCheck(this, Player);

    _this = _super.call(this, game.DIM_X / 2 - 50 / 2, //x
    game.DIM_Y - 100 - 110, //y
    50, //width
    100, //height
    game);
    _this.jumping = false;
    _this.maxMoveSpeed = 10;
    _this.maxFallSpeed = 15;
    _this.friction = 0.3;
    _this.sprite = new _sprite__WEBPACK_IMPORTED_MODULE_1__.default();
    return _this;
  }

  _createClass(Player, [{
    key: "update",
    value: function update() {
      var _this$game$keys = this.game.keys,
          upKey = _this$game$keys.upKey,
          leftKey = _this$game$keys.leftKey,
          rightKey = _this$game$keys.rightKey; //downKey not used
      //Handle Horizontal Movement

      this.walk(leftKey, rightKey); //jump

      this.jump(upKey); //gravity

      this.vel.y <= this.maxFallSpeed ? this.vel.y += 2 : "";
      this.vel.x = Math.round(this.vel.x);
      this.vel.y = Math.round(this.vel.y);
      this.sprite.update();
    }
  }, {
    key: "walk",
    value: function walk(leftKey, rightKey) {
      if (!leftKey && !rightKey || leftKey && rightKey) {
        this.vel.x *= this.friction;
      } //only if left key is pressed and less than max speed
      else if (leftKey && this.vel.x > -this.maxMoveSpeed) {
          this.vel.x -= 1;
        } //only if right key is pressed and less than max speed
        else if (rightKey && this.vel.x < this.maxMoveSpeed) {
            this.vel.x += 1;
          }
    }
  }, {
    key: "jump",
    value: function jump(upKey) {
      if (upKey && !this.jumping) {
        this.vel.y = -15;
        this.jumping = true;
      }
    }
  }, {
    key: "handleGameScreenCollision",
    value: function handleGameScreenCollision() {
      if (this.pos.x < 0) this.pos.x = 0;else if (this.pos.x + this.width > this.game.DIM_X) this.pos.x = this.game.DIM_X - this.width;
      if (this.pos.y < 0) this.pos.y = 0;else if (this.pos.y + this.height > this.game.DIM_Y) this.pos.y = this.game.DIM_Y - this.height;
    }
  }, {
    key: "handleCollision",
    value: function handleCollision(other) {
      // need to check for intersection
      //Handle placement
      if (this.pos.y + this.height >= other.y) {
        this.pos.y = other.y - this.height;
        this.vel.y = 0;
        this.jumping = false;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = "blue"; // console.log(this.pos.x);

      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); //Sprites WIP
      //this.sprite.draw(ctx, this.pos.x, this.pos.y)
    }
  }]);

  return Player;
}(_moving_object__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./js/sprite.js":
/*!**********************!*\
  !*** ./js/sprite.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sprite)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sprite = /*#__PURE__*/function () {
  function Sprite() {
    _classCallCheck(this, Sprite);

    this.spriteWidth = 1280;
    this.spriteHeight = 110;
    this.cols = 8;
    this.rows = 1;
    this.width = this.spriteWidth / this.cols;
    this.height = this.spriteHeight / this.rows;
    this.curFrame = 0;
    this.frameCount = 8;
    this.srcX = 0;
    this.srcY = 0; //this.speed = 12;

    this.sprite = new Image();
    this.sprite.src = "./assets/Idle.png";
  }

  _createClass(Sprite, [{
    key: "update",
    value: function update() {
      this.curFrame = (this.curFrame + .25) % this.frameCount;
      this.srcX = Math.floor(this.curFrame) * this.width;
    }
  }, {
    key: "draw",
    value: function draw(ctx, x, y) {
      ctx.drawImage(this.sprite, this.srcX, this.srcY, this.width, this.height, x, y, this.width, this.height);
    }
  }]);

  return Sprite;
}();



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ "./js/moving_object.js");
/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_view */ "./js/game_view.js");


document.addEventListener("DOMContentLoaded", function () {
  console.log("Webpack is working");
  var gameview = new _game_view__WEBPACK_IMPORTED_MODULE_1__.default();
  gameview.start(); // let moving_object = new MovingObject(GAME_WIDTH, GAME_HEIGHT)
  // moving_object.draw(ctx);
  // ctx.fillStyle = "blue"
  // ctx.fillRect(0, 0, 20, 20)
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map