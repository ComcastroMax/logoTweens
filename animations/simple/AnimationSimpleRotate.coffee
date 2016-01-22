#Class holding animation properties for the LogoLayer object
 

class @AnimationSimpleRotate extends AnimationTween
	constructor: (logo) ->
		super logo
		@makeAnimations()
	
	start: ->	
		super()
		@anims[0].start()
		

	makeAnimations: -> 
		
		#Create Properties
		
		rotationTime = 5
		clockwise = 360
		counter = -360
	
		cMidRotate = new Animation
			layer: @logo.cMid
			properties:
				rotation: clockwise
			time: rotationTime
		
		@anims = [cMidRotate]
		
		#sequence listeners
		
		cMidRotate.on Events.AnimationEnd, =>
			if !@halt
				@logo.cMid.rotation = 0
				cMidRotate.start()
			
		
		
		
		
		
	