import { stripLeading } from './strip-leading'

const inlineFormattersRe = /(__?_?|\*\*?\*?)(.*?)\1/gm
const linkRe = /!?\[([^\]]*)\]\([^)]*\)/gm
const backticksRe = /`(.*?)`/gm
const headingMarkersRe = /^#+/gm
const altMdHeaderRe = /^([^\n\r]+)(\n|\r|\r\n)([=-]{2,})(\n|\r|\r\n|$)/gm
const tableRe = /^(\s*)\|((([^|\r\n]|\\\|)*\|)+)/m
const escapableChars = '\\.*_\\[\\]{}()<>#.!|-'
const escapeRe = new RegExp(`\\\\([${escapableChars}])`, 'gm')

const removeMarkdown = (text, { keepWhitespace, removeBackticks }) => {
  // remove header markers (in case header retained)
  text = stripLeading('#+ ?', text, { keepWhitespace, noEscape : true })
  text = text.replaceAll(altMdHeaderRe, '$1')
  // remove list formatting.
  text = stripLeading('* ', text, { keepWhitespace })
  text = stripLeading('- ', text, { keepWhitespace })
  text = stripLeading('(?:0|[1-9][0-9]*)\\. ', text, { keepWhitespace, noEscape : true })
  // remove blockquotes
  text = stripLeading('> ', text, { keepWhitespace })
  // remove inline formatting
  text = text.replaceAll(inlineFormattersRe, '$2')
  // remove pre
  text = text.replaceAll(/^\s*```[a-zA-Z0-9]*\s*$/gm, '')
  // remove tables
  text = text.replaceAll(/^\s*\|(?:-+\|)+\s*$/gm, '') // remove header dividers
  let tableMatch = text.match(tableRe)
  while (tableMatch !== null) {
    const { index } = tableMatch
    text = text.substring(0, index) 
      + tableMatch[1]
      + tableMatch[2].replaceAll(/([^\\])?\|/g, '$1 ')
      + text.substring(index + tableMatch[1].length + tableMatch[2].length + 1)
    tableMatch = text.match(tableRe)
  }
  // remove horizontal rule
  text = text.replaceAll(/^([_=-])\1{2,}\s*$/gm, '')
  // remove links (and replace with label)
  text = text.replaceAll(linkRe, '$1')
  // remove backticks if told to
  if (removeBackticks === true) {
    text = text.replaceAll(backticksRe, '$1')
  }
  // if `remaveHeaders=false', then we could have header formatting, which we will now remove
  text = text.replaceAll(headingMarkersRe, '')
  // de-escape stuff
  text = text.replaceAll(escapableChars, '$1')

  return text
}

export { removeMarkdown, altMdHeaderRe }
