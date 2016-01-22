#Class holding animation properties for the LogoLayer object
 

class @AnimationRays
	constructor: (logo) ->
		@logo = logo
		@makeAnimations()
		@logo.cIn.opacity = 0
		@logo.cOut.opacity = 0
	
	start: ->	
		@cInFadeIn.start()
		@cOutFadeIn.start()

	makeAnimations: -> 
		
		#clone ray layers
		in1 = @logo.cIn.copy()
		in1.superLayer = @logo.cIn
		in1.rotation = 72
		
		in2 = @logo.cIn.copy()
		in2.superLayer = @logo.cIn
		in2.rotation = (72 * 2)
		
		in3 = @logo.cIn.copy()
		in3.superLayer = @logo.cIn
		in3.rotation = (72 * 3)
		
		out4 = @logo.cIn.copy()
		out4.superLayer = @logo.cIn
		out4.rotation = (72 * 4)
		
		out1 = @logo.cOut.copy()
		out1.superLayer = @logo.cOut
		out1.rotation = 72
		
		out2 = @logo.cOut.copy()
		out2.superLayer = @logo.cOut
		out2.rotation = (72 * 2)
		
		out3 = @logo.cOut.copy()
		out3.superLayer = @logo.cOut
		out3.rotation = (72 * 3)
		
		out4 = @logo.cOut.copy()
		out4.superLayer = @logo.cOut
		out4.rotation = (72 * 4)
		
		
		#Create Properties
		
		fadeInTime = 0.3
		fadeOutTime = 0.3
		
		fadeDelay = 0.2
		startDelay = 0.2
		
		fadeCurve = "ease-in-out"
	
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
		
		
		
		@cInFadeIn.on Events.AnimationEnd, =>
			@cInFadeOut.start()
			
		@cOutFadeIn.on Events.AnimationEnd, =>
			@cOutFadeOut.start()
		
		###
		#wait for cOut fade out
		@cInFadeOut.on Events.AnimationEnd, =>
			@cInFadeIn.start()
		###
			
		@cOutFadeOut.on Events.AnimationEnd, =>
			@rotatePulse()
			@start()
			
	rotatePulse: ->
		twoFifths = 144 # 2/5 of 360
		#oneFifth = 72 # 1/5 of 360
		@logo.cIn.rotation = (@logo.cIn.rotation + twoFifths) % 360
		@logo.cOut.rotation = (@logo.cOut.rotation) + twoFifths % 360
		
	