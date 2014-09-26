#
# 2014 Matthew LAB Product
# NGX QR Controller
# Programming by Matthew, Chang(matthew.chang@me.com)
# If you have any sort of question, let me know my email address
#

#
# =============== Program Usage ===============
# This Coffeescript script is based on jQuery Plugin
# and it will send user's data for customized server url
# user need to setting initialize variables(position, surl, debug)
# the default value of surl is : http://ngx.matthewlab.com
# =============================================
#
# Getting a familiar reference to jQuery
$ = jQuery

# An abstract class that provide jQuery plugin setup functionalities.
class jQueryPlugIn

  # Redefine this dictionary to specify default options
  @defaultOptions: {}

  # The default constructor calls the initialize method and set the jQuery element.
  # Remember to call super in subclasses if you want to maintain this behaviour.
  constructor: (@element, options) ->
    @initialize options

  # Method to initialize the plugin instance with the given options
  # This method could be called
  initialize: (@options) ->

    # Install a class as a jQuery plugin. Assuming that myClass extends jQueryPlugIn it can than be installed with:
    # myClass.installAsjQueryPlugIn()

  @installAsjQueryPlugIn: (pluginName = @name) ->
    pluginClass = @
    $.fn[pluginName] = (options, args...) ->
      options = $.extend pluginClass.defaultOptions, options or {} if $.type(options) is "object"
      return @each () ->
        $this = $(this)
        instance = $this.data pluginName
        if instance?
          if $.type(options) is "string"
            instance[options].apply instance, args
          else if instance.initialize?
            instance.initialize.apply instance, [options].concat args
        else
          plugin = new pluginClass $this, options, args...
          $this.data pluginName, plugin
          $this.addClass pluginName
          $this.bind "destroyed.#{pluginName}", () ->
            $this.removeData pluginName
            $this.removeClass pluginName
            $this.unbind pluginName
            plugin.destructor()
          plugin


# NGX QR Control Class
class ngxQrCtl extends jQueryPlugIn
  Socket=0
  @defaultOptions:
    position: 'bottom'
    width:50
    height:50
    color:"#3a3"
    surl: 'http://ngx.matthewlab.com/'
    debug: false

  constructor: (@element, options) ->
    super @element, options
    ext = this

    #Init Socket
    $.getScript @options.surl+"socket.io/socket.io.js", (data, textStatus, jqxhr) ->
      #Setting Socket.io functions
      Socket = io.connect(options.surl)
      Socket.emit('join','site');

      Socket.on  'join ok', (siteID) ->
        #Create QR-Code
        ext.element.qrcode({
          "width": ext.options.width,
          "height": ext.options.height,
          "color": ext.options.color,
          "text": "http://ngx.matthewlab.com/c/"+encodeURIComponent(siteID)
        })
        return

      Socket.on  'move', (event) ->
        #ext.moveCircle event
        ext.element.trigger('move',event)

        return

      return

  initialize: (@options) ->
    super @options
    return

# Installing the plugin as 'SimpleTabs'
ngxQrCtl.installAsjQueryPlugIn()
