(function() {
  var LogoLayer, comcastroYellow, logo, logo2, logoImageScale, logoNudge, logoScaleNudge, logoSize, logoSourceSize, starNudge,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  comcastroYellow = "#FEC71C";

  logoSourceSize = 720;

  logoSize = 360;

  logoImageScale = logoSize / logoSourceSize;

  logoScaleNudge = -(logoSourceSize - logoSize) / 2;

  starNudge = {
    x: -3.301,
    y: -10.022
  };

  logoNudge = {
    x: -23.1,
    y: 40.26
  };

  LogoLayer = (function(superClass) {
    extend(LogoLayer, superClass);

    function LogoLayer(options) {
      this.options = options;
      LogoLayer.__super__.constructor.call(this, this.options);
      this.properties = {
        width: logoSize,
        height: logoSize,
        backgroundColor: comcastroYellow
      };
      this.addChildLayers();
      this._listen();
    }

    LogoLayer.prototype._listen = function() {
      return this.on(Events.Click, function() {});
    };

    LogoLayer.prototype.size = function(newSize) {
      logoSize = newSize;
      logoImageScale = newSize / logoSourceSize;
      logoScaleNudge = -(logoSourceSize - logoSize) / 2;
      this.width = newSize;
      this.height = newSize;
      this.cScale.scaleX = logoImageScale;
      this.cScale.scaleY = logoImageScale;
      this.cScale.x = logoScaleNudge;
      return this.cScale.y = logoScaleNudge;
    };

    LogoLayer.prototype.addChildLayers = function() {
      this.cScale = new Layer({
        name: "scale",
        superLayer: this,
        backgroundColor: "",
        width: logoSourceSize,
        height: logoSourceSize,
        scaleX: logoImageScale,
        scaleY: logoImageScale,
        x: logoScaleNudge,
        y: logoScaleNudge
      });
      this.cPos = new Layer({
        name: "position",
        superLayer: this.cScale,
        backgroundColor: "",
        width: logoSourceSize,
        height: logoSourceSize,
        x: logoNudge.x,
        y: logoNudge.y
      });
      this.cIn = new Layer({
        name: "in",
        superLayer: this.cPos,
        image: "images/c-in.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
      this.cMid = new Layer({
        name: "mid",
        superLayer: this.cPos,
        image: "images/c-mid.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
      this.cOut = new Layer({
        name: "out",
        superLayer: this.cPos,
        image: "images/c-out.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
      return this.cStar = new Layer({
        name: "star",
        superLayer: this.cPos,
        image: "images/star.png",
        width: logoSourceSize,
        height: logoSourceSize,
        x: starNudge.x,
        y: starNudge.y
      });
    };

    return LogoLayer;

  })(Layer);

  logo = new LogoLayer({
    x: Screen.width / 2 - logoSize / 2 - logoSize / 1.5,
    y: 100
  });

  logo2 = new LogoLayer({
    x: Screen.width / 2 - logoSize / 2 + logoSize / 1.5,
    y: 100
  });

  logo.size(180);

}).call(this);

