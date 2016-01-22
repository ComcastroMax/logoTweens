(function() {
  this.AnimationPulse = (function() {
    function AnimationPulse(logo) {
      this.logo = logo;
      this.makeAnimations();
      this.logo.cIn.opacity = 0;
      this.logo.cOut.opacity = 0;
    }

    AnimationPulse.prototype.start = function() {
      this.cInFadeIn.start();
      return this.cOutFadeIn.start();
    };

    AnimationPulse.prototype.makeAnimations = function() {
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

    AnimationPulse.prototype.rotatePulse = function() {
      var twoFifths;
      twoFifths = 144;
      this.logo.cIn.rotation = (this.logo.cIn.rotation + twoFifths) % 360;
      return this.logo.cOut.rotation = this.logo.cOut.rotation + twoFifths % 360;
    };

    return AnimationPulse;

  })();

}).call(this);

