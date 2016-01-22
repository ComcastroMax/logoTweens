#Class holding animation properties for the LogoLayer object
 

class @AnimationBreathePulseRotate
	constructor: (logo) ->
		@logo = logo
		@breathe = new AnimationSimpleBreathe(@logo)
		@pulse = new AnimationPulseRotate(@logo)
		@rotate = new AnimationSimpleRotate(@logo)
	
	start: ->	
		@breathe.start()
		@pulse.start()
		@rotate.start()

	