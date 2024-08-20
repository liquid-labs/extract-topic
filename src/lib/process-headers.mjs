import { altMdHeaderRe } from './remove-markdown'

const htmlHeadersRe = /(<(h[1-6])>)(.*)(<\/\2>)/gm
const mdHeadersRe = /^(#+)(.*)(\r\n|\r|\n|$)/gm

const processHeaders = (text, { handleHeaders }) => {
  if (handleHeaders === false || handleHeaders === undefined || handleHeaders === null) { // remove headers
    text = text.replaceAll(htmlHeadersRe, '')
    text = text.replaceAll(mdHeadersRe, '')
    text = text.replaceAll(altMdHeaderRe, '')
  }
  else {
    text = text.replaceAll(htmlHeadersRe, `$1$3${handleHeaders}$4`)
    text = text.replaceAll(mdHeadersRe, `$1$2${handleHeaders}$3`)
    text = text.replaceAll(altMdHeaderRe, `$1${handleHeaders}$2$3$4`)
  }

  return text
}

export { processHeaders }
