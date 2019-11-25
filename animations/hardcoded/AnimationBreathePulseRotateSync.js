(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.AnimationBreathePulseRotateSync = (function(superClass) {
    extend(AnimationBreathePulseRotateSync, superClass);

    function AnimationBreathePulseRotateSync(logo) {
      this.breathePulseStart = bind(this.breathePulseStart, this);
      AnimationBreathePulseRotateSync.__super__.constructor.call(this, logo);
      this.makeAnimations();
      this.logo.cIn.opacity = 0;
      this.logo.cOut.opacity = 0;
    }

    AnimationBreathePulseRotateSync.prototype.start = function() {
      AnimationBreathePulseRotateSync.__super__.start.call(this);
      this.breathePulseStart();
      return this.anims[6].start();
    };

    AnimationBreathePulseRotateSync.prototype.makeAnimations = function() {
      var cInFadeIn, cInFadeOut, cOutFadeIn, cOutFadeOut, cStarGrow, cStarShrink, fadeCurve, fadeDelay, fadeInTime, fadeOutTime, growCurve, growScale, growTime, rotation, shrinkCurve, shrinkTime, startDelay;
      fadeInTime = 0.3;
      fadeOutTime = 0.3;
      fadeDelay = 0.2;
      startDelay = 0.2;
      fadeCurve = "ease-in-out";
      growScale = 0.9;
      growCurve = "ease-in";
      shrinkCurve = "ease-out";
      growTime = 0.4;
      shrinkTime = 0.4;
      cInFadeIn = new Animation({
        layer: this.logo.cIn,
        properties: {
          opacity: 1
        },
        curve: fadeCurve,
        time: fadeInTime
      });
      cOutFadeIn = new Animation({
        layer: this.logo.cOut,
        properties: {
          opacity: 1
        },
        curve: fadeCurve,
        time: fadeInTime
      });
      cInFadeOut = new Animation({
        layer: this.logo.cIn,
        properties: {
          opacity: 0
        },
        curve: fadeCurve,
        time: fadeOutTime
      });
      cOutFadeOut = new Animation({
        layer: this.logo.cOut,
        properties: {
          opacity: 0
        },
        curve: fadeCurve,
        time: fadeOutTime
      });
      cStarGrow = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: growScale,
          scaleY: growScale
        },
        time: growTime,
        curve: growCurve
      });
      cStarShrink = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        time: shrinkTime,
        curve: shrinkCurve
      });
      rotation = new AnimationSimpleRotate(this.logo);
      this.anims = [cInFadeIn, cOutFadeIn, cInFadeOut, cOutFadeOut, cStarGrow, cStarShrink, rotation];
      cInFadeIn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cInFadeOut.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cOutFadeIn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cOutFadeOut.start();
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
      return cOutFadeOut.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            _this.rotatePulse();
            return _this.breathePulseStart();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
    };

    AnimationBreathePulseRotateSync.prototype.breathePulseStart = function() {
      Utils.delay(0.2, (function(_this) {
        return function() {
          if (!_this.halt) {
            return _this.anims[0].start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      Utils.delay(0.4, (function(_this) {
        return function() {
          if (!_this.halt) {
            return _this.anims[1].start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      return this.anims[4].start();
    };

    AnimationBreathePulseRotateSync.prototype.rotatePulse = function() {
      var twoFifths;
      twoFifths = 144;
      this.logo.cIn.rotation = (this.logo.cIn.rotation + twoFifths) % 360;
      return this.logo.cOut.rotation = this.logo.cOut.rotation + twoFifths % 360;
    };

    return AnimationBreathePulseRotateSync;

  })(AnimationTween);

}).call(this);

