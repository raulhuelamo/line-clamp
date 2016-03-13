export default (element, options = {}) => {

  // Options.
  const lineCount = options.lineCount || 1;
  const useNativeLineClamp = options.useNativeLineClamp || true;

  // Cache frequently-used attributes.
  const elementStyle = element.style;

  // Use native `line-clamp` if desired and if it is supported.
  if (useNativeLineClamp && typeof elementStyle.webkitLineClamp !== 'undefined') {
    elementStyle.cssText = `overflow:hidden;text-overflow:ellipsis;-webkit-box-orient:vertical;display:-webkit-box;-webkit-line-clamp:${lineCount};`;
    return;
  }

};
