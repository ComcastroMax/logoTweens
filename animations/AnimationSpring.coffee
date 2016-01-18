#Class holding animation properties for the LogoLayer object
 

class @AnimationSpring
	constructor: (logo) ->
		@logo = logo
		@makeAnimations()
	
	start: ->	
		@cInGrow.start()
		@cMidGrow.start() 
		@cOutGrow.start()  
		@cStarGrow.start()

	makeAnimations: -> 
	
		growScale = 1.2
		starGrowExtra = 0.8
		shrinkScale = 0
		
		growDelay = 1.5
		
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
		
		@cInGrow = new Animation
			layer: @logo.cIn
			properties:
				scaleX: growScale
				scaleY: growScale
			curve: growCurve
			delay: (growDelay + slinkyTime * 2)
			time: growTime
			
		@cMidGrow = new Animation
			layer: @logo.cMid
			properties:
				scaleX: growScale
				scaleY: growScale
			curve: growCurve
			delay: (growDelay + slinkyTime)
			time: growTime
		
		@cOutGrow = new Animation
			layer: @logo.cOut
			properties:
				scaleX: growScale
				scaleY: growScale
			curve: growCurve
			delay: growDelay
			time: growTime
		
		@cStarGrow = new Animation
			layer: @logo.cStar
			properties:
				scaleX: (growScale + starGrowExtra)
				scaleY: (growScale + starGrowExtra)
			curve: growCurve
			delay: (growDelay + starDelayExtra)
			time: (growTime + starGrowTimeExtra)
		
		#shrinking state
		
		@cInShrink = new Animation
			layer: @logo.cIn
			properties:
				scaleX: shrinkScale
				scaleY: shrinkScale
			curve: shrinkCurve
			time: shrinkTime
		
		@cMidShrink = new Animation
			layer: @logo.cMid
			properties:
				scaleX: shrinkScale
				scaleY: shrinkScale
			curve: shrinkCurve
			time: shrinkTime
		
		@cOutShrink = new Animation
			layer: @logo.cOut
			properties:
				scaleX: shrinkScale
				scaleY: shrinkScale
			curve: shrinkCurve
			time: shrinkTime
			
		@cStarShrink = new Animation
			layer: @logo.cStar
			properties:
				scaleX: shrinkScale
				scaleY: shrinkScale
			curve: shrinkCurve
			time: shrinkTime
		
		#reset state
		
		@cInReset = new Animation
			layer: @logo.cIn
			properties:
				scaleX: 1
				scaleY: 1
			curve: resetCurve
			time: resetTime
			delay: (resetDelay - slinkyTime * 2)
		
		@cMidReset = new Animation
			layer: @logo.cMid
			properties:
				scaleX: 1
				scaleY: 1
			curve: resetCurve
			time: resetTime
			delay: (resetDelay - slinkyTime)
		
		@cOutReset = new Animation
			layer: @logo.cOut
			properties:
				scaleX: 1
				scaleY: 1
			curve: resetCurve
			time: resetTime
			delay: resetDelay
		
		@cStarReset = new Animation
			layer: @logo.cStar
			properties:
				scaleX: 1
				scaleY: 1
			curve: resetCurve
			time: resetTime
			delay: (resetDelay - starDelayExtra - starGrowTimeExtra)
		
		
		#Create Listeners
		
		
		@cInGrow.on Events.AnimationEnd, =>
			@cInShrink.start()
		@cInShrink.on Events.AnimationEnd, =>
			@cInReset.start()
		
		@cMidGrow.on Events.AnimationEnd, =>
			@cMidShrink.start()
		@cMidShrink.on Events.AnimationEnd, =>
			@cMidReset.start()
			
		@cOutGrow.on Events.AnimationEnd, =>
			@cOutShrink.start()
		@cOutShrink.on Events.AnimationEnd, =>
			@cOutReset.start()
			
		@cStarGrow.on Events.AnimationEnd, =>
			@cStarShrink.start()
		@cStarShrink.on Events.AnimationEnd, =>
			@cStarReset.start()
		@cStarReset.on Events.AnimationEnd, =>
			@start() #start all
			
		###
		#wait for star reset
		@cInReset.on Events.AnimationEnd, =>
			@cInGrow.start()
		@cOutReset.on Events.AnimationEnd, =>
			@cOutGrow.start()
		@cMidReset.on Events.AnimationEnd, =>
			@cMidGrow.start()
		###
		
		
		
		
		
	