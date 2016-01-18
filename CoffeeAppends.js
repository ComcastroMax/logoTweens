
/*

#class for drawing the comcastro logo with each symnol as a different image and layer
 */

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.comcastroYellow = "#FEC71C";

  this.logoSourceSize = 720;

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
      var logoNudge, starNudge;
      starNudge = {
        x: -3.301,
        y: -10.022
      };
      logoNudge = {
        x: -23.1,
        y: 40.26
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
    };

    return AnimationSpring;

  })();

}).call(this);

(function() {
  var logo1, logo2, logo3, spin1, spin2;

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

  spin1 = new AnimationSpin(logo1);

  spin1.start();

  spin2 = new AnimationSpring(logo2);

  spin2.start();


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

