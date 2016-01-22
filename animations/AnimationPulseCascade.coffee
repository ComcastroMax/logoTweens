#Class holding animation properties for the LogoLayer object
 

class @AnimationPulseCascade
	constructor: (logo) ->
		
		@logo1 = logo
		@logo2 = logo.copy()
		#@logo3 = @logo1.copy()
		#@logo4 = @logo1.copy()
		#@logo5 = @logo1.copy()
		
		
		
		@hideExtra(@logo1)
		@hideExtra(@logo2)
		#@hideExtra(@logo3)
		#@hideExtra(@logo4)
		#@hideExtra(@logo5)
		
		
	
	#start: ->	
		
		
	hideExtra: (logoIn) ->
		logoIn.cStar.visible = false
		logoIn.cMid.visible = false
		
		

	