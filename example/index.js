import lineClamp from '../src';

const elements = [].slice.call(document.querySelectorAll('.line-clamp'))

elements.forEach((element) => {
  lineClamp(element, { lineCount: 3 });
});
