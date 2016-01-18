
/*

#class for drawing the comcastro logo with each symnol as a different image and layer
 */

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.comcastroYellow = "#FEC71C";

  this.logoSourceSize = 720;

  this.LogoLayer = (function(superClass) {
    extend(LogoLayer, superClass);

    function LogoLayer(options) {
      this.options = options;
      LogoLayer.__super__.constructor.call(this, this.options);
      this.logoSize = 360;
      this.properties = {
        width: this.logoSize,
        height: this.logoSize,
        backgroundColor: comcastroYellow
      };
      this.addChildLayers();
    }

    LogoLayer.prototype.size = function(newSize) {
      this.logoSize = this.width = this.height = newSize;
      this.cScale.scaleX = this.cScale.scaleY = this.logoScale();
      return this.cScale.x = this.cScale.y = this.scaleNudge();
    };

    LogoLayer.prototype.logoScale = function() {
      return this.logoSize / logoSourceSize;
    };

    LogoLayer.prototype.scaleNudge = function() {
      return -(logoSourceSize - this.logoSize) / 2;
    };

    LogoLayer.prototype.addChildLayers = function() {
      var logoNudge, starNudge;
      starNudge = {
        x: -3.301,
        y: -10.022
      };
      logoNudge = {
        x: -23.1,
        y: 40.26
      };
      this.cScale = new Layer({
        name: "scale",
        superLayer: this,
        backgroundColor: "",
        width: logoSourceSize,
        height: logoSourceSize,
        scaleX: this.logoScale(),
        scaleY: this.logoScale(),
        x: this.scaleNudge(),
        y: this.scaleNudge()
      });
      this.cPos = new Layer({
        name: "position",
        superLayer: this.cScale,
        backgroundColor: "",
        width: logoSourceSize,
        height: logoSourceSize,
        x: logoNudge.x,
        y: logoNudge.y
      });
      this.cIn = new Layer({
        name: "in",
        superLayer: this.cPos,
        image: "images/c-in.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
      this.cMid = new Layer({
        name: "mid",
        superLayer: this.cPos,
        image: "images/c-mid.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
      this.cOut = new Layer({
        name: "out",
        superLayer: this.cPos,
        image: "images/c-out.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
      return this.cStar = new Layer({
        name: "star",
        superLayer: this.cPos,
        image: "images/star.png",
        width: logoSourceSize,
        height: logoSourceSize,
        x: starNudge.x,
        y: starNudge.y
      });
    };

    return LogoLayer;

  })(Layer);

}).call(this);

(function() {
  var logo, logo2;

  logo = new LogoLayer({
    y: 100,
    x: 100
  });

  logo2 = new LogoLayer({
    x: logo.x + logo.width + 100,
    y: 100
  });


  /*
  
  spinTime = 1.5
  clockwise = -360
  counter = 360
  
  spinStar = new Animation
  	layer: cStar
  	properties:
  		rotation: counter * 3
  	time: 3
  	curve: "cubic-bezier(0,0,.58,1)"
  	delay: 1.5
  
  spinIn = new Animation
  	layer: cIn
  	properties:
  		rotation: counter * 2
  	time: 2.5
  	curve: "cubic-bezier(.42,0,.58,1)"
  	delay: 2
  
  spinMid = new Animation
  	layer: cMid
  	properties:
  		rotation: clockwise * 2
  	time: 2.5
  	#curve: "cubic-bezier(.42,0,1,1)"
  	#curve: "spring-dho(400, 200, 10, 0.1)"
  	#curve: "spring(150,12,0.01)"
  	delay: 2
  	curve: "cubic-bezier(.42,0,.58,1)"	
  		
  spinOut = new Animation
  	layer: cOut
  	properties:
  		rotation: counter * 2
  	time: 2.5
  	curve: "cubic-bezier(.42,0,.58,1)"	
  	delay: 2
  
  
  
  
  spinAll = ->	
  	spinStar.start()
  	spinIn.start()
  	spinMid.start()
  	spinOut.start()
  	
  stopAll = ->	
  	spinStar.stop()
  	spinIn.stop()
  	spinMid.stop()
  	spinOut.stop()
  	
  	
  	
  	
  resetAnimations = ->
  	cStar.rotation = 0
  	cIn.rotation = 0
  	cMid.rotation = 0
  	cOut.rotation = 0
  	spinAll()
  
  isAnimating = false
  
  logo1.on Events.Click, ->
  	if !isAnimating
  		spinAll()
  		isAnimating = true
   */


  /*
  spinStar.on Events.AnimationEnd, ->
  	resetAll()
  	isAnimating = false
  
  resetAll = ->
  	cStar.rotation = 0
  	cIn.rotation = 0
  	cMid.rotation = 0
  	cOut.rotation = 0
   */


  /*
  spinStar.on Events.AnimationEnd, ->
  	resetStar()
  	
  spinIn.on Events.AnimationEnd, ->
  	resetIn()
  	
  spinMid.on Events.AnimationEnd, ->
  	resetMid()
  	
  spinOut.on Events.AnimationEnd, ->
  	resetOut()
  
  resetStar = ->
  	cStar.rotation = 0
  	spinStar.start()
  
  resetIn = ->
  	cIn.rotation = 0
  	spinIn.start()
  	
  resetMid = ->
  	cMid.rotation = 0
  	spinMid.start()
  	
  resetOut = ->
  	cOut.rotation = 0
  	spinOut.start()
  
  
  spinAll()
   */


  /*	
   * On a click, go to the next state
  logo1.on Events.Click, ->
  	cStar.animate
  		rotation: 360
  		time: 20
  	cMid.animate
  		properties: 
  			rotation: 360
  			time: 20
  	cIn.animate
  		properties: 
  			rotation: -360
  			time: 20
  	cOut.animate
  		properties: 
  			rotation: -360
  			time: 20
   */


  /*	
   * Set the default animation options
  logo1.states.animationOptions =
  	curve: "spring(150,12,0)"
  
  logo1.draggable.enabled = true
   */


  /*
   * Define a set of states with names (the original state is 'default')
  logo1.states.add
  	second: 
  		y:100
  		scale:0.6
  		rotationZ:180
  		x:Screen.width/2 - 256/2
  		
  	third:
  		y:300
  		scale:1.3
  		#blur:4
  		x:Screen.width/2 - 256/2
  		
  	fourth: 
  		y:200
  		scale:0.9
  		#blur:2
  		rotationZ:200
  		x:Screen.width/2 - 256/2
   */

}).call(this);

