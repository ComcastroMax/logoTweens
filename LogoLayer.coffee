###

#class for drawing the comcastro logo with each symnol as a different image and layer

###

@comcastroYellow = "#FEC71C"
@logoSourceSize = 720

class @LogoLayer extends Layer
	
	constructor: (@options)->
		super @options
		@logoSize = 360
		
		@properties = 
			width: @logoSize
			height: @logoSize
			backgroundColor: comcastroYellow
			
		@addChildLayers()
		
		 
		#@_listen()
    
	#_listen: ->
	#	@on Events.Click, ->

	size: (newSize)->
		@logoSize = @width = @height = newSize
		@cScale.scaleX = @cScale.scaleY = @logoScale()
		@cScale.x = @cScale.y = @scaleNudge()
	
	logoScale: ->
    	return @logoSize / logoSourceSize
    	
    scaleNudge: ->
    	return -(logoSourceSize - @logoSize) / 2
	
	addChildLayers: ->
		#some helper variables and adjustments

		starNudge = 
			x: -3.301
			y: -10.022
		
		logoNudge = 
			x: -23.1 
			y: 40.26
		
		
		@cScale =  new Layer
			name: "scale"
			superLayer: @
			backgroundColor: ""
			width: logoSourceSize
			height: logoSourceSize
			scaleX: @logoScale()
			scaleY: @logoScale()
			x: @scaleNudge()
			y: @scaleNudge()
			
		@cPos= new Layer
			name: "position"
			superLayer: @cScale
			backgroundColor: ""
			width: logoSourceSize
			height: logoSourceSize
			x: logoNudge.x
			y: logoNudge.y
		
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
			x: starNudge.x
			y: starNudge.y


	
	
