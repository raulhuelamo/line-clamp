# line-clamp [![npm Version](http://img.shields.io/npm/v/line-clamp.svg?style=flat)](https://www.npmjs.com/package/line-clamp) [![Build Status](https://img.shields.io/travis/yuanqing/line-clamp.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/line-clamp)

> Truncate multi-line text in a DOM element in vanilla JavaScript.

## Features

- Exit if we detect that no truncation is necessary (ie. content does not overflow container).
- Allows use of a custom string instead of an ellipsis.

## Limitations

- Requires some [CSS to be set on the DOM element and its parent](#css).
- Truncation is in pure JavaScript; does *not* use [`-webkit-line-clamp`](https://css-tricks.com/line-clampin/).
- Assumes that the text to be truncated does *not* contain any inline HTML tags (eg. `em`, `strong`, etc.).

## Example

To run the [example](example), do:

```
$ git clone https://github.com/yuanqing/line-clamp
$ npm install
$ npm install --global gulp
$ gulp example --open
```

#### HTML

```html
<div class="line-clamp-wrapper">
  <div class="line-clamp">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</div>
```

#### CSS

```css
.line-clamp-wrapper {
  height: 60px;
  overflow: hidden;
}
.line-clamp {
  width: 100px;
  line-height: 20px;
  overflow-wrap: break-word;
  word-wrap: break-word;
}
```

#### JavaScript

```js
import lineClamp from 'line-clamp';

lineClamp({
  lineCount: 3,
  lineHeight: 20
})(element);
```

## API

```js
import lineClamp from 'line-clamp';
```

### lineClamp(options)(element)

- `options` &mdash; An object literal:

  Key | Description | Default
  :--|:--|:--
  `ellipsisCharacter` | The string to append to the truncated text. | '\u2026'
  `lineCount` | The number of lines to show. | `undefined`
  `lineHeight` | The pixel `line-height` of each line. Specify just the number eg. `15` instead of `15px`. | `undefined`

- `element` &mdash; A DOM element.

## Installation

Install via [npm](https://npmjs.com):

```
$ npm i --save line-clamp
```

## Prior art

- [Clamp.js](https://github.com/josephschmitt/Clamp.js)
- [FTEllipsis](https://github.com/ftlabs/ftellipsis)

## License

[MIT](LICENSE.md)
