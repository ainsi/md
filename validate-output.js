const { HtmlValidate } = require('html-validate');
const markdownit = require('markdown-it');

// Initialize markdown-it with the same config as your plugin
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
});

// Initialize html-validate with XHTML strict rules
const htmlvalidate = new HtmlValidate({
  extends: ['html-validate:standard'],
  rules: {
    'doctype-html': 'off', // Allow XHTML DOCTYPE
    'no-unknown-elements': 'error',
    'element-required-content': 'error',
    'attr-quotes': 'error',
    'void-content': 'error',
    'close-attr': 'error'
  }
});

async function validateMarkdownOutput(markdownText, testName = 'test') {
  console.log(`\nValidating markdown processing for: ${testName}`);

  try {
    // Process markdown
    const renderedHtml = md.render(markdownText);

    // Create XHTML output similar to your plugin
    const xhtmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//DTD" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="utf-8" />
  <title>Markdown Document</title>
</head>
<body class="markdown-body">${renderedHtml}</body>
</html>`;

    console.log('Generated XHTML structure');

    // Validate the HTML
    const report = await htmlvalidate.validateString(xhtmlContent);

    if (report.valid) {
      console.log('HTML validation passed! Your markdown processing generates valid XHTML.');
      return true;
    } else {
      console.log('HTML validation failed:');

      for (const result of report.results) {
        for (const message of result.messages) {
          console.log(`  Line ${message.line}:${message.column} - ${message.severity}: ${message.message}`);
          if (message.context) {
            console.log(`    Context: ${message.context}`);
          }
        }
      }
      return false;
    }
  } catch (error) {
    console.error('Validation error:', error.message);
    return false;
  }
}

// Main execution
async function main() {
  const testCases = [
    {
      name: 'Basic markdown features',
      content: `# Test Markdown Document

This is a **test markdown** document to validate HTML output.

## Features to test

- Lists work properly
- *Italic text* works
- \`Code snippets\` are formatted
- [Links](https://example.com) are functional

### Code block

\`\`\`javascript
function hello() {
    console.log("Hello world!");
}
\`\`\`

### Table

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

> This is a blockquote to test proper HTML generation.`
    }
  ];

  let allValid = true;

  for (const testCase of testCases) {
    const valid = await validateMarkdownOutput(testCase.content, testCase.name);
    allValid = allValid && valid;
  }

  if (allValid) {
    console.log('\nAll validations passed!');
    process.exit(0);
  } else {
    console.log('\nSome validations failed.');
    process.exit(1);
  }
}

main();
