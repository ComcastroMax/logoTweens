#Class holding animation properties for the LogoLayer object
 

class @AnimationNodMusic extends AnimationTween
	constructor: (logo) ->
		super logo
		@makeAnimations()
	
	start: ->	
		super()
		@anims[0].start()
		@weirdLoop()
		
	makeAnimations: -> 
		
		#Create Properties
		
		rotateUp = -20
		rotateDown = 20
		rotateUpTime = 0.5
		rotateDownTime = 0.5
			
		cMidRotateUp = new Animation
			layer: @logo.cPos
			properties:
				rotation: rotateUp
			time: rotateUpTime
			curve: "ease-out"
		
		
		cMidRotateDown = new Animation
			layer: @logo.cPos
			properties:
				rotation: rotateDown
			time: rotateDownTime
			curve: "cubic-bezier(.74,.24,.83,.67)"
		
		@anims = [
			cMidRotateUp,
			cMidRotateDown
			]
		
		#listeners
		
		cMidRotateUp.on Events.AnimationEnd, =>
			if !@halt then cMidRotateDown.start() else @logo.reset()
		
		cMidRotateDown.on Events.AnimationEnd, =>
			if !@halt then cMidRotateUp.start() else @logo.reset()
		
	weirdLoop: ->
		Utils.delay 0.1, =>
			if !@halt then @makeCrazy() else @logo.reset()
	
	makeCrazy: ->
		
		fakeLevel = Utils.randomNumber(0,3)
		
		@logo.cIn.visible = (fakeLevel > 1) #false if fakeLevel < 1 else @logo.cIn.visible = true 
		@logo.cOut.visible = (fakeLevel > 2) #false if fakeLevel < 2 else @logo.cOut.visible = true
		
		@weirdLoop()
		
	