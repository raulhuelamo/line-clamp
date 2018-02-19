# line-clamp [![npm Version](http://img.shields.io/npm/v/line-clamp.svg?style=flat)](https://www.npmjs.com/package/line-clamp) [![Build Status](https://img.shields.io/travis/yuanqing/line-clamp.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/line-clamp)

> Line clamp a DOM element in vanilla JavaScript.

- Pure JavaScript; does *not* use [`-webkit-line-clamp`](https://css-tricks.com/line-clampin/)
- Exit if we detect that no truncation is necessary (ie. content does not overflow the element)
- Supports appending a custom string instead of an ellipsis

## Usage

> [**Editable demo (CodePen)**](https://codepen.io/lyuanqing/pen/VQQVry)

HTML:

```html
<div class="line-clamp">
  Lorem ipsum dolor sit amet, <strong>consectetur adipiscing</strong> elit.
</div>
```

CSS:

```
.line-clamp {
  width: 100px;
  line-height: 20px;
}
```

JavaScript:

```js
const element = document.querySelector('.line-clamp')
lineClamp(element, 3)
```

Boom:

```html
<div class="line-clamp" style="overflow: hidden; overflow-wrap: break-word; word-wrap: break-word;">
  Lorem ipsum dolor sit amet, <strong>consectetur…</strong>
</div>
```

- `line-clamp` also works even if the given element contains nested DOM nodes

### Limitations

- The given element is assumed to have a pixel line-height, obtained via [`window.getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).

## API

```js
const lineClamp = require('line-clamp')
```

### lineClamp(element, lineCount [, options])

Pass in an `options` object to change the string to append to the truncated text (defaults to `…`).

See [Usage](#usage).

## Installation

Install via [yarn](https://yarnpkg.com):

```sh
$ yarn add line-clamp
```

Or [npm](https://npmjs.com):

```sh
$ npm install --save line-clamp
```

## Prior art

- [Clamp.js](https://github.com/josephschmitt/Clamp.js)
- [FTEllipsis](https://github.com/ftlabs/ftellipsis)

## License

[MIT](LICENSE.md)
