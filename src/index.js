const ELLIPSIS = '\u2026';
const SPLIT_REGEX = /(?=\s)/;
const TRIM_TRAILING_REGEX = /[\s.,]+$/;

export default (element, options = {}) => {

  // Options.
  const lineCount = options.lineCount || 1;
  const lineHeight = options.lineHeight;
  const shouldUseNativeLineClamp = options.shouldUseNativeLineClamp;
  const ellipsisCharacter = options.ellipsisCharacter || ELLIPSIS;

  const cssText = 'overflow:hidden;overflow-wrap:break-word;word-wrap:break-word;';

  // Use native `line-clamp` if desired, and if it is supported.
  const elementStyle = element.style;
  if (shouldUseNativeLineClamp && typeof elementStyle.webkitLineClamp !== 'undefined') {
    elementStyle.cssText = `${cssText}display:-webkit-box;text-overflow:ellipsis;-webkit-box-orient:vertical;-webkit-line-clamp:${lineCount};`;
    return;
  }
  elementStyle.cssText = cssText;

  // Truncate the value of `element` such that it does not exceed the
  // `maximumHeight`. Return `true` if we need to truncate by character, else
  // return `false`.
  function truncateByWord(element, maximumHeight) {
    const innerHTML = element.innerHTML;

    // Split the content of `element` by the space character.
    const splitCharacter = ' ';
    let chunks = innerHTML.split(SPLIT_REGEX);

    // The `element` value does not contain whitespace; we need to attempt to
    // truncate by character.
    if (chunks.length === 1) {
      return true;
    }

    // Initialise the value to the first chunk.
    element.innerHTML = chunks[0];

    // Loop over the remaining chunks, and try to fit `result` plus the
    // `currentChunk` into the `element`
    let i = 0;
    const length = chunks.length;
    while (++i < length) {
      element.innerHTML += chunks[i];

      // If the new height now exceeds the `maximumHeight` (where it did not
      // in the previous iteration), we know that we are at most one line
      // over the optimal length.
      if (element.offsetHeight > maximumHeight) {
        return true
      }
    }

    return false;
  }

  // Append `ELLPISIS` to `element`, trimming off trailing characters in
  // `element` such that `element` will not exceed the `maximumHeight`.
  function truncateByCharacter(element, maximumHeight, ellipsisCharacter) {
    const innerHTML = element.innerHTML;

    let length = innerHTML.length;
    while (length > 0) {
      // In each iteration, we trim off one more trailing character . Also trim
      // off any trailing punctuation before appending the `ellipsisCharacter`.
      element.innerHTML = innerHTML.substring(0, length).replace(TRIM_TRAILING_REGEX, '')
        + ellipsisCharacter;
      if (element.offsetHeight <= maximumHeight) {
        return;
      }
      length--;
    }
  }

  const maximumHeight = lineHeight * lineCount;
  if (truncateByWord(element, maximumHeight)) {
    truncateByCharacter(element, maximumHeight, ellipsisCharacter);
  }

};
