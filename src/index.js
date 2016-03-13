const ELLIPSIS = '\u2026';
const WHITESPACE_REGEX = /(?=\s)/;
const TRAILING_WHITESPACE_REGEX = /\s+$/;

// Truncate the text of `element` such that it does not exceed the
// `maximumHeight`. Return `true` if we need to truncate by character, else
// return `false`.
function truncateByWord(element, maximumHeight) {
  const innerHTML = element.innerHTML;

  // Split the content of `element` by the space character.
  const splitCharacter = ' ';
  let chunks = innerHTML.split(WHITESPACE_REGEX);

  // The text does not contain whitespace; we need to attempt to truncate
  // by character.
  if (chunks.length === 1) {
    return true;
  }

  // Loop over the chunks, and try to fit more chunks into the `element`.
  let i = -1;
  const length = chunks.length;
  let newInnerHTML = '';
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
  const innerHTML = element.innerHTML;
  let length = innerHTML.length;

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

export default (options = {}) => {
  return lineClamp.bind(
    null,
    options.lineCount * options.lineHeight,
    options.ellipsisCharacter || ELLIPSIS
  );
};
