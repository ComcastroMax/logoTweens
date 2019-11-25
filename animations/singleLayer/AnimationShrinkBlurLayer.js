(function() {
  this.AnimationShrinkBlurLayer = (function() {
    function AnimationShrinkBlurLayer(layer, delay) {
      if (delay == null) {
        delay = 0;
      }
      this.layer = layer;
      this.delay = delay;
      this.makeAnimations();
    }

    AnimationShrinkBlurLayer.prototype.start = function() {
      return this.shrinkBlur.start();
    };

    AnimationShrinkBlurLayer.prototype.makeAnimations = function() {
      var blurDelay, blurring, dur, expansion, restartDelay;
      dur = 1;
      expansion = 2;
      blurring = 50;
      blurDelay = 1.2 + this.delay;
      restartDelay = 3.2 - this.delay;
      this.layer.opacity = 0;
      this.layer.scaleX = this.layer.scaleY = expansion;
      this.layer.blur = blurring;
      this.shrinkBlur = new Animation({
        layer: this.layer,
        properties: {
          scaleX: 1,
          scaleY: 1,
          blur: 0,
          opacity: 1
        },
        curve: "ease-in",
        time: dur,
        delay: blurDelay
      });
      this.shrinkBlurReturn = new Animation({
        layer: this.layer,
        properties: {
          scaleX: expansion,
          scaleY: expansion,
          blur: blurring,
          opacity: 0
        },
        curve: "ease-out",
        time: dur / 2,
        delay: restartDelay
      });
      this.shrinkBlur.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.shrinkBlurReturn.start();
        };
      })(this));
      return this.shrinkBlurReturn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.shrinkBlur.start();
        };
      })(this));
    };

    return AnimationShrinkBlurLayer;

  })();

}).call(this);

