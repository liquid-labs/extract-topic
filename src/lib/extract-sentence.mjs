const sentenceRe = /^((?:[^.!?]|\.\.\.|\.[^\s])+[.?!])(?:\s|$)/m

const extractSentence = (text) => {
  const result = text.match(sentenceRe)
  const sentence = result?.[1]
  if (sentence === undefined) {
    return [text, '']
  }
  else {
    const remainder = text.substring(result.index).trim()

    return [sentence.trim(), remainder]
  }
}

export { extractSentence }
