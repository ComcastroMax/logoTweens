#Class holding animation properties for the LogoLayer object
 

class @AnimationSpin extends AnimationTween
	constructor: (logo) ->
		super logo
		@makeAnimations()
	
	start: ->	
		super()
		for anim in @anims
			anim.start()
		
		
	makeAnimations: -> 
		
		#Create Properties
		
		clockwise = -360
		counter = 360
		
		starDelay = 0
		rotationDelay = 0.5
		
		starTime = 3
		rotationTime = 2.5
		
		starCurve = "cubic-bezier(0,0,.58,1)"
		rotationCurve = "cubic-bezier(.42,0,.58,1)"
	
		
	
		spinStar = new Animation
			layer: @logo.cStar
			properties:
				rotation: (counter * 3)
			curve: starCurve
			time: starTime
			delay: starDelay
		
		spinIn = new Animation
			layer: @logo.cIn
			properties:
				rotation: (counter * 2)
			curve: rotationCurve
			time: rotationTime
			delay: (starDelay + rotationDelay)
		
		spinMid = new Animation
			layer: @logo.cMid
			properties:
				rotation: (clockwise * 2)
			curve: rotationCurve
			time: rotationTime
			delay: (starDelay + rotationDelay)	
				
		spinOut = new Animation
			layer: @logo.cOut
			properties:
				rotation: (counter * 2)
			curve: rotationCurve
			time: rotationTime
			delay: (starDelay + rotationDelay)
		
		@anims = [
			spinStar,
			spinIn,
			spinMid,
			spinOut
			]
			
		
		spinStar.on Events.AnimationEnd, =>
			Utils.delay 1.5, =>
				if !@halt
					@logo.cStar.rotation = 0
					@logo.cIn.rotation = 0
					@logo.cMid.rotation = 0
					@logo.cOut.rotation = 0
					spinStar.start()
					spinIn.start()
					spinMid.start()
					spinOut.start()
				else 
					@logo.reset()
			
			
		
	