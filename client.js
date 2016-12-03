(function (socket) {
  var SHOW_MESSAGE_EVENT = 'fullscreen:message'
  var HIDE_MESSAGE_EVENT = 'fullscreen:message:clear'
  var MESSAGE_ID = 'bs-pretty-message'

  var styles = {
    'opacity': 0.98,
    'padding': '1rem',
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'background-color': '#CA0612',
    'width': '100%',
    'height': '100%',

    // This z-index is the highest supported by Safari 0-3 (all other browsers
    // support even higher values)
    // It is also above the IAB z-index recommended value of 6,000,000+ for
    // overlay ads, so hopefully the fullscreen:message will be on top of all
    // ads, too.
    'z-index': 16777271,

    'color': 'white'
  }

  function removeMessage (ctx) {
    var el = document.getElementById(MESSAGE_ID)
    if (el) ctx.removeChild(el)
  }

  function createMessage (data) {
    var el = document.createElement('div')
    el.id = MESSAGE_ID

    for (var key in styles) el.style[key] = styles[key]

    el.innerHTML = '<h1 style="%s">%s</h1><div style="%s"><pre style="%s">%s</pre></div>'
      .replace('%s', data.titleStyles || '')
      .replace('%s', data.title || 'Message from Browsersync')
      .replace('%s', data.wrapperStyles || '')
      .replace('%s', data.preStyles || 'white-space:pre')
      .replace('%s', data.body || 'Something happened; Check the console')

    return el
  }

  var body = document.getElementsByTagName('body')[0]

  socket.on(HIDE_MESSAGE_EVENT, function () {
    removeMessage(body)
  })

  socket.on(SHOW_MESSAGE_EVENT, function (data) {
    removeMessage(body)
    body.appendChild(createMessage(data))
  })
})(window.___browserSync___.socket)
