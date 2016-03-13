(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _src = require('../src');

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elements = [].slice.call(document.querySelectorAll('.line-clamp'));

elements.forEach(function (element) {
  (0, _src2.default)({
    lineCount: 3,
    lineHeight: 20
  })(element);
});

},{"../src":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ELLIPSIS = '…';
var WHITESPACE_REGEX = /(?=\s)/;
var TRAILING_WHITESPACE_REGEX = /\s+$/;

// Truncate the text of `element` such that it does not exceed the
// `maximumHeight`. Return `true` if we need to truncate by character, else
// return `false`.
function truncateByWord(element, maximumHeight) {
  var innerHTML = element.innerHTML;

  // Split the content of `element` by the space character.
  var splitCharacter = ' ';
  var chunks = innerHTML.split(WHITESPACE_REGEX);

  // The text does not contain whitespace; we need to attempt to truncate
  // by character.
  if (chunks.length === 1) {
    return true;
  }

  // Loop over the chunks, and try to fit more chunks into the `element`.
  var i = -1;
  var length = chunks.length;
  var newInnerHTML = '';
  while (++i < length) {
    newInnerHTML += chunks[i];
    element.innerHTML = newInnerHTML;

    // If the new height now exceeds the `maximumHeight` (where it did not
    // in the previous iteration), we know that we are at most one line
    // over the optimal text length.
    if (element.offsetHeight >= maximumHeight) {
      return true;
    }
  }

  return false;
}

// Append `ELLPISIS` to `element`, trimming off trailing characters in
// `element` such that `element` will not exceed the `maximumHeight`.
function truncateByCharacter(element, maximumHeight, ellipsisCharacter) {
  var innerHTML = element.innerHTML;
  var length = innerHTML.length;

  // In each iteration, we trim off one trailing character . Also trim
  // off any trailing punctuation before appending the `ellipsisCharacter`.
  while (length > 0) {
    element.innerHTML = innerHTML.substring(0, length).replace(TRAILING_WHITESPACE_REGEX, '') + ellipsisCharacter;
    if (element.offsetHeight <= maximumHeight) {
      return;
    }
    length--;
  }
}

function lineClamp(maximumHeight, ellipsisCharacter, element) {
  // Exit if text does not overflow the `element`.
  if (element.scrollHeight <= maximumHeight) {
    return;
  }

  // Else truncate by word, then truncate by character.
  truncateByWord(element, maximumHeight);
  truncateByCharacter(element, maximumHeight, ellipsisCharacter);
}

exports.default = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return lineClamp.bind(null, options.lineCount * options.lineHeight, options.ellipsisCharacter || ELLIPSIS);
};

},{}]},{},[1]);
