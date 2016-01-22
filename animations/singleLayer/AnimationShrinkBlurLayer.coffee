#Class holding animation properties for the LogoLayer object
 

class @AnimationShrinkBlurLayer
	constructor: (layer) ->
		@layer = layer
		
		@makeAnimations()
	
	start: ->	
		@shrinkBlur.start()

	makeAnimations: -> 
		
		#Create Properties
		dur = 1
		expansion = 2
		blurring = 50
		blurDelay = 2
		
		@layer.opacity = 0
		@layer.scaleX = @layer.scaleY = expansion
		@layer.blur = blurring
		
		@shrinkBlur = new Animation
			layer: @layer
			properties: 
				scaleX: 1
				scaleY: 1
				blur: 0
				opacity: 1
			curve: "ease-in"
			time: dur
			delay: blurDelay
				
		@shrinkBlurReturn = new Animation
			layer: @layer
			properties: 
				scaleX: expansion
				scaleY: expansion
				blur: blurring
				opacity: 0
			curve: "ease-out"
			time: dur
			delay: blurDelay
				
		
		#listeners
		
		@shrinkBlur.on Events.AnimationEnd, =>
			if @loop
				@shrinkBlurReturn.start()
			
		@shrinkBlurReturn.on Events.AnimationEnd, =>
			@shrinkBlur.start()
			
		
		
		
	