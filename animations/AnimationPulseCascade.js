(function() {
  this.AnimationPulseCascade = (function() {
    function AnimationPulseCascade(logo) {
      this.logo1 = logo;
      this.logo2 = this.logo1.copy();
      this.hideExtra(this.logo1);
      this.hideExtra(this.logo2);
    }

    AnimationPulseCascade.prototype.hideExtra = function(logoIn) {
      logoIn.cStar.visible = false;
      return logoIn.cMid.visible = false;
    };

    return AnimationPulseCascade;

  })();

}).call(this);

