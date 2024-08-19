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

