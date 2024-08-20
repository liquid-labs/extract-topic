const stripLeading = (marker, text, { keepWhitespace, noEscape } = {}) => {
  if (noEscape !== true) {
    marker = marker.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
  }

  text = text.replaceAll(new RegExp(`^[ \\t\\xa0]*${marker}`, 'gm'), '')

  text = keepWhitespace === true ? text : text.trim()

  return text
}

export { stripLeading }
