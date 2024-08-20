import { extractSentence } from './lib/extract-sentence'
import { removeCommentChars } from './lib/remove-comment-chars'
import { removeHeaders } from './lib/remove-headers'
import { removeMarkdown } from './lib/remove-markdown'
import { removeTags } from './lib/remove-tags'

/**
 * Extracts the topic (typically the first sentence) from a paragraph. The function is HTML, Markdown, and comment
 * aware and by default will ignore headers and strip formatting.
 *
 * The algorithm works as follows:
 * 1. Removes any HTML or Markdown style section headers (e.g., '<h1>...</h1>`, '### ...', etc.) (unless
 * `keepHeaders=true`) and any resulting leading whitespace is removed.
 * 2. Removes comment characters (unless `keepCommentChars=true`).
 * 3. Strips HTML tags (unless `keepTags=true`) and Markdown format (unless `keepMd=true`) and any resulting leading
 * whitespace is removed.
 * 4. Extracts the first `sentenceCount` sentences (default 1).
 * 5. If the extracted text doesn't fulfill `minChars`, extract the next sentence.
 * 6. Trim the output to `maxChars`, if defined.
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
 * @param {boolean} [options.keepCommentChars = false] - If true, then comment signifiers are left in place.
 * @param {boolean} [options.keepHeaders = false] - If true, then HTML and Markdown style headers are left in place.
 * @param {boolean} [options.keepMd = false] - If true, then Markdown formatting is left in place.
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
  keepCommentChars = false,
  keepHeaders = false,
  keepMd = false,
  keepTags = false,
  maxChars,
  minChars = 0,
  removeBackticks = false,
  sentenceCount = 1,
} = {}) => {
  if (keepHeaders !== true) {
    text = removeHeaders(text)
  }
  if (keepCommentChars !== true) {
    text = removeCommentChars(text, { commentSignifiers })
  }
  if (keepMd !== true) {
    text = removeMarkdown(text, { removeBackticks })
  }
  if (keepTags !== true) {
    text = removeTags(text)
  }

  text = text.split(/(?:\n|\r|\r\n)/).join(' ')
  text = text.replaceAll(/[\t\xa0]/g, ' ')
  text = text.replaceAll(/  +/g, ' ')
  text = text.replaceAll(/ ([?!]|\.(?: |$))/g, '$1') // e.g., change 'huh ?' to 'huh?'

  let topic = ''
  for (let i = 0; i < sentenceCount || topic.length < minChars; i += 1) {
    const [sentence, remainder] = extractSentence(text)
    topic += (topic.length > 0 ? ' ' : '') + sentence
    text = remainder
  }

  return maxChars === undefined ? topic : topic.substring(0, maxChars)
}

export { extractTopic }
