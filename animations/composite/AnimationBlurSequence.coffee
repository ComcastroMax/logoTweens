#Class holding animation properties for the LogoLayer object
 

class @AnimationBlurSequence
	constructor: (logo) ->
		@logo = logo
		@makeAnimations()
	
	start: ->	
		@shrinkBlur.start()

	makeAnimations: -> 
		
		@blurStar = new AnimationShrinkBlurLayer(@logo.cStar)
		@blurC = new AnimationShrinkBlurLayer(@logo.cMid)
		
		@blurIn = new AnimationShrinkBlurLayer(@logo.cIn)
		@blurOut = new AnimationShrinkBlurLayer(@logo.cOut)
		
		@blurStar.shrinkBlur.on Events.AnimationEnd =>
			@blurC.start()
			
		###	
		@blurC.shrinkBlur.on Events.AnimationEnd =>
			@blurC.start()
		
		
			
		@blurStar.shrinkBlur.on Events.AnimationEnd =>
			@blurC.start()
			
		@blurStar.shrinkBlur.on Events.AnimationEnd =>
			@blurC.start()
		###
			
		
		
		
	