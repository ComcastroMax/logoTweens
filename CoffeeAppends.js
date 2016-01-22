
/*

#class for drawing the comcastro logo with each symnol as a different image and layer
 */

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.comcastroYellow = "#FEC71C";

  this.logoSourceSize = 720;

  this.logoNudge = {
    x: -23.1,
    y: 40.26
  };

  this.LogoLayer = (function(superClass) {
    extend(LogoLayer, superClass);

    function LogoLayer(options) {
      this.options = options;
      LogoLayer.__super__.constructor.call(this, this.options);
      this.logoSize = 360;
      this.properties = {
        width: this.logoSize,
        height: this.logoSize,
        backgroundColor: comcastroYellow
      };
      this.addChildLayers();
    }

    LogoLayer.prototype.size = function(newSize) {
      this.logoSize = this.width = this.height = newSize;
      this.cScale.scaleX = this.cScale.scaleY = this.logoScale();
      return this.cScale.x = this.cScale.y = this.scaleNudge();
    };

    LogoLayer.prototype.logoScale = function() {
      return this.logoSize / logoSourceSize;
    };

    LogoLayer.prototype.scaleNudge = function() {
      return -(logoSourceSize - this.logoSize) / 2;
    };

    LogoLayer.prototype.addChildLayers = function() {
      var starNudge;
      starNudge = {
        x: -3.301,
        y: -10.022
      };
      this.cScale = new Layer({
        name: "scale",
        superLayer: this,
        backgroundColor: "",
        width: logoSourceSize,
        height: logoSourceSize,
        scaleX: this.logoScale(),
        scaleY: this.logoScale(),
        x: this.scaleNudge(),
        y: this.scaleNudge()
      });
      this.cPos = new Layer({
        name: "position",
        superLayer: this.cScale,
        backgroundColor: "",
        width: logoSourceSize,
        height: logoSourceSize,
        x: logoNudge.x,
        y: logoNudge.y
      });
      this.cIn = new Layer({
        name: "in",
        superLayer: this.cPos,
        image: "images/c-in.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
      this.cMid = new Layer({
        name: "mid",
        superLayer: this.cPos,
        image: "images/c-mid.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
      this.cOut = new Layer({
        name: "out",
        superLayer: this.cPos,
        image: "images/c-out.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
      return this.cStar = new Layer({
        name: "star",
        superLayer: this.cPos,
        image: "images/star.png",
        width: logoSourceSize,
        height: logoSourceSize,
        x: starNudge.x,
        y: starNudge.y
      });
    };

    return LogoLayer;

  })(Layer);

}).call(this);

(function() {
  this.AnimationSpin = (function() {
    function AnimationSpin(logo) {
      this.logo = logo;
      this.makeAnimations();
    }

    AnimationSpin.prototype.start = function() {
      this.spinStar.start();
      this.spinIn.start();
      this.spinMid.start();
      return this.spinOut.start();
    };

    AnimationSpin.prototype.makeAnimations = function() {
      var clockwise, counter, rotationCurve, rotationDelay, rotationTime, starCurve, starDelay, starTime;
      clockwise = -360;
      counter = 360;
      starDelay = 1.5;
      rotationDelay = 2;
      starTime = 3;
      rotationTime = 2.5;
      starCurve = "cubic-bezier(0,0,.58,1)";
      rotationCurve = "cubic-bezier(.42,0,.58,1)";
      this.spinStar = new Animation({
        layer: this.logo.cStar,
        properties: {
          rotation: counter * 3
        },
        curve: starCurve,
        time: starTime,
        delay: starDelay
      });
      this.spinIn = new Animation({
        layer: this.logo.cIn,
        properties: {
          rotation: counter * 2
        },
        curve: rotationCurve,
        time: rotationTime,
        delay: rotationDelay
      });
      this.spinMid = new Animation({
        layer: this.logo.cMid,
        properties: {
          rotation: clockwise * 2
        },
        curve: rotationCurve,
        time: rotationTime,
        delay: rotationDelay
      });
      this.spinOut = new Animation({
        layer: this.logo.cOut,
        properties: {
          rotation: counter * 2
        },
        curve: rotationCurve,
        time: rotationTime,
        delay: rotationDelay
      });
      this.spinStar.on(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.logo.cStar.rotation = 0;
          return _this.spinStar.start();
        };
      })(this));
      this.spinIn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.logo.cIn.rotation = 0;
          return _this.spinIn.start();
        };
      })(this));
      this.spinMid.on(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.logo.cMid.rotation = 0;
          return _this.spinMid.start();
        };
      })(this));
      return this.spinOut.on(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.logo.cOut.rotation = 0;
          return _this.spinOut.start();
        };
      })(this));
    };

    return AnimationSpin;

  })();

}).call(this);

(function() {
  this.AnimationSpring = (function() {
    function AnimationSpring(logo) {
      this.logo = logo;
      this.makeAnimations();
    }

    AnimationSpring.prototype.start = function() {
      this.cInGrow.start();
      this.cMidGrow.start();
      this.cOutGrow.start();
      return this.cStarGrow.start();
    };

    AnimationSpring.prototype.makeAnimations = function() {
      var growCurve, growDelay, growScale, growTime, myFrictionGrow, myFrictionShrink, myTensionGrow, myTensionShrink, myToleranceGrow, myToleranceShrink, myVelocityGrow, myVelocityShrink, resetCurve, resetDelay, resetTime, shrinkCurve, shrinkScale, shrinkTime, slinkyTime, starDelayExtra, starGrowExtra, starGrowTimeExtra;
      growScale = 1.2;
      starGrowExtra = 0.8;
      shrinkScale = 0;
      growDelay = 1.5;
      growTime = 0.2;
      starGrowTimeExtra = 0.1;
      shrinkTime = 0.25;
      resetTime = 0.2;
      resetDelay = 1.5;
      starDelayExtra = 0.28;
      slinkyTime = 0;
      myTensionGrow = 100;
      myFrictionGrow = 10;
      myVelocityGrow = 10;
      myToleranceGrow = 1;
      myTensionShrink = 150;
      myFrictionShrink = 50;
      myVelocityShrink = 10;
      myToleranceShrink = 1;
      growCurve = "cubic-bezier(0,0,.58,1)";
      shrinkCurve = growCurve;
      resetCurve = growCurve;
      this.cInGrow = new Animation({
        layer: this.logo.cIn,
        properties: {
          scaleX: growScale,
          scaleY: growScale
        },
        curve: growCurve,
        delay: growDelay + slinkyTime * 2,
        time: growTime
      });
      this.cMidGrow = new Animation({
        layer: this.logo.cMid,
        properties: {
          scaleX: growScale,
          scaleY: growScale
        },
        curve: growCurve,
        delay: growDelay + slinkyTime,
        time: growTime
      });
      this.cOutGrow = new Animation({
        layer: this.logo.cOut,
        properties: {
          scaleX: growScale,
          scaleY: growScale
        },
        curve: growCurve,
        delay: growDelay,
        time: growTime
      });
      this.cStarGrow = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: growScale + starGrowExtra,
          scaleY: growScale + starGrowExtra
        },
        curve: growCurve,
        delay: growDelay + starDelayExtra,
        time: growTime + starGrowTimeExtra
      });
      this.cInShrink = new Animation({
        layer: this.logo.cIn,
        properties: {
          scaleX: shrinkScale,
          scaleY: shrinkScale
        },
        curve: shrinkCurve,
        time: shrinkTime
      });
      this.cMidShrink = new Animation({
        layer: this.logo.cMid,
        properties: {
          scaleX: shrinkScale,
          scaleY: shrinkScale
        },
        curve: shrinkCurve,
        time: shrinkTime
      });
      this.cOutShrink = new Animation({
        layer: this.logo.cOut,
        properties: {
          scaleX: shrinkScale,
          scaleY: shrinkScale
        },
        curve: shrinkCurve,
        time: shrinkTime
      });
      this.cStarShrink = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: shrinkScale,
          scaleY: shrinkScale
        },
        curve: shrinkCurve,
        time: shrinkTime
      });
      this.cInReset = new Animation({
        layer: this.logo.cIn,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        curve: resetCurve,
        time: resetTime,
        delay: resetDelay - slinkyTime * 2
      });
      this.cMidReset = new Animation({
        layer: this.logo.cMid,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        curve: resetCurve,
        time: resetTime,
        delay: resetDelay - slinkyTime
      });
      this.cOutReset = new Animation({
        layer: this.logo.cOut,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        curve: resetCurve,
        time: resetTime,
        delay: resetDelay
      });
      this.cStarReset = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        curve: resetCurve,
        time: resetTime,
        delay: resetDelay - starDelayExtra - starGrowTimeExtra
      });
      this.cInGrow.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cInShrink.start();
        };
      })(this));
      this.cInShrink.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cInReset.start();
        };
      })(this));
      this.cMidGrow.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cMidShrink.start();
        };
      })(this));
      this.cMidShrink.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cMidReset.start();
        };
      })(this));
      this.cOutGrow.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cOutShrink.start();
        };
      })(this));
      this.cOutShrink.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cOutReset.start();
        };
      })(this));
      this.cStarGrow.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cStarShrink.start();
        };
      })(this));
      this.cStarShrink.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cStarReset.start();
        };
      })(this));
      return this.cStarReset.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.start();
        };
      })(this));

      /*
      		#wait for star reset
      		@cInReset.on Events.AnimationEnd, =>
      			@cInGrow.start()
      		@cOutReset.on Events.AnimationEnd, =>
      			@cOutGrow.start()
      		@cMidReset.on Events.AnimationEnd, =>
      			@cMidGrow.start()
       */
    };

    return AnimationSpring;

  })();

}).call(this);

(function() {
  this.AnimationSimplePulse = (function() {
    function AnimationSimplePulse(logo) {
      this.logo = logo;
      this.makeAnimations();
      this.logo.cIn.opacity = 0;
      this.logo.cOut.opacity = 0;
    }

    AnimationSimplePulse.prototype.start = function() {
      this.cInFadeIn.start();
      return this.cOutFadeIn.start();
    };

    AnimationSimplePulse.prototype.makeAnimations = function() {
      var fadeCurve, fadeDelay, fadeInTime, fadeOutTime, startDelay;
      fadeInTime = 0.3;
      fadeOutTime = 0.3;
      fadeDelay = 0.2;
      startDelay = 0.2;
      fadeCurve = "ease-in-out";
      this.cInFadeIn = new Animation({
        layer: this.logo.cIn,
        properties: {
          opacity: 1
        },
        curve: fadeCurve,
        time: fadeInTime,
        delay: startDelay
      });
      this.cOutFadeIn = new Animation({
        layer: this.logo.cOut,
        properties: {
          opacity: 1
        },
        curve: fadeCurve,
        time: fadeInTime,
        delay: fadeDelay + startDelay
      });
      this.cInFadeOut = new Animation({
        layer: this.logo.cIn,
        properties: {
          opacity: 0
        },
        curve: fadeCurve,
        time: fadeOutTime,
        delay: 0
      });
      this.cOutFadeOut = new Animation({
        layer: this.logo.cOut,
        properties: {
          opacity: 0
        },
        curve: fadeCurve,
        time: fadeOutTime,
        delay: 0
      });
      this.cInFadeIn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cInFadeOut.start();
        };
      })(this));
      this.cOutFadeIn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cOutFadeOut.start();
        };
      })(this));
      return this.cOutFadeOut.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.start();
        };
      })(this));
    };

    return AnimationSimplePulse;

  })();

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.AnimationPulseRotate = (function(superClass) {
    extend(AnimationPulseRotate, superClass);

    function AnimationPulseRotate(logo) {
      AnimationPulseRotate.__super__.constructor.call(this, logo);
      this.cOutFadeOut.on(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.rotatePulse();
          return _this.start();
        };
      })(this));
    }

    AnimationPulseRotate.prototype.rotatePulse = function() {
      var twoFifths;
      twoFifths = 144;
      this.logo.cIn.rotation = (this.logo.cIn.rotation + twoFifths) % 360;
      return this.logo.cOut.rotation = this.logo.cOut.rotation + twoFifths % 360;
    };

    return AnimationPulseRotate;

  })(AnimationSimplePulse);

}).call(this);

(function() {
  this.AnimationSimpleRotate = (function() {
    function AnimationSimpleRotate(logo) {
      this.logo = logo;
      this.makeAnimations();
    }

    AnimationSimpleRotate.prototype.start = function() {
      return this.cMidRotate.start();
    };

    AnimationSimpleRotate.prototype.makeAnimations = function() {
      var clockwise, counter, rotationTime;
      rotationTime = 5;
      clockwise = 360;
      counter = -360;
      this.cMidRotate = new Animation({
        layer: this.logo.cMid,
        properties: {
          rotation: clockwise
        },
        time: rotationTime
      });

      /*
      		@cStarRotate = new Animation
      			layer: @logo.cStar
      			properties:
      				rotation: clockwise
      			time: rotationTime
       */
      return this.cMidRotate.on(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.logo.cMid.rotation = 0;
          return _this.cMidRotate.start();
        };
      })(this));

      /*
      		#omitting star when playing with the pulse
      		@cStarRotate.on Events.AnimationEnd, =>
      			@logo.cStar.rotation = 0
      			@cStarRotate.start()
       */
    };

    return AnimationSimpleRotate;

  })();

}).call(this);

(function() {
  this.AnimationSimpleBreathe = (function() {
    function AnimationSimpleBreathe(logo) {
      this.logo = logo;
      this.makeAnimations();
    }

    AnimationSimpleBreathe.prototype.start = function() {
      return this.cStarGrow.start();
    };

    AnimationSimpleBreathe.prototype.makeAnimations = function() {
      var growCurve, growScale, growTime, shrinkCurve, shrinkTime;
      growScale = 0.9;
      growCurve = "ease-in";
      shrinkCurve = "ease-out";
      growTime = 0.4;
      shrinkTime = 0.4;
      this.cStarGrow = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: growScale,
          scaleY: growScale
        },
        time: growTime,
        curve: growCurve
      });
      this.cStarShrink = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        time: shrinkTime,
        curve: shrinkCurve
      });
      this.cStarGrow.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cStarShrink.start();
        };
      })(this));
      return this.cStarShrink.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return Utils.delay(0.2, function() {
            return _this.cStarGrow.start();
          });
        };
      })(this));
    };

    return AnimationSimpleBreathe;

  })();

}).call(this);

(function() {
  this.AnimationDanger = (function() {
    function AnimationDanger(logo) {
      this.logo = logo;
      this.yellowHsl = tinycolor(comcastroYellow).toHsl();
    }

    AnimationDanger.prototype.startChoppy = function() {
      return this.weirdLoop();
    };

    AnimationDanger.prototype.startSmooth = function() {
      return this.animateCrazy();
    };

    AnimationDanger.prototype.weirdLoop = function() {
      return Utils.delay(0.1, (function(_this) {
        return function() {
          return _this.makeCrazy();
        };
      })(this));
    };

    AnimationDanger.prototype.makeCrazy = function() {
      var fakeLevel;
      this.logo.cStar.rotation = Utils.randomNumber(0, 72);
      this.logo.cMid.rotation = Utils.randomNumber(-15, 15);
      this.logo.cIn.rotation = this.logo.cOut.rotation = Utils.randomNumber(-15, 15);
      this.logo.cPos.x = logoNudge.x + Utils.randomNumber(-10, 10);
      this.logo.cPos.y = logoNudge.y + Utils.randomNumber(-10, 10);
      fakeLevel = Utils.randomNumber(0, 3);
      return this.weirdLoop();
    };

    AnimationDanger.prototype.animateCrazy = function() {
      var cInRotation, rotateRayScalar, rotateScalar, shakeDur, shakeScalar, starScalar;
      shakeDur = 0.1;
      shakeScalar = 15;
      rotateScalar = 20;
      rotateRayScalar = 15;
      starScalar = 36;
      this.rotationStar = new Animation({
        layer: this.logo.cStar,
        properties: {
          rotation: Utils.randomNumber(-starScalar, starScalar)
        },
        time: shakeDur,
        curve: "ease-in-out"
      });
      cInRotation = Utils.randomNumber(-rotateRayScalar, rotateRayScalar);
      this.rotationIn = new Animation({
        layer: this.logo.cIn,
        properties: {
          rotation: cInRotation
        },
        time: shakeDur,
        curve: "ease-in-out"
      });
      this.rotationOut = new Animation({
        layer: this.logo.cOut,
        properties: {
          rotation: cInRotation + Utils.randomNumber(-10, 10)
        },
        time: shakeDur,
        curve: "ease-in-out"
      });
      this.rotationMid = new Animation({
        layer: this.logo.cMid,
        properties: {
          rotation: Utils.randomNumber(-rotateScalar, rotateScalar)
        },
        time: shakeDur,
        curve: "ease-in-out"
      });
      this.shakes = new Animation({
        layer: this.logo.cPos,
        properties: {
          x: logoNudge.x + Utils.randomNumber(-shakeScalar, shakeScalar),
          y: logoNudge.y + Utils.randomNumber(-shakeScalar, shakeScalar)
        },
        time: shakeDur,
        curve: "ease-in-out"
      });

      /*
      		fakeLevel = Utils.randomNumber(0,3)
      		
      		@logo.cIn.visible = (fakeLevel > 1) #false if fakeLevel < 1 else @logo.cIn.visible = true 
      		@logo.cOut.visible = (fakeLevel > 2) #false if fakeLevel < 2 else @logo.cOut.visible = true
       */

      /*
      		#@yellowHsl.l = Utils.randomNumber(0.4,0.6)
      		#newYellow = tinycolor(@yellowHsl).toHexString()
      		#@logo.backgroundColor = newYellow
      		
      		@shade = new Animation
      			layer: logo
      			properties: 
      				backgroundColor: "red"
      			time: shakeDur
      			
      		@logo.animate
      			properties: 
      				backgroundColor: "red"
      			time:shakeDur
       */
      this.rotationStar.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.animateCrazy();
        };
      })(this));
      return this.startAll();
    };

    AnimationDanger.prototype.startAll = function() {
      this.rotationStar.start();
      this.rotationIn.start();
      this.rotationOut.start();
      this.rotationMid.start();
      return this.shakes.start();
    };

    return AnimationDanger;

  })();

}).call(this);

(function() {
  this.AnimationNodMusic = (function() {
    function AnimationNodMusic(logo) {
      this.logo = logo;
      this.makeAnimations();
    }

    AnimationNodMusic.prototype.start = function() {
      this.cMidRotateUp.start();
      return this.weirdLoop();
    };

    AnimationNodMusic.prototype.makeAnimations = function() {
      var rotateDown, rotateDownTime, rotateUp, rotateUpTime;
      rotateUp = -20;
      rotateDown = 20;
      rotateUpTime = 0.5;
      rotateDownTime = 0.5;
      this.cMidRotateUp = new Animation({
        layer: this.logo.cPos,
        properties: {
          rotation: rotateUp
        },
        time: rotateUpTime,
        curve: "ease-out"
      });
      this.cMidRotateDown = new Animation({
        layer: this.logo.cPos,
        properties: {
          rotation: rotateDown
        },
        time: rotateDownTime,
        curve: "cubic-bezier(.74,.24,.83,.67)"
      });
      this.cMidRotateUp.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cMidRotateDown.start();
        };
      })(this));
      return this.cMidRotateDown.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cMidRotateUp.start();
        };
      })(this));
    };

    AnimationNodMusic.prototype.weirdLoop = function() {
      return Utils.delay(0.1, (function(_this) {
        return function() {
          return _this.makeCrazy();
        };
      })(this));
    };

    AnimationNodMusic.prototype.makeCrazy = function() {
      var fakeLevel;
      fakeLevel = Utils.randomNumber(0, 3);
      this.logo.cIn.visible = fakeLevel > 1;
      this.logo.cOut.visible = fakeLevel > 2;
      return this.weirdLoop();
    };

    return AnimationNodMusic;

  })();

}).call(this);

(function() {
  this.AnimationBreathePulseRotate = (function() {
    function AnimationBreathePulseRotate(logo) {
      this.logo = logo;
      this.breathe = new AnimationSimpleBreathe(this.logo);
      this.pulse = new AnimationPulseRotate(this.logo);
      this.rotate = new AnimationSimpleRotate(this.logo);
    }

    AnimationBreathePulseRotate.prototype.start = function() {
      this.breathe.start();
      this.pulse.start();
      return this.rotate.start();
    };

    return AnimationBreathePulseRotate;

  })();

}).call(this);

(function() {
  this.AnimationRays = (function() {
    function AnimationRays(logo) {
      this.logo = logo;
      this.makeAnimations();
      this.logo.cIn.opacity = 0;
      this.logo.cOut.opacity = 0;
    }

    AnimationRays.prototype.start = function() {
      this.cInFadeIn.start();
      return this.cOutFadeIn.start();
    };

    AnimationRays.prototype.makeAnimations = function() {
      var fadeCurve, fadeDelay, fadeInTime, fadeOutTime, in1, in2, in3, out1, out2, out3, out4, startDelay;
      in1 = this.logo.cIn.copy();
      in1.superLayer = this.logo.cIn;
      in1.rotation = 72;
      in2 = this.logo.cIn.copy();
      in2.superLayer = this.logo.cIn;
      in2.rotation = 72 * 2;
      in3 = this.logo.cIn.copy();
      in3.superLayer = this.logo.cIn;
      in3.rotation = 72 * 3;
      out4 = this.logo.cIn.copy();
      out4.superLayer = this.logo.cIn;
      out4.rotation = 72 * 4;
      out1 = this.logo.cOut.copy();
      out1.superLayer = this.logo.cOut;
      out1.rotation = 72;
      out2 = this.logo.cOut.copy();
      out2.superLayer = this.logo.cOut;
      out2.rotation = 72 * 2;
      out3 = this.logo.cOut.copy();
      out3.superLayer = this.logo.cOut;
      out3.rotation = 72 * 3;
      out4 = this.logo.cOut.copy();
      out4.superLayer = this.logo.cOut;
      out4.rotation = 72 * 4;
      fadeInTime = 0.3;
      fadeOutTime = 0.3;
      fadeDelay = 0.2;
      startDelay = 0.2;
      fadeCurve = "ease-in-out";
      this.cInFadeIn = new Animation({
        layer: this.logo.cIn,
        properties: {
          opacity: 1
        },
        curve: fadeCurve,
        time: fadeInTime,
        delay: startDelay
      });
      this.cOutFadeIn = new Animation({
        layer: this.logo.cOut,
        properties: {
          opacity: 1
        },
        curve: fadeCurve,
        time: fadeInTime,
        delay: fadeDelay + startDelay
      });
      this.cInFadeOut = new Animation({
        layer: this.logo.cIn,
        properties: {
          opacity: 0
        },
        curve: fadeCurve,
        time: fadeOutTime,
        delay: 0
      });
      this.cOutFadeOut = new Animation({
        layer: this.logo.cOut,
        properties: {
          opacity: 0
        },
        curve: fadeCurve,
        time: fadeOutTime,
        delay: 0
      });
      this.cInFadeIn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cInFadeOut.start();
        };
      })(this));
      this.cOutFadeIn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cOutFadeOut.start();
        };
      })(this));

      /*
      		#wait for cOut fade out
      		@cInFadeOut.on Events.AnimationEnd, =>
      			@cInFadeIn.start()
       */
      return this.cOutFadeOut.on(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.rotatePulse();
          return _this.start();
        };
      })(this));
    };

    AnimationRays.prototype.rotatePulse = function() {
      var twoFifths;
      twoFifths = 144;
      this.logo.cIn.rotation = (this.logo.cIn.rotation + twoFifths) % 360;
      return this.logo.cOut.rotation = this.logo.cOut.rotation + twoFifths % 360;
    };

    return AnimationRays;

  })();

}).call(this);

(function() {
  this.AnimationPulseCascade = (function() {
    function AnimationPulseCascade(logo) {
      this.logo1 = logo;
      this.logo2 = logo.copy();
      this.hideExtra(this.logo1);
      this.hideExtra(this.logo2);
    }

    AnimationPulseCascade.prototype.hideExtra = function(logoIn) {
      logoIn.cStar.visible = false;
      return logoIn.cMid.visible = false;
    };

    return AnimationPulseCascade;

  })();

}).call(this);

(function() {
  var danger, logo1, logo2, logo3, logo4, logo5, logo6, nod, pulseBreathe, spin, spring;

  logo1 = new LogoLayer({
    x: 40,
    y: 40
  });

  logo2 = new LogoLayer({
    x: 440,
    y: 40
  });

  logo3 = new LogoLayer({
    x: 40,
    y: 440
  });

  logo4 = new LogoLayer({
    x: 440,
    y: 440
  });

  logo5 = new LogoLayer({
    x: 40,
    y: 840
  });

  logo6 = new LogoLayer({
    x: 440,
    y: 840
  });


  /*
  logo7 = new LogoLayer
  	x: 40
  	y: 1240
  	
  logo8 = new LogoLayer
  	x: 440
  	y: 1240
   */

  spin = new AnimationSpin(logo1);

  spin.start();

  spring = new AnimationSpring(logo2);

  spring.start();

  pulseBreathe = new AnimationBreathePulseRotate(logo3);

  pulseBreathe.start();

  nod = new AnimationNodMusic(logo4);

  nod.start();

  danger = new AnimationDanger(logo5);

  danger.startSmooth();


  /*
   * Define a set of states with names (the original state is 'default')
  logo1.states.add
  	second: 
  		y:100
  		scale:0.6
  		rotationZ:180
  		x:Screen.width/2 - 256/2
  		
  	third:
  		y:300
  		scale:1.3
  		#blur:4
  		x:Screen.width/2 - 256/2
  		
  	fourth: 
  		y:200
  		scale:0.9
  		#blur:2
  		rotationZ:200
  		x:Screen.width/2 - 256/2
   */

}).call(this);

(function() {


}).call(this);

