# extract-topic
[![coverage: 100%](./.readme-assets/coverage.svg)](https://github.com/liquid-labs/extract-topic/pulls?q=is%3Apr+is%3Aclosed)

Extracts the topic sentence(s) from a given block of text/HTML/Markdown.

## Install

```bash
npm i extract-topic
```

## Usage

```js
import { extractTopic } from 'extract-topic' // ESM
// const { extractTopic } = require('extract-topic') // CJS
const paragraph = "Desire is irrelevant. There is only doing."

console.log('The topic sentence is: ' + extractTopic(paragraph))
// prints: "The topic sentence is: Desire is irrelevant."
```

See more [examples](#examples).

##  API reference
_API generated with [dmd-readme-api](https://www.npmjs.com/package/dmd-readme-api)._

<a id="extractTopic"></a>
### `extractTopic(text, [options])` ⇒ `string` 

Extracts the topic (typically the first sentence) from a paragraph. The function is HTML, Markdown, and comment
aware and by default will ignore headers and strip formatting.

The algorithm works as follows:
1. Processes any HTML or Markdown style section headers (e.g., '&lt;h1&gt;...&lt;/h1&gt;', '### ...', etc.), either
   removing (default) or converting to a part of the main text body depending on the value of `handleHeaders`.
   Whitespace is trimmed, unless `keepWhitespace=true` or`keepNewlines=true`.
2. Removes comment characters (unless `keepCommentChars=true`) and whitespace is trimmed unless
   `keepWhitespace=true` or `keepNewlines=true`.
3. Strips HTML tags (unless `keepTags=true`) and Markdown format (unless `keepMd=true`) and whitespace is trimmed
   unless `keepWhitespace=true` or `keepNewlines=true`.
4. All whitespace is normalized. Unless `keepNewlines=true`, newlines are removed then, unless `keepWhitespace=true`
   tabs and non-breaking spaces are converted to normal spaces, any multiple spaces are reduced to a single space,
   and space between the last word and end-punctuation is removed.
5. Extracts the first `sentenceCount` sentences (default 1).
6. If the extracted text doesn't fulfill `minChars`, extract the next sentence.
7. Trim the output to `maxChars`, if defined.

Re removing comment signifiers, the function will attempt to remove specified comment signifers from the beginning
of each line in the text (including any leading whitespace) beginning with the designated signifier string. '/*' is
treated as a special multi-line comment signifier. The leading '/*' and trailing '*&sol;' are removed and any
leading '*' characters from the body of the comment are removed (Javadoc style).


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` |  | The original block of text to extract the topic from. |
| [`options`] | `object` |  | Extraction options. |
| [`options.commentSignifiers`] | `Array.<string>` | `[&#x27;/*&#x27;, &#x27;//&#x27;]` | An array of comment signifiers to be removed.   Pass in an empty array to keep all comment signifiers. See note on removing comment signifiers in function   documentation. |
| [`options.handleHeaders`] | `boolean` \| `string` | `false` | If false (or `null`, `undefined`), then headers are   removed from text. If set to a string, then the header text is retained and appended with the value of this   option. E.g., `handleHeader=': '` applied to '&lt;h1&gt;Overview&lt;/h1&gt; Hello!' would yield 'Overview: Hello!' |
| [`options.keepCommentChars`] | `boolean` | `false` | If true, then comment signifiers are left in place. |
| [`options.keepMd`] | `boolean` | `false` | If true, then Markdown formatting is left in place. |
| [`options.keepNewlines`] | `boolean` | `false` | If true, then newlines in the text are preserved. |
| [`options.keepWhitespace`] | `boolean` | `false` | If true, then all whitespace in the text is preserved. |
| [`options.keepTags`] | `boolean` | `false` | If true, then HTML style tags are left in place. |
| [`options.maxChars`] | `number` \| `undefined` |  | If set, then result will be limited to the indicated   number of characters. |
| [`options.minChars`] | `number` | `0` | If set, then the function will continue to extract sentences until the   `minChars` have been satisfied (regardless of `sentenceCount`). |
| [`options.removeBackticks`] | `boolean` | `false` | If True, then backticks are also removed. |
| [`options.sentenceCount`] | `number` | `1` | The minimum number of sentences to extract. |

**Returns**: `string` - - The extracted topic.


## Examples

<table>
  <tr><th>Input</th><th>Options</th><th>Output</th></tr>
  <tr>
    <td><pre>
This is an IP address: 127.0.0.1. For localhost.
</pre></td><td>undefined</td><td><pre>This is an IP address: 127.0.0.1.</pre></td>
  </tr>
  <tr>
    <td><pre>
## Header
__And__ **inline** markdown? Is it okay?
</pre></td><td>undefined</td><td><pre>And inline markdown?</pre></td>
  </tr>
  <tr>
    <td><pre>
&lt;h1&gt;Header&lt;/h1&gt;
&lt;div&gt;&lt;bold&gt;And&lt;/bold&gt; HTML? Does it work?&lt;/div&gt;
</pre></td><td>undefined</td><td><pre>And HTML?</pre></td>
  </tr>
  <tr>
    <td><pre>
&lt;h1&gt;Overview&lt;/h1&gt;
&lt;div&gt;Topic intro. Keep the header.&lt;/div&gt;
</pre></td><td>{"handleHeaders":": "}</td><td><pre>Overview: Topic intro.</pre></td>
  </tr>
  <tr>
    <td><pre>
/** What
  * about jsdoc
  * comments? How about that?
*/
</pre></td><td>undefined</td><td><pre>What about jsdoc comments?</pre></td>
  </tr>
  <tr>
    <td><pre>
/* // Embedded
//comments stay. Extract again to remove. */
</pre></td><td>{"keepNewlines":true}</td><td><pre>// Embedded
//comments stay.</pre></td>
  </tr>
  <tr>
    <td><pre>
HTML &amp;amp; MD (escaped) characters are decoded. Nice!
</pre></td><td>undefined</td><td><pre>HTML & MD (escaped) characters are decoded.</pre></td>
  </tr>
  <tr>
    <td><pre>
Hi! What about min chars? Do they work?
</pre></td><td>{"minChars":10}</td><td><pre>Hi! What about min chars?</pre></td>
  </tr>
</table>

