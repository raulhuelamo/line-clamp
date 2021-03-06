var ELLIPSIS_TYPE_ELEMENT = 'element'
var ELLIPSIS_TYPE_STRING = 'string'
var ELLIPSIS_CHARACTER = '\u2026'
var LONG_TEXT_NODE_LENGTH = 1000

function truncateTextNode(
  textNode,
  rootElement,
  maximumHeight,
  ellipsis,
  ellipsisType
) {
  var lastIndexOfWhitespace
  var textContent = textNode.textContent

  var factor = 0;
  while (textContent.length >= LONG_TEXT_NODE_LENGTH) {
    textNode.textContent = textContent.substring(0, LONG_TEXT_NODE_LENGTH * Math.pow(2, factor))
    if (rootElement.scrollHeight > maximumHeight) {
      textContent = textNode.textContent
      break;
    }
    factor++;
  }

  while (textContent.length > 1) {
    lastIndexOfWhitespace = textContent.lastIndexOf(' ')
    if (lastIndexOfWhitespace === -1) {
      break
    }
    textNode.textContent = textContent.substring(0, lastIndexOfWhitespace)
    if (rootElement.scrollHeight <= maximumHeight) {
      textNode.textContent = textContent
      break
    }
    textContent = textNode.textContent
  }
  return truncateTextNodeByCharacter(
    textNode,
    rootElement,
    maximumHeight,
    ellipsis,
    ellipsisType
  )
}

var TRAILING_WHITESPACE_AND_PUNCTUATION_REGEX = /[ \r\n,;!?'‘’“”\-–—]+$/
function truncateTextNodeByCharacter(
  textNode,
  rootElement,
  maximumHeight,
  ellipsis,
  ellipsisType
) {
  var textContent = textNode.textContent
  var length = textContent.length
  while (length > 1) {
    // Trim off one trailing character and any trailing punctuation and whitespace.
    textContent = textContent
      .substring(0, length - 1)
      .replace(TRAILING_WHITESPACE_AND_PUNCTUATION_REGEX, '')
    length = textContent.length

    var endsWithDot = textContent.slice(-1) === '.'

    if (ellipsisType === ELLIPSIS_TYPE_ELEMENT) {
      textNode.textContent = endsWithDot ? (textContent + ' ') : (textContent + ELLIPSIS_CHARACTER + ' ')
      rootElement.append(ellipsis)
    } else {
      textNode.textContent = endsWithDot ? textContent : textContent + ELLIPSIS_CHARACTER
    }

    if (rootElement.scrollHeight <= maximumHeight) {
      return true
    }
    if (ellipsisType === ELLIPSIS_TYPE_ELEMENT) rootElement.removeChild(ellipsis)
  }
  return false
}

function truncateElementNode(
  element,
  rootElement,
  maximumHeight,
  ellipsis,
  ellipsisType
) {
  var childNodes = element.childNodes
  var i = childNodes.length - 1
  while (i > -1) {
    var childNode = childNodes[i--]
    var nodeType = childNode.nodeType
    if (
      (nodeType === 1 &&
        truncateElementNode(
          childNode,
          rootElement,
          maximumHeight,
          ellipsis,
          ellipsisType
        )) ||
      (nodeType === 3 &&
        truncateTextNode(
          childNode,
          rootElement,
          maximumHeight,
          ellipsis,
          ellipsisType
        ))
    ) {
      return true
    }
    element.removeChild(childNode)
  }
  return false
}

module.exports = function (rootElement, lineCount, options) {
  var cssText = rootElement.style.cssText
  rootElement.style.cssText += 'overflow:hidden;overflow-wrap:break-word;word-wrap:break-word;'

  var maximumHeight =
    (lineCount || 1) *
    parseInt(window.getComputedStyle(rootElement).lineHeight, 10)

  // Exit if text does not overflow `rootElement`.
  if (rootElement.scrollHeight <= maximumHeight) {
    rootElement.style.cssText = cssText
    return false
  }

  var ellipsis = options ? options.ellipsis === false ? '' : options.ellipsis : ELLIPSIS_CHARACTER
  var ellipsisType = ellipsis instanceof Element ? ELLIPSIS_TYPE_ELEMENT : ELLIPSIS_TYPE_STRING

  truncateElementNode(
    rootElement,
    rootElement,
    maximumHeight,
    ellipsis,
    ellipsisType
  )

  rootElement.style.cssText = cssText

  return true
}
