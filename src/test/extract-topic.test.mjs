import { exampleData } from './examples.data'
import { extractTopic } from '../extract-topic'

describe('extractTopic', () => {
  test.each([
    ["I don't end", undefined, "I don't end"],
    ['First sentence. Second sentence.', undefined, 'First sentence.'],
    ['How about a question? Hopufully.', undefined, 'How about a question?'],
    ['Exciting! Hopufully.', undefined, 'Exciting!'],
    ['This is an IP address: 127.0.0.1.', undefined, 'This is an IP address: 127.0.0.1.'],
    ['How about\nmultilines? Does it work?', undefined, 'How about multilines?'],
    ['How \t about\nweird\xa0 spaces\t? Does it work?', undefined, 'How about weird spaces?'],
    ['How about... an ellipse? Does it work?', undefined, 'How about... an ellipse?'],
    ['__What__ about **inline** [markdown](#i-am-a-link)? Is it okay?', undefined, 'What about inline markdown?'],
    ['[What\nabout\n](\nmultiline links)? Do they work?', undefined, 'What about?'],
    ['> and what about\n> blockquotes?\nHey!', undefined, 'and what about blockquotes?'],
    ['```js\nmy code!\n```\nDone.', undefined, 'my code!'],
    ['And what about\n* markdown\n- lists?', undefined, 'And what about markdown lists?'],
    ['And what about\n1. numbered\n2. lists?', undefined, 'And what about numbered lists?'],
    ['# Header 1\nThis is the topic! Truly.', undefined, 'This is the topic!'],
    ['Header 1\n========\nThis is the topic! Truly.', undefined, 'This is the topic!'],
    ['<h1>Header 1</h1>\nThis is the topic! Truly.', undefined, 'This is the topic!'],
    ["// Do comments\n  // work? Let's see!", undefined, 'Do comments work?'],
    ['/* And what\nabout multiline\n comments? How about that? */', undefined, 'And what about multiline comments?'],
    ['# Hi\nKeep the header. Okay?', { handleHeaders : ' ' }, 'Hi Keep the header.'],
    ['Hi\n=======\nKeep the header. Okay?', { handleHeaders : ' ' }, 'Hi Keep the header.'],
    ['<h1>Hi</h1>\nKeep the header. Okay?', { handleHeaders : ': ' }, 'Hi: Keep the header.'],
    ['# Hi\nKeep the header. Okay?', { handleHeaders : ' ', keepMd : true }, '# Hi Keep the header.'],
    ['`Backticks` stay. Yeah?', undefined, '`Backticks` stay.'],
    ['`Backticks` go. Yeah?', { removeBackticks : true }, 'Backticks go.'],
    ['\nKeep\xa0\twhitespace. Weird.', { keepWhitespace : true }, '\nKeep\xa0\twhitespace.'],
    ['/** Keep\xa0\twhitespace\n*   in comment. Weird. */', { keepWhitespace : true }, ' Keep\xa0\twhitespace\n  in comment.'],
    ...exampleData,
  ])('%s with options %p => %s', (input, options, expected) => expect(extractTopic(input, options)).toBe(expected))
})
