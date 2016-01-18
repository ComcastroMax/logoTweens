#Class holding animation properties for the LogoLayer object
 

class @AnimationSpin
	constructor: (logo) ->
		@logo = logo
		@makeAnimations()
	
	start: ->	
		@spinStar.start()
		@spinIn.start()
		@spinMid.start()
		@spinOut.start()

	makeAnimations: -> 
		
		#Create Properties
		
		clockwise = -360
		counter = 360
		
		starDelay = 1.5
		rotationDelay = 2
		
		starTime = 3
		rotationTime = 2.5
		
		starCurve = "cubic-bezier(0,0,.58,1)"
		rotationCurve = "cubic-bezier(.42,0,.58,1)"
	
		
	
		@spinStar = new Animation
			layer: @logo.cStar
			properties:
				rotation: (counter * 3)
			curve: starCurve
			time: starTime
			delay: starDelay
		
		@spinIn = new Animation
			layer: @logo.cIn
			properties:
				rotation: (counter * 2)
			curve: rotationCurve
			time: rotationTime
			delay: rotationDelay
		
		@spinMid = new Animation
			layer: @logo.cMid
			properties:
				rotation: (clockwise * 2)
			curve: rotationCurve
			time: rotationTime
			delay: rotationDelay	
				
		@spinOut = new Animation
			layer: @logo.cOut
			properties:
				rotation: (counter * 2)
			curve: rotationCurve
			time: rotationTime
			delay: rotationDelay
		
		
		
		@spinStar.on Events.AnimationEnd, =>
			@logo.cStar.rotation = 0
			@spinStar.start()
			
		@spinIn.on Events.AnimationEnd, =>
			@logo.cIn.rotation = 0
			@spinIn.start()
			
		@spinMid.on Events.AnimationEnd, =>
			@logo.cMid.rotation = 0
			@spinMid.start()
			
		@spinOut.on Events.AnimationEnd, =>
			@logo.cOut.rotation = 0
			@spinOut.start()
		
		
	