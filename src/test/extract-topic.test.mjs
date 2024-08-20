import { extractTopic } from '../extract-topic'

describe('extractTopic', () => {
  test.each([
    ["I don't end", undefined, "I don't end"],
    ['First sentence. Second sentence.', undefined, 'First sentence.'],
    ['How about a question? Hopufully.', undefined, 'How about a question?'],
    ['Exciting! Hopufully.', undefined, 'Exciting!'],
    ['This is an IP address: 127.0.0.1.', undefined, 'This is an IP address: 127.0.0.1.'],
    ['This is an IP address: 127.0.0.1. Truly.', undefined, 'This is an IP address: 127.0.0.1.'],
    ['How about\nmultilines? Does it work?', undefined, 'How about multilines?'],
    ['How \t about\nweird\xa0 spaces\t? Does it work?', undefined, 'How about weird spaces?'],
    ['How about... an ellipse? Does it work?', undefined, 'How about... an ellipse?'],
    ['__What__ about **inline** markdown? Is it okay?', undefined, 'What about inline markdown?'],
    ['And what about\n* markdown\n- lists?', undefined, 'And what about markdown lists?'],
    ['And what about\n1. numbered\n2. lists?', undefined, 'And what about numbered lists?'],
    ['# Header 1\nThis is the topic! Truly.', undefined, 'This is the topic!'],
    ['<h1>Header 1</h1>\nThis is the topic! Truly.', undefined, 'This is the topic!'],
    ["// Do comments\n  // work? Let's see!", undefined, 'Do comments work?'],
    ['/* And what\nabout multiline\n comments? How about that? * /', undefined, 'And what about multiline comments?'],
    ['/** And what\n  * about jsdoc\n  * comments? How about that?\n* /', undefined, 'And what about multiline comments?'],
    ['/* // Embedded\n//comments\n stay. How about that? * /', undefined, '// Embedded //comments stay.'],
    ['# Hi\nKeep the header. Okay?', { keepHeaders : true }, 'Hi Keep the header.'],
    ['<h1>Hi</h1>\nKeep the header. Okay?', { keepHeaders : true }, 'Hi Keep the header.'],
    ['# Hi\nKeep the header. Okay?', { keepHeaders : true, keepMd : true }, '# Hi Keep the header.'],
    ['`Backticks` stay. Yeah?', undefined, '`Backticks` stay.'],
    ['`Backticks` go. Yeah?', { removeBackticks : true }, 'Backticks go.'],
    ['Hi! What about min chars? Do they work?', { minChars: 10 }, 'Hi! What about min chars?'],
  ])('%s with options %p => %s', (input, options, expected) => expect(extractTopic(input, options)).toBe(expected))
})
