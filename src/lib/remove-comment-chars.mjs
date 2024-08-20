import { stripLeading } from './strip-leading'

const removeCommentChars = (text, { commentSignifiers, keepWhitespace }) => {
  for (const signifier of commentSignifiers) {
    if (signifier === '/*') {
      text = removeJsStyleMultineCommentChars(text, { keepWhitespace })
    }
    else {
      text = stripLeading(signifier, text, { keepWhitespace })
    }
  }

  return stripProtection(text, { keepWhitespace })
}

const jsMultlineMatcher = /\/\*+\s*((?:.|[\r\n])*?)\*\//m

const removeJsStyleMultineCommentChars = (text, { keepWhitespace }) => {
  let result = text.match(jsMultlineMatcher)
  while (result !== null) {
    const { index } = result
    let commentBody = result[1]
    const length = result[0].length
    commentBody = stripLeading('*', commentBody, { keepWhitespace })
    commentBody = protectText(commentBody) // commentBody is now an array of lines
    const splicedText = text.split('')
    splicedText.splice(index, length, ...commentBody)
    text = splicedText.join('')

    // match the next one
    result = text.match(jsMultlineMatcher)
  }

  return text
}

const protectionMarker = '~!#$%'

const protectText = (text) => text.split(/(?:\n|\r|\r\n)/).map((l) => protectionMarker + l + '\n')

const stripProtection = (text, options) => stripLeading(protectionMarker, text, options)

export { removeCommentChars }
