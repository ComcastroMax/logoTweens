#Class holding animation properties for the LogoLayer object
 


class @AnimationDanger
	constructor: (logo) ->
		@logo = logo
		@yellowHsl = tinycolor(comcastroYellow).toHsl()
		#print @yellowHsl
	
	startChoppy: ->	
		@weirdLoop()
		
	startSmooth: ->	
		@animateCrazy()
		
	weirdLoop: ->
		Utils.delay 0.1, =>
			@makeCrazy()
	
	makeCrazy: ->
	
		#the danger begins
		@logo.cStar.rotation = Utils.randomNumber(0,72)
		@logo.cMid.rotation = Utils.randomNumber(-15,15)
		@logo.cIn.rotation = @logo.cOut.rotation = Utils.randomNumber(-15,15)
		
		#logonudge was made a global object in LogoLayer.coffee
		@logo.cPos.x = logoNudge.x + Utils.randomNumber(-10,10)
		@logo.cPos.y = logoNudge.y + Utils.randomNumber(-10,10)
		
		
		
		#@logo.cPos.opacity = Utils.randomNumber(0.6,1)
		
		fakeLevel = Utils.randomNumber(0,3)
		
		
		#@logo.cIn.visible = (fakeLevel > 1) #false if fakeLevel < 1 else @logo.cIn.visible = true 
		#@logo.cOut.visible = (fakeLevel > 2) #false if fakeLevel < 2 else @logo.cOut.visible = true
		
		#@yellowHsl.s = Utils.randomNumber(0.5,1)
		#@yellowHsl.h = Utils.randomNumber(40,50)
		#@yellowHsl.l = Utils.randomNumber(0.4,0.6)
		#@logo.backgroundColor = tinycolor(@yellowHsl).toHexString()
		
		@weirdLoop()	
		
	animateCrazy: ->
		
		shakeDur = 0.1
		shakeScalar = 15
		rotateScalar = 20
		rotateRayScalar = 15
		starScalar = 36
		
		
		@rotationStar = new Animation
			layer: @logo.cStar
			properties:
				rotation: Utils.randomNumber(-starScalar,starScalar)
			time: shakeDur
			curve: "ease-in-out"
		
		cInRotation = Utils.randomNumber(-rotateRayScalar,rotateRayScalar)
			
		@rotationIn = new Animation
			layer: @logo.cIn
			properties:
				rotation: (cInRotation)
			time: shakeDur
			curve: "ease-in-out"
		
		@rotationOut = new Animation
			layer: @logo.cOut
			properties:
				rotation: (cInRotation + Utils.randomNumber(-10,10) )
			time: shakeDur
			curve: "ease-in-out"
		
		@rotationMid = new Animation
			layer: @logo.cMid
			properties:
				rotation: Utils.randomNumber(-rotateScalar,rotateScalar)
			time: shakeDur
			curve: "ease-in-out"	
		
		@shakes = new Animation
			layer: @logo.cPos
			properties:
				x: logoNudge.x + Utils.randomNumber(-shakeScalar,shakeScalar)
				y: logoNudge.y + Utils.randomNumber(-shakeScalar,shakeScalar)
			time: shakeDur
			curve: "ease-in-out"
		
		
		#simulating signal levels
		###
		fakeLevel = Utils.randomNumber(0,3)
		
		@logo.cIn.visible = (fakeLevel > 1) #false if fakeLevel < 1 else @logo.cIn.visible = true 
		@logo.cOut.visible = (fakeLevel > 2) #false if fakeLevel < 2 else @logo.cOut.visible = true
		###
		
		
		
		
		
		#animating color
		###
		#@yellowHsl.l = Utils.randomNumber(0.4,0.6)
		#newYellow = tinycolor(@yellowHsl).toHexString()
		#@logo.backgroundColor = newYellow
		
		@shade = new Animation
			layer: logo
			properties: 
				backgroundColor: "red"
			time: shakeDur
			
		@logo.animate
			properties: 
				backgroundColor: "red"
			time:shakeDur
		###
		
		
		
			
		@rotationStar.on Events.AnimationEnd, =>
			@animateCrazy()
			
		@startAll()
		
		
			
	startAll: ->
		@rotationStar.start()
		@rotationIn.start()
		@rotationOut.start()
		@rotationMid.start()
		@shakes.start()
		#@shade.start()
		
			
		
	