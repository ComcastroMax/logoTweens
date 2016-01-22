#fake interface with suggested inputs

class @AnimationTween
	constructor: (logo) ->
		@logo = logo
		@anims = []	
		#@setupListeners()
		
	start: ->
		@halt = false	
		
	stop: ->
		@halt = true
		for anim in @anims
			anim.stop()
		@logo.reset()
	
	#setupListeners: ->
		#@logo.on Events.MouseOver, (event, layer) =>
		#	@start()
		#@logo.on Events.MouseOut, (event, layer) =>
		#	@stop()
	
	
		