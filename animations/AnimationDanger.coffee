#Class holding animation properties for the LogoLayer object
 


class @AnimationDanger
	constructor: (logo) ->
		@logo = logo
		@yellowHsl = tinycolor(comcastroYellow).toHsl()
		#print @yellowHsl
	start: ->	
		@weirdLoop()
		
	weirdLoop: ->
		Utils.delay 0.1, =>
			@makeCrazy()
	
	makeCrazy: ->
	
		#the danger begins
		@logo.cStar.rotation = Utils.randomNumber(0,72)
		@logo.cMid.rotation = Utils.randomNumber(-15,15)
		@logo.cIn.rotation = @logo.cOut.rotation = Utils.randomNumber(-15,15)
		
		#logonudge was made a global object in LogoLayer.coffee
		@logo.cPos.x = logoNudge.x + Utils.randomNumber(-10,10)
		@logo.cPos.y = logoNudge.y + Utils.randomNumber(-10,10)
		
		#@logo.cPos.opacity = Utils.randomNumber(0.6,1)
		
		fakeLevel = Utils.randomNumber(0,3)
		
		@logo.cIn.visible = (fakeLevel > 1) #false if fakeLevel < 1 else @logo.cIn.visible = true 
		@logo.cOut.visible = (fakeLevel > 2) #false if fakeLevel < 2 else @logo.cOut.visible = true
		
		#@yellowHsl.s = Utils.randomNumber(0.5,1)
		#@yellowHsl.h = Utils.randomNumber(40,50)
		@yellowHsl.l = Utils.randomNumber(0.4,0.6)
		@logo.backgroundColor = tinycolor(@yellowHsl).toHexString()
		
		@weirdLoop()		
		
	