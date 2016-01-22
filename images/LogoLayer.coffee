###

#class for drawing the comcastro logo with each symnol as a different image and layer

###

@comcastroYellow = "#FEC71C"
@logoSourceSize = 720

@logoNudge = 
	x: -23.1
	y: 40.26
	
@starNudge = 
	x: -3.301
	y: -10.022
	

class @LogoLayer extends Layer
	
	constructor: (@options)->		
		super @options
		
		@logoSize = 360 
		
		@properties = 
			width: @logoSize
			height: @logoSize
			backgroundColor: comcastroYellow
			
		@addChildLayers()
		@reset()
	
	size: (newSize) ->
		@logoSize = @width = @height = newSize
		@cScale.scaleX = @cScale.scaleY = @logoScale()
		@cScale.x = @cScale.y = @scaleNudge()
	
	logoScale: ->
    	return @logoSize / logoSourceSize
    	
    scaleNudge: ->
    	return -(logoSourceSize - @logoSize) / 2
	
	addChildLayers: ->
		#some helper variables and adjustments

		@cScale =  new Layer
			name: "scale"
			superLayer: @
			backgroundColor: ""
			width: logoSourceSize
			height: logoSourceSize
			
		@cPos= new Layer
			name: "position"
			superLayer: @cScale
			backgroundColor: ""
			width: logoSourceSize
			height: logoSourceSize
		
		@cIn = new Layer
			name: "in"
			superLayer: @cPos
			image: "images/c-in.png"
			width: logoSourceSize
			height: logoSourceSize
			
		@cMid = new Layer
			name: "mid"
			superLayer: @cPos
			image: "images/c-mid.png"
			width: logoSourceSize
			height: logoSourceSize
			
		@cOut = new Layer
			name: "out"
			superLayer: @cPos
			image: "images/c-out.png"
			width: logoSourceSize
			height: logoSourceSize
			
		@cStar = new Layer
			name: "star"
			superLayer: @cPos
			image: "images/star.png"
			width: logoSourceSize
			height: logoSourceSize
		
	reset: ->
		
		@setDefaults(@cStar)
		@setDefaults(@cIn)
		@setDefaults(@cMid)
		@setDefaults(@cOut)
		
		@cScale.properties = 
			rotation: 0
			scaleX: @logoScale()
			scaleY: @logoScale()
			x: @scaleNudge()
			y: @scaleNudge()
			
			
		@cPos.properties =
			rotation: 0 
			x: logoNudge.x
			y: logoNudge.y
		
		@cStar.properties =
			x: starNudge.x
			y: starNudge.y
			
	setDefaults: (layer) ->
	
		layer.properties = 
			scaleX: 1
			scaleY: 1
			rotation: 0
			x: 0
			y: 0
			blur: 0
			opacity: 1
			visible: true
			
	start: ->
		if @anim != undefined
			@anim.start()
			
	stop: -> 
		if @anim != undefined
			@anim.stop()
			
	
		
