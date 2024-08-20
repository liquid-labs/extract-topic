const exampleData = [
  ['This is an IP address: 127.0.0.1. For localhost.', undefined, 'This is an IP address: 127.0.0.1.'],
  ['## Header\n__And__ **inline** markdown? Is it okay?', undefined, 'And inline markdown?'],
  ['<h1>Header</h1>\n<div><bold>And</bold> HTML? Does it work?</div>', undefined, 'And HTML?'],
  ['<h1>Overview</h1>\n<div>Topic intro. Keep the header.</div>', { handleHeaders : ': ' }, 'Overview: Topic intro.'],
  ['/** What\n  * about jsdoc\n  * comments? How about that?\n*/', undefined, 'What about jsdoc comments?'],
  ['/* // Embedded\n//comments stay. Extract again to remove. */', { keepNewlines : true }, '// Embedded\n//comments stay.'],
  ['HTML &amp; MD \(escaped\) characters are decoded. Nice!', undefined, 'HTML & MD (escaped) characters are decoded.'],
  ['Hi! What about min chars? Do they work?', { minChars : 10 }, 'Hi! What about min chars?'],
]

const exampleString = '<table>\n  <tr><th>Input</th><th>Options</th><th>Output</th></tr>'
  + exampleData.map(([input, options, output]) =>
    '\n  <tr>\n    <td><pre>\n'
    + input.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;') + '\n</pre></td>'
    + '<td>' + JSON.stringify(options) + '</td>'
    + '<td><pre>' + output + '</pre></td>\n  </tr>').join('') + '\n</table>'

export { exampleData, exampleString }
