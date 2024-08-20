const htmlHeadersRe = /(<(h[1-6])>)(.*)(<\/\2>)/gm
const mdHeadersRe = /^(#+)(.*)(\r\n|\r|\n|$)/gm

const processHeaders = (text, { handleHeaders }) => {
  if (handleHeaders === false || handleHeaders === undefined || handleHeaders === null) { // remove headers
    console.log("ya!", console.log(text.match(htmlHeadersRe))) // DEBUG
    text = text.replaceAll(htmlHeadersRe, '')
    text = text.replaceAll(mdHeadersRe, '')
  }
  else {
    console.log('text:', text) // DEBUG
    text = text.replaceAll(htmlHeadersRe, `$1$3${handleHeaders}$4`)
    text = text.replaceAll(mdHeadersRe, `$1$2${handleHeaders}$3`)
    console.log('text(2):', text) // DEBUG
  }

  return text
}

export { processHeaders }
