(function() {
  this.AnimationSpin = (function() {
    function AnimationSpin(logo) {
      this.logo = logo;
      this.makeAnimations();
    }

    AnimationSpin.prototype.start = function() {
      return this.spinStar.start();

      /*
      		@spinIn.start()
      		@spinMid.start()
      		@spinOut.start()
       */
    };

    AnimationSpin.prototype.makeAnimations = function() {
      this.spinStar = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: 0,
          scaleY: 0
        },
        time: 1,
        curve: "cubic-bezier(0,0,.58,1)",
        delay: 1.5
      });

      /*
      		@spinIn = new Animation
      			layer: @logo.cIn
      			properties:
      				rotation: @counter() * 2
      			time: 2.5
      			curve: "cubic-bezier(.42,0,.58,1)"
      			delay: 2
      		
      		@spinMid = new Animation
      			layer: @logo.cMid
      			properties:
      				rotation: @clockwise() * 2
      			time: 2.5
      			#curve: "cubic-bezier(.42,0,1,1)"
      			#curve: "spring-dho(400, 200, 10, 0.1)"
      			#curve: "spring(150,12,0.01)"
      			delay: 2
      			curve: "cubic-bezier(.42,0,.58,1)"	
      				
      		@spinOut = new Animation
      			layer: @logo.cOut
      			properties:
      				rotation: @counter() * 2
      			time: 2.5
      			curve: "cubic-bezier(.42,0,.58,1)"	
      			delay: 2
       */
      return this.spinStar.on(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.logo.cStar.rotation = 0;
          return _this.spinStar.start();

          /*
          		@spinIn.on Events.AnimationEnd, =>
          			@logo.cIn.rotation = 0
          			@spinIn.start()
          			
          		@spinMid.on Events.AnimationEnd, =>
          			@logo.cMid.rotation = 0
          			@spinMid.start()
          			
          		@spinOut.on Events.AnimationEnd, =>
          			@logo.cOut.rotation = 0
          			@spinOut.start()
           */
        };
      })(this));
    };

    return AnimationSpin;

  })();

}).call(this);

