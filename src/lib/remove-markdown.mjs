import { stripLeading } from './strip-leading'

const inlineFormattersRe = /(__?_?|\*\*?\*?)(.*?)\1/gm
const backticksRe = /`(.*?)`/gm
const headingMarkersRe = /^#+/gm

const removeMarkdown = (text, { keepWhitespace, removeBackticks }) => {
  // remove list formatting.
  text = stripLeading('* ', text, { keepWhitespace })
  text = stripLeading('- ', text, { keepWhitespace })
  text = stripLeading('(?:0|[1-9][0-9]*)\\. ', text, { keepWhitespace, noEscape : true })
  // remove inline formatting
  text = text.replaceAll(inlineFormattersRe, '$2')
  // remove backticks if told to
  if (removeBackticks === true) {
    text = text.replaceAll(backticksRe, '$1')
  }
  // if `remaveHeaders=false', then we could have header formatting, which we will now remove
  text = text.replaceAll(headingMarkersRe, '')

  return text
}

export { removeMarkdown }
