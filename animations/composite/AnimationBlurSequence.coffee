#Class holding animation properties for the LogoLayer object
 

class @AnimationBlurSequence
	constructor: (logo) ->
		@logo = logo
		@makeAnimations()
	
	start: ->
    @blurStar.start()
    @blurC.start()
    @blurIn.start()
    @blurOut.start()

	makeAnimations: ->

    @blurStar = new AnimationShrinkBlurLayer(@logo.cStar, 0)
    @blurIn = new AnimationShrinkBlurLayer(@logo.cIn, 0.4)
    @blurC = new AnimationShrinkBlurLayer(@logo.cMid, 0.8)
    @blurOut = new AnimationShrinkBlurLayer(@logo.cOut, 1.2)

		
		
	