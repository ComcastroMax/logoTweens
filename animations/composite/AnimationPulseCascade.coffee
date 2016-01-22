#Class holding animation properties for the LogoLayer object
 

class @AnimationPulseCascade
	constructor: (logo) ->
		@logo1 = logo
		@logo2 = new LogoLayer
		@logo3 = new LogoLayer
		@logo4 = new LogoLayer
		@logo5 = new LogoLayer
		
		@spinDelay = .25
		
		@setupLayers()
		@makeAnimations()
		
	setupLayers: -> 
		@logo2.x = @logo1.x
		@logo2.y = @logo1.y
		@logo2.cStar.visible = false
		@logo2.cMid.visible = false
		@logo2.backgroundColor = ""
		
		@logo3.x = @logo1.x
		@logo3.y = @logo1.y
		@logo3.cStar.visible = false
		@logo3.cMid.visible = false
		@logo3.backgroundColor = ""
		
		@logo4.x = @logo1.x
		@logo4.y = @logo1.y
		@logo4.cStar.visible = false
		@logo4.cMid.visible = false
		@logo4.backgroundColor = ""
		
		@logo5.x = @logo1.x
		@logo5.y = @logo1.y
		@logo5.cStar.visible = false
		@logo5.cMid.visible = false
		@logo5.backgroundColor = ""
		
		@logo2.cPos.rotation = 72
		@logo3.cPos.rotation = (72 * 2)
		@logo4.cPos.rotation = (72 * 3)
		@logo5.cPos.rotation = (72 * 4)
		
	makeAnimations: ->
		@pulse1 = new AnimationSimplePulse(@logo1)
		@pulse2 = new AnimationSimplePulse(@logo2)
		@pulse3 = new AnimationSimplePulse(@logo3)
		@pulse4 = new AnimationSimplePulse(@logo4)
		@pulse5 = new AnimationSimplePulse(@logo5) 
		
	start: ->	
		@pulse1.start()
		Utils.delay @spinDelay, =>
			@pulse2.start()
		Utils.delay (@spinDelay * 2), =>
			@pulse3.start()
		Utils.delay (@spinDelay * 3), =>
			@pulse4.start()
		Utils.delay (@spinDelay * 4), =>
			@pulse5.start()
		Utils.delay (@spinDelay * 5), =>
			@start()
		
	hideExtra: (logoIn) ->
		logoIn.cStar.visible = false
		logoIn.cMid.visible = false
		logoIn.backgroundColor = ""
	
		
	

	