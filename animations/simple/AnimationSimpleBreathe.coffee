#Class holding animation properties for the LogoLayer object
 

class @AnimationSimpleBreathe extends AnimationTween
	constructor: (logo) ->
		super logo
		@makeAnimations()
	
	start: ->	
		super()
		@anims[0].start()

	makeAnimations: -> 
		
		#Create Properties
		
		growScale = 0.9
		growCurve = "ease-in"
		shrinkCurve = "ease-out"
		growTime = 0.4
		shrinkTime = 0.4
		shrinkDelay = 0.2
	
		cStarGrow = new Animation
			layer: @logo.cStar
			properties:
				scaleX: growScale
				scaleY: growScale
			time: growTime
			curve: growCurve
		
		cStarShrink = new Animation
			layer: @logo.cStar
			properties:
				scaleX: 1
				scaleY: 1
			time: shrinkTime
			curve: shrinkCurve
			delay: shrinkDelay
		
		@anims = [
			cStarGrow,
			cStarShrink
			]
		
		#listeners
		
		cStarGrow.on Events.AnimationEnd, ->
			if !@halt then cStarShrink.start()
			
		cStarShrink.on Events.AnimationEnd, ->
			if !@halt then cStarGrow.start()
		
		
	