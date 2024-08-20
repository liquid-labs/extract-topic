import { extractSentence } from './lib/extract-sentence'
import { processHeaders } from './lib/process-headers'
import { removeCommentChars } from './lib/remove-comment-chars'
import { removeMarkdown } from './lib/remove-markdown'
import { removeTags } from './lib/remove-tags'

/**
 * Extracts the topic (typically the first sentence) from a paragraph. The function is HTML, Markdown, and comment
 * aware and by default will ignore headers and strip formatting.
 *
 * The algorithm works as follows:
 * 1. Processes any HTML or Markdown style section headers (e.g., '&lt;h1&gt;...&lt;/h1&gt;', '### ...', etc.), either 
 *    removing (default) or converting to a part of the main text body depending on the value of `handleHeaders`. 
 *    Whitespace is trimmed, unless `keepWhitespace=true` or`keepNewlines=true`.
 * 2. Removes comment characters (unless `keepCommentChars=true`) and whitespace is trimmed unless
 *    `keepWhitespace=true` or `keepNewlines=true`.
 * 3. Strips HTML tags (unless `keepTags=true`) and Markdown format (unless `keepMd=true`) and whitespace is trimmed
 *    unless `keepWhitespace=true` or `keepNewlines=true`.
 * 4. All whitespace is normalized. Unless `keepNewlines=true`, newlines are removed then, unless `keepWhitespace=true`
 *    tabs and non-breaking spaces are converted to normal spaces, any multiple spaces are reduced to a single space,
 *    and space between the last word and end-punctuation is removed.
 * 5. Extracts the first `sentenceCount` sentences (default 1).
 * 6. If the extracted text doesn't fulfill `minChars`, extract the next sentence.
 * 7. Trim the output to `maxChars`, if defined.
 *
 * Re removing comment signifiers, the function will attempt to remove specified comment signifers from the beginning
 * of each line in the text (including any leading whitespace) beginning with the designated signifier string. '/*' is
 * treated as a special multi-line comment signifier. The leading '/*' and trailing '*&sol;' are removed and any
 * leading '*' characters from the body of the comment are removed (Javadoc style).
 * @param {string} text - The original block of text to extract the topic from.
 * @param {object} [options] - Extraction options.
 * @param {Array.<string>} [options.commentSignifiers = ['/*', '//']] - An array of comment signifiers to be removed.
 *   Pass in an empty array to keep all comment signifiers. See note on removing comment signifiers in function
 *   documentation.
 * @param {boolean|string} [options.handleHeaders = false] - If false (or `null`, `undefined`), then headers are 
 *   removed from text. If set to a string, then the header text is retained and appended with the value of this 
 *   option. E.g., `handleHeader=': '` applied to '&lt;h1&gt;Overview&lt;/h1&gt; Hello!' would yield 'Overview: Hello!'
 * @param {boolean} [options.keepCommentChars = false] - If true, then comment signifiers are left in place.
 * @param {boolean} [options.keepMd = false] - If true, then Markdown formatting is left in place.
 * @param {boolean} [options.keepNewlines = false] - If true, then newlines in the text are preserved.
 * @param {boolean} [options.keepWhitespace = false] - If true, then all whitespace in the text is preserved.
 * @param {boolean} [options.keepTags = false] - If true, then HTML style tags are left in place.
 * @param {number|undefined} [options.maxChars] - If set, then result will be limited to the indicated
 *   number of characters.
 * @param {number} [options.minChars = 0] - If set, then the function will continue to extract sentences until the
 *   `minChars` have been satisfied (regardless of `sentenceCount`).
 * @param {boolean} [options.removeBackticks = false] - If True, then backticks are also removed.
 * @param {number} [options.sentenceCount = 1] - The minimum number of sentences to extract.
 * @returns {string} - The extracted topic.
 */
const extractTopic = (text, {
  commentSignifiers = ['/*', '//'],
  handleHeaders = false,
  keepCommentChars = false,
  keepMd = false,
  keepNewlines = false,
  keepWhitespace = false,
  keepTags = false,
  maxChars,
  minChars = 0,
  removeBackticks = false,
  sentenceCount = 1,
} = {}) => {
  text = processHeaders(text, { handleHeaders })
  text = keepWhitespace === true ? text : text.trim()

  if (keepCommentChars !== true) {
    text = removeCommentChars(text, { commentSignifiers, keepWhitespace })
    text = keepWhitespace === true ? text : text.trim()
  }
  if (keepMd !== true) {
    text = removeMarkdown(text, { keepWhitespace, removeBackticks })
    text = keepWhitespace === true ? text : text.trim()
  }
  if (keepTags !== true) {
    text = removeTags(text)
    text = keepWhitespace === true ? text : text.trim()
  }

  if (keepNewlines !== true && keepWhitespace !== true) {
    text = text.split(/(?:\n|\r|\r\n)/).join(' ')
  }
  if (keepWhitespace !== true) {
    text = text.replaceAll(/[\t\xa0]/g, ' ')
    text = text.replaceAll(/  +/g, ' ')
    text = text.replaceAll(/ ([?!]|\.(?: |$))/g, '$1') // e.g., change 'huh ?' to 'huh?'
  }

  let topic = ''
  let lastTrailingSpace = ''
  for (let i = 0; i < sentenceCount || topic.length < minChars; i += 1) {
    let [sentence, remainder, trailingSpace] = extractSentence(text)
    sentence = keepWhitespace === true ? sentence : sentence.trim()
    remainder = keepWhitespace === true ? remainder : remainder.trim()

    const spacer = topic.length === 0 ? '' : (keepWhitespace === true ? lastTrailingSpace : ' ')
    topic += spacer + sentence

    text = remainder
    lastTrailingSpace = trailingSpace
  }

  return maxChars === undefined ? topic : topic.substring(0, maxChars)
}

export { extractTopic }
