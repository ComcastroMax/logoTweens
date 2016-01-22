#Class holding animation properties for the LogoLayer object
 

class @AnimationPulseRotate extends AnimationSimplePulse
	constructor: (logo) ->
		super logo
		
		@cOutFadeOut.on Events.AnimationEnd, =>
			@rotatePulse()
			@start()
			
	rotatePulse: ->
		twoFifths = 144 # 2/5 of 360
		#oneFifth = 72 # 1/5 of 360
		@logo.cIn.rotation = (@logo.cIn.rotation + twoFifths) % 360
		@logo.cOut.rotation = (@logo.cOut.rotation) + twoFifths % 360
		
	