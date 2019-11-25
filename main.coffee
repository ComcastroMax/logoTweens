logoMain = new LogoBg
	x: 40
	y: 40

###
# this blocks the logo while the animation states reset
# seems you can't call stop() on an animation while it's in a delay state
###

#logoCheating = new LogoLayer
#	x: 40
#	y: 40


logos = [
	new LogoLayer,
	new LogoLayer,
	new LogoLayer,
	new LogoLayer,
	new LogoLayer,
	new LogoLayerClear
	]
	
tall = false	
	
	
logos[0].properties =
	x: 440
	y: 40
	
logos[1].properties =
	x: 40
	y: 440
	
logos[2].properties =
	x: 440
	y: 440
	
logos[3].properties =
	x: 40
	y: 840
	
logos[4].properties =
	x: 440
	y: 840

logos[5].properties =
  x: 40
  y: 40

###	
for logo, i in logos
	#logo.size(160)
	if tall
		logo.x = 40 + (if i < 3 then 0 else 200)
		logo.y = 440 + i * 200 % 600
	else 
		logo.x = 440 + i * 200 % 600 	
		logo.y = 40 + (if i < 3 then 0 else 200)
###
	
	
	
	

logos[0].anim = getAnimation1(logos[0])
logos[1].anim = getAnimation2(logos[1])
logos[2].anim = getAnimation3(logos[2])
logos[3].anim = getAnimation4(logos[3])
logos[4].anim = getAnimation5(logos[4])
logos[5].anim = getAnimation6(logos[5])


#logos[2].anim = new AnimationSimpleBreathe(logos[2])
#logos[2].anim = new AnimationSimpleRotate(logos[2])
#logos[5].anim = new AnimationPulseCascade(logos[5])

for logo in logos
	
	logo.start()
	
#	logo.on Events.MouseOver, (event, layer) =>
#		switch layer.id
#			when logos[0].id
#				logoMain.anim = getAnimation1(logoMain)
#			when logos[1].id
#				logoMain.anim = getAnimation2(logoMain)
#			when logos[2].id
#				logoMain.anim = getAnimation3(logoMain)
#			when logos[3].id
#				logoMain.anim = getAnimation4(logoMain)
#			when logos[4].id
#				logoMain.anim = getAnimation5(logoMain)
#			when logos[5].id
#				logoMain.anim = getAnimation6(logoMain.cStar)
#
#		logoCheating.visible = false
#		logoMain.start()
#
#	logo.on Events.MouseOut, (event, layer) =>
#		logoCheating.visible = true
#		logoMain.stop()
#
#logos[5].visible = false
	
	
	
	