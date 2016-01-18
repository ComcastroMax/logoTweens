(function() {
  this.AnimationSpin = (function() {
    function AnimationSpin(logo) {
      this.logo = logo;
      this.makeAnimations();
      this.logo.cIn.opacity = 0;
      this.logo.cOut.opacity = 0;
    }

    AnimationSpin.prototype.start = function() {
      this.cInFadeIn.start();
      return this.cOutFadeIn.start();
    };

    AnimationSpin.prototype.makeAnimations = function() {
      var fadeCurve, fadeDelay, fadeInTime, fadeOutTime;
      fadeInTime = 0.3;
      fadeOutTime = 0.3;
      fadeCurve = "cubic-bezier(.42,0,.58,1)";
      fadeDelay = 0.15;
      this.cInFadeIn = new Animation({
        layer: this.logo.cIn,
        properties: {
          opacity: 1
        },
        curve: fadeCurve,
        time: fadeInTime,
        delay: 0
      });
      this.cOutFadeIn = new Animation({
        layer: this.logo.cOut,
        properties: {
          opacity: 1
        },
        curve: fadeCurve,
        time: fadeInTime,
        delay: fadeDelay
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

    return AnimationSpin;

  })();

}).call(this);

