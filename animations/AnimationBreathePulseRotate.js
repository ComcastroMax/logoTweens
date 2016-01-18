(function() {
  this.AnimationBreathePulseRotate = (function() {
    function AnimationBreathePulseRotate(logo) {
      this.logo = logo;
      this.makeAnimations();
      this.logo.cIn.opacity = 0;
      this.logo.cOut.opacity = 0;
    }

    AnimationBreathePulseRotate.prototype.start = function() {
      this.cInFadeIn.start();
      this.cOutFadeIn.start();
      return this.cStarGrow.start();
    };

    AnimationBreathePulseRotate.prototype.makeAnimations = function() {
      var fadeCurve, fadeDelay, fadeInTime, fadeOutTime, growCurve, growScale, growTime, shrinkCurve, shrinkTime, startDelay;
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
      this.cStarGrow.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cStarShrink.start();
        };
      })(this));
      return this.cOutFadeOut.on(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.rotatePulse();
          return _this.start();
        };
      })(this));
    };

    AnimationBreathePulseRotate.prototype.rotatePulse = function() {
      var twoFifths;
      twoFifths = 144;
      this.logo.cIn.rotation = (this.logo.cIn.rotation + twoFifths) % 360;
      return this.logo.cOut.rotation = this.logo.cOut.rotation + twoFifths % 360;
    };

    return AnimationBreathePulseRotate;

  })();

}).call(this);

