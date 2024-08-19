const htmlHeadersRe = /<(h[1-6])>.*(?:<\/\1>)/gm
const mdHeadersRe = /^#+.*(?:\r\n|\r|\n)/gm

const removeHeaders = (text) => {
  text = text.replaceAll(htmlHeadersRe, '')
  text = text.replaceAll(mdHeadersRe, '')

  return text.trim()
}

export { removeHeaders }
