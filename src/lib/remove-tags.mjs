const tagRe = /<[^\s>] ?[^\n\r>]*>/gm

const removeTags = (text) => {
  text = text.replaceAll(tagRe, '')

  return text
}

export { removeTags }
