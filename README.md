# docx-react

> A JSX wrapper around `docx` for creating docx files.

## Install

```bash
npm install docx-react
```

_Built with and Requires
[ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)_

## Usage

```jsx
import docx from 'docx';
import { promises as fs } from 'fs';

const { Document, Packer } = docx;

const DocxDoc = () => (
  <section>
    <p thematicBreak spacing={{ before: 100 }}>
      Hello World!
    </p>

    <p>I just created a docx file using JSX!</p>
  </section>
);

(async function () {
  const doc = new Document({
    sections: [DocxDoc()],
  });

  const buffer = await Packer.toBuffer(doc);
  await fs.writeFile('file.docx', buffer);
})();
```

<!-- TODO: document program api -->

## License

This project is licensed with the MIT license
