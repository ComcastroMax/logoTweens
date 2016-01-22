(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.AnimationPulseRotate = (function(superClass) {
    extend(AnimationPulseRotate, superClass);

    function AnimationPulseRotate(logo) {
      AnimationPulseRotate.__super__.constructor.call(this, logo);
      this.cOutFadeOut.on(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.rotatePulse();
          return _this.start();
        };
      })(this));
    }

    AnimationPulseRotate.prototype.rotatePulse = function() {
      var twoFifths;
      twoFifths = 144;
      this.logo.cIn.rotation = (this.logo.cIn.rotation + twoFifths) % 360;
      return this.logo.cOut.rotation = this.logo.cOut.rotation + twoFifths % 360;
    };

    return AnimationPulseRotate;

  })(AnimationSimplePulse);

}).call(this);

