comcastroYellow = "#FEC71C"
logoSourceSize = 720


logoSize = 300


logoImageScale =  logoSize / logoSourceSize
logoScaleNudge = -(logoSourceSize - logoSize) / 2





starNudge = 
	x: -3.301
	y: -10.022

logoNudge = 
	x: -23.1 
	y: 40.26



logo1 = new Layer
	width: logoSize
	height: logoSize
	backgroundColor: comcastroYellow
	x: Screen.width/2 - logoSize/2
	y: 100

	
		
scaleContainer =  new Layer
	name: "scale"
	superLayer: logo1
	backgroundColor: ""
	width: logoSourceSize
	height: logoSourceSize
	scaleX: logoImageScale
	scaleY: logoImageScale
	x: logoScaleNudge
	y: logoScaleNudge
	
	
positionContainer = new Layer
	name: "position"
	superLayer: scaleContainer
	backgroundColor: ""
	width: logoSourceSize
	height: logoSourceSize
	x: logoNudge.x
	y: logoNudge.y
	
	
cIn = new Layer
	name: "in"
	superLayer: positionContainer
	image: "images/c-in.png"
	width: logoSourceSize
	height: logoSourceSize
	
	
	
cMid = new Layer
	name: "mid"
	superLayer: positionContainer
	image: "images/c-mid.png"
	width: logoSourceSize
	height: logoSourceSize
	
	 

cOut = new Layer
	name: "out"
	superLayer: positionContainer
	image: "images/c-out.png"
	width: logoSourceSize
	height: logoSourceSize
	
	
	
cStar = new Layer
	name: "star"
	superLayer: positionContainer
	image: "images/star.png"
	width: logoSourceSize
	height: logoSourceSize
	x: starNudge.x
	y: starNudge.y
	
spinTime = 1.5
clockwise = -360
counter = 360

spinStar = new Animation
	layer: cStar
	properties:
		rotation: counter * 3
	time: 3
	curve: "cubic-bezier(0,0,.58,1)"
	delay: 1.5

spinIn = new Animation
	layer: cIn
	properties:
		rotation: counter * 2
	time: 2.5
	curve: "cubic-bezier(.42,0,.58,1)"
	delay: 2

spinMid = new Animation
	layer: cMid
	properties:
		rotation: clockwise * 2
	time: 2.5
	#curve: "cubic-bezier(.42,0,1,1)"
	#curve: "spring-dho(400, 200, 10, 0.1)"
	#curve: "spring(150,12,0.01)"
	delay: 2
	curve: "cubic-bezier(.42,0,.58,1)"	
		
spinOut = new Animation
	layer: cOut
	properties:
		rotation: counter * 2
	time: 2.5
	curve: "cubic-bezier(.42,0,.58,1)"	
	delay: 2




spinAll = ->	
	spinStar.start()
	spinIn.start()
	spinMid.start()
	spinOut.start()
	
stopAll = ->	
	spinStar.stop()
	spinIn.stop()
	spinMid.stop()
	spinOut.stop()
	
	
	
	
resetAnimations = ->
	cStar.rotation = 0
	cIn.rotation = 0
	cMid.rotation = 0
	cOut.rotation = 0
	spinAll()

isAnimating = false

logo1.on Events.Click, ->
	if !isAnimating
		spinAll()
		isAnimating = true


###
spinStar.on Events.AnimationEnd, ->
	resetAll()
	isAnimating = false

resetAll = ->
	cStar.rotation = 0
	cIn.rotation = 0
	cMid.rotation = 0
	cOut.rotation = 0
###


spinStar.on Events.AnimationEnd, ->
	resetStar()
	
spinIn.on Events.AnimationEnd, ->
	resetIn()
	
spinMid.on Events.AnimationEnd, ->
	resetMid()
	
spinOut.on Events.AnimationEnd, ->
	resetOut()

resetStar = ->
	cStar.rotation = 0
	spinStar.start()

resetIn = ->
	cIn.rotation = 0
	spinIn.start()
	
resetMid = ->
	cMid.rotation = 0
	spinMid.start()
	
resetOut = ->
	cOut.rotation = 0
	spinOut.start()


spinAll()


	
	
	
	
	
	
	
	
	
	
	
	
	
###	
# On a click, go to the next state
logo1.on Events.Click, ->
	cStar.animate
		rotation: 360
		time: 20
	cMid.animate
		properties: 
			rotation: 360
			time: 20
	cIn.animate
		properties: 
			rotation: -360
			time: 20
	cOut.animate
		properties: 
			rotation: -360
			time: 20
###

###	
# Set the default animation options
logo1.states.animationOptions =
	curve: "spring(150,12,0)"

logo1.draggable.enabled = true  
###


###
# Define a set of states with names (the original state is 'default')
logo1.states.add
	second: 
		y:100
		scale:0.6
		rotationZ:180
		x:Screen.width/2 - 256/2
		
	third:
		y:300
		scale:1.3
		#blur:4
		x:Screen.width/2 - 256/2
		
	fourth: 
		y:200
		scale:0.9
		#blur:2
		rotationZ:200
		x:Screen.width/2 - 256/2
###





#logo2 = logo1.copy()
#logo2.y = 500


