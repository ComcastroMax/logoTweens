#Class holding animation properties for the LogoLayer object
 

class @AnimationSimpleBreathe
	constructor: (logo) ->
		@logo = logo
		@makeAnimations()
	
	start: ->	
		@cStarGrow.start()

	makeAnimations: -> 
		
		#Create Properties
		
		growScale = 0.9
		growCurve = "ease-in"
		shrinkCurve = "ease-out"
		growTime = 0.4
		shrinkTime = 0.4
	
		@cStarGrow = new Animation
			layer: @logo.cStar
			properties:
				scaleX: growScale
				scaleY: growScale
			time: growTime
			curve: growCurve
		
		@cStarShrink = new Animation
			layer: @logo.cStar
			properties:
				scaleX: 1
				scaleY: 1
			time: shrinkTime
			curve: shrinkCurve
		
		
		#listeners
		
		@cStarGrow.on Events.AnimationEnd, =>
			@cStarShrink.start()
			
		@cStarShrink.on Events.AnimationEnd, =>
			Utils.delay 0.2, =>
				@cStarGrow.start()
		
		
	