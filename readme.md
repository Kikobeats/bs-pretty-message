## bs-pretty-message

![](https://cloud.githubusercontent.com/assets/2096101/18839400/2bd60266-840b-11e6-9dea-db682b81197f.png)

> Overlay a fullscreen message to all browsers

Useful for showing errors from webpack/browserify/gulp etc

## Install

```shell
npm i browser-sync bs-pretty-message
```

## Usage

```js
var browserSync = require('browser-sync').create();

browserSync.init({
    server: 'test/fixtures',
    plugins: ['bs-pretty-message']
});

// Emit an event to connected clients
setTimeout(function () {
    browserSync.sockets.emit('fullscreen:message', {
        title: "Hello from Example",
        body:  '10 seconds have elapsed!'
    });
}, 5000);
```
