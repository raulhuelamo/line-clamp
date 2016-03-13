import lineClamp from '../src';

lineClamp(document.querySelector('.en'), {
  lineCount: 3,
  lineHeight: 20
});

lineClamp(document.querySelector('.en-native'), {
  lineCount: 3,
  lineHeight: 20,
  shouldUseNativeLineClamp: true
});

lineClamp(document.querySelector('.cn'), {
  lineCount: 3,
  lineHeight: 20
});

lineClamp(document.querySelector('.cn-native'), {
  lineCount: 3,
  lineHeight: 20,
  shouldUseNativeLineClamp: true
});
