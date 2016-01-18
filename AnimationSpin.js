(function() {
  Class(this.AnimationSpin({
    constructor: function(logo) {
      var resetIn, resetMid, resetOut, resetStar;
      this.logo = logo;
      this.spinStar = new Animation({
        layer: this.logo.cStar,
        properties: {
          rotation: counter * 3
        },
        time: 3,
        curve: "cubic-bezier(0,0,.58,1)",
        delay: 1.5
      });
      this.spinIn = new Animation({
        layer: this.logo.cIn,
        properties: {
          rotation: counter * 2
        },
        time: 2.5,
        curve: "cubic-bezier(.42,0,.58,1)",
        delay: 2
      });
      this.spinMid = new Animation({
        layer: this.logo.cMid,
        properties: {
          rotation: clockwise * 2
        },
        time: 2.5,
        delay: 2,
        curve: "cubic-bezier(.42,0,.58,1)"
      });
      this.spinOut = new Animation({
        layer: this.logo.cOut,
        properties: {
          rotation: counter * 2
        },
        time: 2.5,
        curve: "cubic-bezier(.42,0,.58,1)",
        delay: 2
      });
      this.spinStar.on(Events.AnimationEnd, function() {
        return resetStar();
      });
      this.spinIn.on(Events.AnimationEnd, function() {
        return resetIn();
      });
      this.spinMid.on(Events.AnimationEnd, function() {
        return resetMid();
      });
      this.spinOut.on(Events.AnimationEnd, function() {
        return resetOut();
      });
      resetStar = function() {
        this.logo.cStar.rotation = 0;
        return this.spinStar.start();
      };
      resetIn = function() {
        this.logo.cIn.rotation = 0;
        return this.spinIn.start();
      };
      resetMid = function() {
        this.logo.cMid.rotation = 0;
        return this.spinMid.start();
      };
      return resetOut = function() {
        this.logo.cOut.rotation = 0;
        return this.spinOut.start();
      };
    }
  }));

}).call(this);

