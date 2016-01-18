(function() {
  this.AnimationSimpleRotate = (function() {
    function AnimationSimpleRotate(logo) {
      this.logo = logo;
      this.makeAnimations();
    }

    AnimationSimpleRotate.prototype.start = function() {
      return this.cStarGrow.start();
    };

    AnimationSimpleRotate.prototype.makeAnimations = function() {
      var growCurve, growScale, growTime, shrinkCurve, shrinkTime;
      growScale = 1.1;
      growCurve = 'ease-in';
      shrinkCurve = 'ease-out';
      growTime = 0.2;
      shrinkTime = 0.2;
      this.cStarGrow = new Animation({
        layer: this.logo.cStar,
        properties: {
          xScale: growScale,
          yScale: growScale
        },
        time: growTime,
        curve: growCurve
      });
      this.cStarShrink = new Animation({
        layer: this.logo.cStar,
        properties: {
          xScale: 1,
          yScale: 1
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
          return _this.cStarGrow.start();
        };
      })(this));
    };

    return AnimationSimpleRotate;

  })();

}).call(this);

