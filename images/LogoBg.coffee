###

#class for drawing the comcastro logo's background

###

@comcastroYellow = "#FEC71C"
@logoSourceSize = 720

@logoNudge =
  x: -23.1
  y: 40.26

@starNudge =
  x: -3.301
  y: -10.022


class @LogoBg extends Layer

  constructor: (@options)->
    super @options

    @logoSize = 360

    @properties =
      width: @logoSize
      height: @logoSize
      backgroundColor: comcastroYellow


  size: (newSize) ->
    @logoSize = @width = @height = newSize
    @cScale.scaleX = @cScale.scaleY = @logoScale()
    @cScale.x = @cScale.y = @scaleNudge()

  logoScale: ->
    return @logoSize / logoSourceSize

  scaleNudge: ->
    return -(logoSourceSize - @logoSize) / 2

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



