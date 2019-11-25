(function() {
  this.AnimationBlurSequence = (function() {
    function AnimationBlurSequence(logo) {
      this.logo = logo;
      this.makeAnimations();
    }

    AnimationBlurSequence.prototype.start = function() {
      this.blurStar.start();
      this.blurC.start();
      this.blurIn.start();
      return this.blurOut.start();
    };

    AnimationBlurSequence.prototype.makeAnimations = function() {
      this.blurStar = new AnimationShrinkBlurLayer(this.logo.cStar, 0);
      this.blurIn = new AnimationShrinkBlurLayer(this.logo.cIn, 0.4);
      this.blurC = new AnimationShrinkBlurLayer(this.logo.cMid, 0.8);
      return this.blurOut = new AnimationShrinkBlurLayer(this.logo.cOut, 1.2);
    };

    return AnimationBlurSequence;

  })();

}).call(this);

