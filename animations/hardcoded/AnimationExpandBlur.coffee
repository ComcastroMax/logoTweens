#Class holding animation properties for the LogoLayer object
 

class @AnimationExpandBlur
	constructor: (logo) ->
		@logo = logo
		
		@makeAnimations()
	
	start: ->	
		@growblur.start()

	makeAnimations: -> 
		
		#Create Properties
		dur = 1
		expansion = 2
		blurring = 50
		blurDelay = 2
		
		@logo.cPos.opacity = 0
		@logo.cPos.scaleX = @logo.cPos.scaleY = expansion
		@logo.cPos.blur = blurring
		
		
		
		
		@growblur = new Animation
			layer: @logo.cPos
			properties: 
				scaleX: 1
				scaleY: 1
				blur: 0
				opacity: 1
			curve: "ease-in"
			time: dur
			delay: blurDelay
				
		@growblurReturn = new Animation
			layer: @logo.cPos
			properties: 
				scaleX: expansion
				scaleY: expansion
				blur: blurring
				opacity: 0
			curve: "ease-out"
			time: dur
			delay: blurDelay
				
		
		#listeners
		
		@growblur.on Events.AnimationEnd, =>
			@growblurReturn.start()
			
		@growblurReturn.on Events.AnimationEnd, =>
			@growblur.start()
			
		
		
		
	