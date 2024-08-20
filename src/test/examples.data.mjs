const exampleData = [
  ['This is an IP address: 127.0.0.1. For localhost.', undefined, 'This is an IP address: 127.0.0.1.'],
  ['## Header\n__And__ **inline** markdown? Is it okay?', undefined, 'And inline markdown?'],
  ['<h1>Header</h1>\n<div><bold>And</bold> HTML? Does it work?</div>', undefined, 'And HTML?'],
  ['/** What\n  * about jsdoc\n  * comments? How about that?\n*/', undefined, 'What about jsdoc comments?'],
  ['/* // Embedded\n//comments stay. Extract again to remove. */', { keepNewlines:true }, '// Embedded\n//comments stay.'],
  ['Hi! What about min chars? Do they work?', { minChars: 10 }, 'Hi! What about min chars?'],
]

const exampleString = `| Input | Options | Output|\n|--|--|--|\n` +
  exampleData.map(([input, options, output]) =>
      '|```\n' + input + '\n```'// .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\n', '&#10;')
      + '|' + JSON.stringify(options, null, '  ')
      + '|```\n' + output + '\n```|'//.replaceAll('\n', '&#10;') + '|'
  ).join('\n')

export { exampleData, exampleString }