(function (socket) {
  var SHOW_MESSAGE_EVENT = 'fullscreen:message'
  var HIDE_MESSAGE_EVENT = 'fullscreen:message:clear'
  var MESSAGE_ID = 'bs-pretty-message'

  var styles = {
    '.bs-pretty-message': [
      'width: 100%',
      'height: 100%',
      'display: table',
      'background-color: white',
      'color: white',
      'position: absolute',
      'font-family: Consolas',
      'top: 0',
      'left: 0',
      'opacity: 0.98',
      'box-sizing: border-box',
      'z-index: 2147483647'
    ],

    '.bs-pretty-message__wrapper': [
      'background-color: rgb(202, 6, 18)',
      'color: white',
      'top: 0',
      'left: 0',
      'opacity: 0.98',
      'padding: 1rem',
      'height: 100vh',
      'box-sizing: border-box'
    ],

    '.bs-pretty-message__header': [
      'font-family: "helvetica neue", helvetica, sans-serif',
      'box-sizing: border-box'
    ],

    '.bs-pretty-message__content': [
      'font-family: Consolas, monaco, monospace',
      'box-sizing: border-box'
    ]
  }

  function removeMessage (ctx) {
    var el = document.getElementById(MESSAGE_ID)
    if (el) ctx.removeChild(el)
  }

  function createMessage (data) {
    /** Append CSS */

    var style = data.styles || styles

    var sheet = (function () {
      var style = document.createElement('style')
      style.appendChild(document.createTextNode(''))
      document.head.appendChild(style)
      return style.sheet
    })()

    Object.keys(style).forEach(function (ruleName) {
      var rule = ruleName + '{' + style[ruleName].join(';') + '}'
      sheet.insertRule(rule, 0)
    })

    /** Append HTML **/

    var el = document.createElement('div')
    el.id = MESSAGE_ID
    el.style = style['.' + MESSAGE_ID].join(';')

    var html = [
      '<div class="bs-pretty-message__wrapper">',
      '<h1 class="bs-pretty-message__header">%s</h1>',
      '<div class="bs-pretty-message__content" style="white-space:pre-line;">%s</div>',
      '</div>'
    ].join('')

    html = html
      .replace('%s', data.title || 'Message from Browsersync')
      .replace('%s', data.body || 'Something happened; Check the console')

    el.innerHTML = html

    return el
  }

  function closeOnEsc (event) {
    if (event.keyCode === 27) removeMessage(body)
  }

  var body = document.getElementsByTagName('body')[0]

  socket.on(HIDE_MESSAGE_EVENT, function () {
    removeMessage(body)
    window.document.removeEventListener('keydown', closeOnEsc)
  })

  socket.on(SHOW_MESSAGE_EVENT, function (data) {
    removeMessage(body)
    body.appendChild(createMessage(data))
    window.document.addEventListener('keydown', closeOnEsc)
  })
})(window.___browserSync___.socket)
