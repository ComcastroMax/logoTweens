(function() {
  this.AnimationSimpleBreathe = (function() {
    function AnimationSimpleBreathe(logo) {
      this.logo = logo;
      this.makeAnimations();
    }

    AnimationSimpleBreathe.prototype.start = function() {};

    AnimationSimpleBreathe.prototype.makeAnimations = function() {
      this.cStarSpin = new Animation({
        layer: this.logo.cStar,
        properties: {
          rotation: 360
        },
        time: 4
      });
      return this.cStarSpin.on(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.logo.cStar.rotation = 0;
          return _this.cStarSpin.start();
        };
      })(this));
    };

    return AnimationSimpleBreathe;

  })();

}).call(this);

