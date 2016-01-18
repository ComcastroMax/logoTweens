logo1 = new LogoLayer
	x: 40
	y: 40 

logo2 = new LogoLayer
	x: 440
	y: 40

logo3 = new LogoLayer
	x: 40
	y: 440

spin1 = new AnimationSpin(logo1)
spin1.start()

spin2 = new AnimationSpring(logo2)
spin2.start()




	
	
	
	
	
	
	
	
	
	
	
	



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







