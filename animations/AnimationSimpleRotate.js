(function() {
  this.AnimationPulse = (function() {
    function AnimationPulse(logo) {
      this.logo = logo;
      this.makeAnimations();
    }

    AnimationPulse.prototype.start = function() {
      this.cMidRotate.start();
      return this.cStarRotate.start();
    };

    AnimationPulse.prototype.makeAnimations = function() {
      ({
        rotationTime: 4,
        counter: -360
      });
      this.cMidRotate = new Animation({
        layer: this.logo.cMid,
        properties: {
          rotation: counter
        },
        time: rotationTime
      });
      this.cStarRotate = new Animation({
        layer: this.logo.cStar,
        properties: {
          rotation: counter
        },
        time: rotationTime
      });
      this.cMidRotate.on(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.logo.cMid.rotation = 0;
          return _this.cMidRotate.start();
        };
      })(this));
      return this.cStarRotate.on(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.logo.cStar.rotation = 0;
          return _this.cStarRotate.start();
        };
      })(this));
    };

    return AnimationPulse;

  })();

}).call(this);

