(function() {
  this.AnimationNodMusic = (function() {
    function AnimationNodMusic(logo) {
      this.logo = logo;
      this.makeAnimations();
    }

    AnimationNodMusic.prototype.start = function() {
      return cMidRotateUp.start();
    };

    AnimationNodMusic.prototype.makeAnimations = function() {
      var rotateDown, rotateUp, rotationTime;
      rotateUp = 30;
      rotateDown = 0;
      rotationTime = 0.2;
      this.cMidRotateUp = new Animation({
        layer: this.logo.cMid,
        properties: {
          rotation: Rotateup
        },
        time: rotationTime,
        curve: "ease-out"
      });
      this.cMidRotateDown = new Animation({
        layer: this.logo.cMid,
        properties: {
          rotation: rotateDown
        },
        time: rotationTime,
        curve: "ease-in"
      });
      this.cMidRotateUp.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cMidRotateDown.start();
        };
      })(this));
      return this.cStarRotate.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cMidRotateUp.start();
        };
      })(this));
    };

    return AnimationNodMusic;

  })();

}).call(this);

