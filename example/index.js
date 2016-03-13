import lineClamp from '../src';

const elements = [].slice.call(document.querySelectorAll('.line-clamp'))

elements.forEach((element) => {
  lineClamp({
    lineCount: 3,
    lineHeight: 20
  })(element);
});
