import { decode } from 'he'

const tagRe = /<[^\s>] ?[^\n\r>]*>/gm

const removeTags = (text) => {
  text = text.replaceAll(tagRe, '')

  text = decode(text)

  return text
}

export { removeTags }
