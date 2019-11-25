(function() {
  this.getAnimation1 = function(logo) {
    return new AnimationSpin(logo);
  };

  this.getAnimation2 = function(logo) {
    return new AnimationSpring(logo);
  };

  this.getAnimation3 = function(logo) {
    return new AnimationBreathePulseRotateSync(logo);
  };

  this.getAnimation4 = function(logo) {
    return new AnimationNodMusic(logo);
  };

  this.getAnimation5 = function(logo) {
    return new AnimationDanger(logo);
  };

  this.getAnimation6 = function(logo) {
    return new AnimationBlurSequence(logo);
  };

}).call(this);

