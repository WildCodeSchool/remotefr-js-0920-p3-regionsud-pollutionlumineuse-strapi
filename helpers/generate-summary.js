const removeMd = require('remove-markdown');

function generateSummary(markdown) {
  const plainText = removeMd(markdown)
  const words = plainText
    .replace('&#39;', "'")
    .split(' ')
  const shouldSlice = words.length > 4
  const slicedWords = shouldSlice ? words.slice(0, 4) : words
  const summary = slicedWords.join(' ')
  const hellip = shouldSlice ? '...' : ''
  return `${summary}${hellip}`
};

module.exports = generateSummary;
