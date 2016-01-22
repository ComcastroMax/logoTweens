#Class holding animation properties for the LogoLayer object
 

class @AnimationBreathePulseRotateSync extends AnimationTween
	constructor: (logo) ->
		super logo
		@makeAnimations()
		@logo.cIn.opacity = 0
		@logo.cOut.opacity = 0
	
	start: ->	
		super()
		@breathePulseStart()
		@anims[6].start() #rotation

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
		
		
		
		cInFadeIn = new Animation
			layer: @logo.cIn
			properties:
				opacity: 1
			curve: fadeCurve
			time: fadeInTime
			delay: startDelay
		
		cOutFadeIn = new Animation
			layer: @logo.cOut
			properties:
				opacity: 1
			curve: fadeCurve
			time: fadeInTime
			delay: (fadeDelay + startDelay)
		
		cInFadeOut = new Animation
			layer: @logo.cIn
			properties:
				opacity: 0
			curve: fadeCurve
			time: fadeOutTime
			delay: 0	
				
		cOutFadeOut = new Animation
			layer: @logo.cOut
			properties:
				opacity: 0
			curve: fadeCurve
			time: fadeOutTime
			delay: 0
	
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
		
		rotation = new AnimationSimpleRotate(@logo)
		
		@anims = [
			cInFadeIn,
			cOutFadeIn,
			cInFadeOut,
			cOutFadeOut,
			cStarGrow,
			cStarShrink,
			rotation
			]
		
		cInFadeIn.on Events.AnimationEnd, =>
			if !@halt then cInFadeOut.start() else @logo.reset() 
			
		cOutFadeIn.on Events.AnimationEnd, =>
			if !@halt then cOutFadeOut.start() else @logo.reset()
			
		cStarGrow.on Events.AnimationEnd, =>
			if !@halt then cStarShrink.start() else @logo.reset()
			
		cOutFadeOut.on Events.AnimationEnd, =>
			if !@halt 
				@rotatePulse()
				@breathePulseStart()
			else 
				@logo.reset()
				
			
	breathePulseStart: =>
		@anims[0].start() #pulse in
		@anims[1].start() #pulse out
		@anims[4].start() #breathe
			
	rotatePulse: ->
		twoFifths = 144 # 2/5 of 360
		#oneFifth = 72 # 1/5 of 360
		
		@logo.cIn.rotation = (@logo.cIn.rotation + twoFifths) % 360
		@logo.cOut.rotation = (@logo.cOut.rotation) + twoFifths % 360
		
	