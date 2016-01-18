#Class holding animation properties for the LogoLayer object
 

class @AnimationBreathePulseRotate
	constructor: (logo) ->
		@logo = logo
		@makeAnimations()
		@logo.cIn.opacity = 0
		@logo.cOut.opacity = 0
	
	start: ->	
		@cInFadeIn.start()
		@cOutFadeIn.start()
		@cStarGrow.start()

	makeAnimations: -> 
		
		#Create Properties
		
		fadeInTime = 0.3
		fadeOutTime = 0.3
		
		fadeDelay = 0.2
		startDelay = 0.2
		
		fadeCurve = "ease-in-out"
		
		growScale = 0.9
		growCurve = "ease-in"
		shrinkCurve = "ease-out"
		growTime = 0.4
		shrinkTime = 0.4
		
		
	
		@cInFadeIn = new Animation
			layer: @logo.cIn
			properties:
				opacity: 1
			curve: fadeCurve
			time: fadeInTime
			delay: startDelay
		
		@cOutFadeIn = new Animation
			layer: @logo.cOut
			properties:
				opacity: 1
			curve: fadeCurve
			time: fadeInTime
			delay: (fadeDelay + startDelay)
		
		@cInFadeOut = new Animation
			layer: @logo.cIn
			properties:
				opacity: 0
			curve: fadeCurve
			time: fadeOutTime
			delay: 0	
				
		@cOutFadeOut = new Animation
			layer: @logo.cOut
			properties:
				opacity: 0
			curve: fadeCurve
			time: fadeOutTime
			delay: 0
	
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
		
		
		
			
		
		@cInFadeIn.on Events.AnimationEnd, =>
			@cInFadeOut.start()
			
		@cOutFadeIn.on Events.AnimationEnd, =>
			@cOutFadeOut.start()
			
		@cStarGrow.on Events.AnimationEnd, =>
			@cStarShrink.start()
			
		@cOutFadeOut.on Events.AnimationEnd, =>
			@rotatePulse()
			@start()
			
	rotatePulse: ->
		twoFifths = 144 # 2/5 of 360
		#oneFifth = 72 # 1/5 of 360
		@logo.cIn.rotation = (@logo.cIn.rotation + twoFifths) % 360
		@logo.cOut.rotation = (@logo.cOut.rotation) + twoFifths % 360
		
	