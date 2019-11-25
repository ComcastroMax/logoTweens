(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.AnimationSpring = (function(superClass) {
    extend(AnimationSpring, superClass);

    function AnimationSpring(logo) {
      AnimationSpring.__super__.constructor.call(this, logo);
      this.makeAnimations();
    }

    AnimationSpring.prototype.start = function() {
      AnimationSpring.__super__.start.call(this);
      this.anims[0].start();
      this.anims[1].start();
      this.anims[2].start();
      return this.anims[3].start();
    };

    AnimationSpring.prototype.makeAnimations = function() {
      var cInGrow, cInReset, cInShrink, cMidGrow, cMidReset, cMidShrink, cOutGrow, cOutReset, cOutShrink, cStarGrow, cStarReset, cStarShrink, growCurve, growDelay, growScale, growTime, myFrictionGrow, myFrictionShrink, myTensionGrow, myTensionShrink, myToleranceGrow, myToleranceShrink, myVelocityGrow, myVelocityShrink, resetCurve, resetDelay, resetTime, shrinkCurve, shrinkScale, shrinkTime, slinkyTime, starDelayExtra, starGrowExtra, starGrowTimeExtra;
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
      cInGrow = new Animation({
        layer: this.logo.cIn,
        properties: {
          scaleX: growScale,
          scaleY: growScale
        },
        curve: growCurve,
        delay: growDelay + slinkyTime * 2,
        time: growTime
      });
      cMidGrow = new Animation({
        layer: this.logo.cMid,
        properties: {
          scaleX: growScale,
          scaleY: growScale
        },
        curve: growCurve,
        delay: growDelay + slinkyTime,
        time: growTime
      });
      cOutGrow = new Animation({
        layer: this.logo.cOut,
        properties: {
          scaleX: growScale,
          scaleY: growScale
        },
        curve: growCurve,
        delay: growDelay,
        time: growTime
      });
      cStarGrow = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: growScale + starGrowExtra,
          scaleY: growScale + starGrowExtra
        },
        curve: growCurve,
        delay: growDelay + starDelayExtra,
        time: growTime + starGrowTimeExtra
      });
      cInShrink = new Animation({
        layer: this.logo.cIn,
        properties: {
          scaleX: shrinkScale,
          scaleY: shrinkScale
        },
        curve: shrinkCurve,
        time: shrinkTime
      });
      cMidShrink = new Animation({
        layer: this.logo.cMid,
        properties: {
          scaleX: shrinkScale,
          scaleY: shrinkScale
        },
        curve: shrinkCurve,
        time: shrinkTime
      });
      cOutShrink = new Animation({
        layer: this.logo.cOut,
        properties: {
          scaleX: shrinkScale,
          scaleY: shrinkScale
        },
        curve: shrinkCurve,
        time: shrinkTime
      });
      cStarShrink = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: shrinkScale,
          scaleY: shrinkScale
        },
        curve: shrinkCurve,
        time: shrinkTime
      });
      cInReset = new Animation({
        layer: this.logo.cIn,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        curve: resetCurve,
        time: resetTime,
        delay: resetDelay - slinkyTime * 2
      });
      cMidReset = new Animation({
        layer: this.logo.cMid,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        curve: resetCurve,
        time: resetTime,
        delay: resetDelay - slinkyTime
      });
      cOutReset = new Animation({
        layer: this.logo.cOut,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        curve: resetCurve,
        time: resetTime,
        delay: resetDelay
      });
      cStarReset = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        curve: resetCurve,
        time: resetTime,
        delay: resetDelay - starDelayExtra - starGrowTimeExtra
      });
      this.anims = [cInGrow, cMidGrow, cOutGrow, cStarGrow, cInShrink, cMidShrink, cOutShrink, cStarShrink, cInReset, cMidReset, cOutReset, cStarReset];
      cInGrow.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cInShrink.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cInShrink.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cInReset.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cMidGrow.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cMidShrink.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cMidShrink.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cMidReset.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cOutGrow.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cOutShrink.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cOutShrink.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cOutReset.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cStarGrow.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cStarShrink.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cStarShrink.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cStarReset.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      return cStarReset.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            cInGrow.start();
            cMidGrow.start();
            cOutGrow.start();
            return cStarGrow.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
    };

    return AnimationSpring;

  })(AnimationTween);

}).call(this);

