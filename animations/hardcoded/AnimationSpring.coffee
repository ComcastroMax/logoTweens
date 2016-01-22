#Class holding animation properties for the LogoLayer object
 

class @AnimationSpring extends AnimationTween
	constructor: (logo) ->
		super logo
		@makeAnimations()
	
	start: ->	
		super()
		@anims[0].start()
		@anims[1].start()
		@anims[2].start()
		@anims[3].start()

	makeAnimations: -> 
	
		growScale = 1.2
		starGrowExtra = 0.8
		shrinkScale = 0
		
		growDelay = 0
		
		growTime = 0.2
		starGrowTimeExtra = 0.1
		shrinkTime = 0.25
		resetTime = 0.2
		
		resetDelay = 1.5
	
		starDelayExtra = 0.28
		slinkyTime = 0
	
		myTensionGrow = 100
		myFrictionGrow = 10
		myVelocityGrow = 10
		myToleranceGrow = 1
		
		myTensionShrink = 150 
		myFrictionShrink = 50
		myVelocityShrink = 10
		myToleranceShrink = 1
		
		growCurve = "cubic-bezier(0,0,.58,1)"
		#growCurve = "spring(" + myTensionShrink + ", " + myTensionShrink + ", " + "myTensionShrink + ", " + myToleranceShrink)"
		#growCurve = "spring(" + myTensionShrink + ", " + myTensionShrink + ", " + "myTensionShrink)"
		
		#shrinkCurve = "cubic-bezier(0,0,.58,1)"
		#shrinkCurve = "spring(" + myTensionShrink + ", " + myTensionShrink + ", " + "myTensionShrink)" + ", " + myToleranceShrink
		#shrinkCurve = "spring(" + myTensionShrink + ", " + myTensionShrink + ", " + "myTensionShrink)"
		
		shrinkCurve = growCurve
		resetCurve = growCurve
		
		
		#Create Animations
		
		
		#grow state
		
		cInGrow = new Animation
			layer: @logo.cIn
			properties:
				scaleX: growScale
				scaleY: growScale
			curve: growCurve
			delay: (growDelay + slinkyTime * 2)
			time: growTime
			
		cMidGrow = new Animation
			layer: @logo.cMid
			properties:
				scaleX: growScale
				scaleY: growScale
			curve: growCurve
			delay: (growDelay + slinkyTime)
			time: growTime
		
		cOutGrow = new Animation
			layer: @logo.cOut
			properties:
				scaleX: growScale
				scaleY: growScale
			curve: growCurve
			delay: growDelay
			time: growTime
		
		cStarGrow = new Animation
			layer: @logo.cStar
			properties:
				scaleX: (growScale + starGrowExtra)
				scaleY: (growScale + starGrowExtra)
			curve: growCurve
			delay: (growDelay + starDelayExtra)
			time: (growTime + starGrowTimeExtra)
		
		#shrinking state
		
		cInShrink = new Animation
			layer: @logo.cIn
			properties:
				scaleX: shrinkScale
				scaleY: shrinkScale
			curve: shrinkCurve
			time: shrinkTime
		
		cMidShrink = new Animation
			layer: @logo.cMid
			properties:
				scaleX: shrinkScale
				scaleY: shrinkScale
			curve: shrinkCurve
			time: shrinkTime
		
		cOutShrink = new Animation
			layer: @logo.cOut
			properties:
				scaleX: shrinkScale
				scaleY: shrinkScale
			curve: shrinkCurve
			time: shrinkTime
			
		cStarShrink = new Animation
			layer: @logo.cStar
			properties:
				scaleX: shrinkScale
				scaleY: shrinkScale
			curve: shrinkCurve
			time: shrinkTime
		
		#reset state
		
		cInReset = new Animation
			layer: @logo.cIn
			properties:
				scaleX: 1
				scaleY: 1
			curve: resetCurve
			time: resetTime
			delay: (resetDelay - slinkyTime * 2)
		
		cMidReset = new Animation
			layer: @logo.cMid
			properties:
				scaleX: 1
				scaleY: 1
			curve: resetCurve
			time: resetTime
			delay: (resetDelay - slinkyTime)
		
		cOutReset = new Animation
			layer: @logo.cOut
			properties:
				scaleX: 1
				scaleY: 1
			curve: resetCurve
			time: resetTime
			delay: resetDelay
		
		cStarReset = new Animation
			layer: @logo.cStar
			properties:
				scaleX: 1
				scaleY: 1
			curve: resetCurve
			time: resetTime
			delay: (resetDelay - starDelayExtra - starGrowTimeExtra)
		
		@anims = [
			cInGrow,
			cMidGrow,
			cOutGrow,
			cStarGrow,
			cInShrink,
			cMidShrink,
			cOutShrink,
			cStarShrink,
			cInReset,
			cMidReset,
			cOutReset,
			cStarReset
			]
			
		
		#Create Listeners
		
		
		cInGrow.on Events.AnimationEnd, =>
			if !@halt then cInShrink.start() else @logo.reset()
		cInShrink.on Events.AnimationEnd, =>
			if !@halt then cInReset.start() else @logo.reset()
		
		cMidGrow.on Events.AnimationEnd, =>
			if !@halt then cMidShrink.start() else @logo.reset()
		cMidShrink.on Events.AnimationEnd, =>
			if !@halt then cMidReset.start() else @logo.reset()
			
		cOutGrow.on Events.AnimationEnd, =>
			if !@halt then cOutShrink.start() else @logo.reset()
		cOutShrink.on Events.AnimationEnd, =>
			if !@halt then cOutReset.start() else @logo.reset()
			
		cStarGrow.on Events.AnimationEnd, =>
			if !@halt then cStarShrink.start() else @logo.reset()
		cStarShrink.on Events.AnimationEnd, =>
			if !@halt then cStarReset.start() else @logo.reset()
		cStarReset.on Events.AnimationEnd, =>
			Utils.delay 1.5, =>
				if !@halt
					cInGrow.start()
					cMidGrow.start() 
					cOutGrow.start()  
					cStarGrow.start() 
				else 
			  		@logo.reset()
			
		
		
		
		
		
		
		
	