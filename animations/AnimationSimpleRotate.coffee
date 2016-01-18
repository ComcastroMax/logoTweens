#Class holding animation properties for the LogoLayer object
 

class @AnimationSimpleRotate
	constructor: (logo) ->
		@logo = logo
		@makeAnimations()
	
	start: ->	
		@cMidRotate.start()
		#@cStarRotate.start() #omitting star when playing with the pulse

	makeAnimations: -> 
		
		#Create Properties
		
		rotationTime = 5
		clockwise = 360
		counter = -360
	
		@cMidRotate = new Animation
			layer: @logo.cMid
			properties:
				rotation: clockwise
			time: rotationTime
		
		###
		@cStarRotate = new Animation
			layer: @logo.cStar
			properties:
				rotation: clockwise
			time: rotationTime
		###
		
		#listeners
		
		@cMidRotate.on Events.AnimationEnd, =>
			@logo.cMid.rotation = 0
			@cMidRotate.start()
		
		
		###
		#omitting star when playing with the pulse
		@cStarRotate.on Events.AnimationEnd, =>
			@logo.cStar.rotation = 0
			@cStarRotate.start()
		###
		
		
	