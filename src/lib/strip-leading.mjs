const stripLeading = (marker, text, { noEscape } = {}) => {
  if (noEscape !== true) {
    marker = marker.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  text = text.replaceAll(new RegExp(`^[ \\t\\xa0]*${marker}[ \\t\\xa0]*`, 'gm'), '')

  return text.trim()
}

export { stripLeading }
