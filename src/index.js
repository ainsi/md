import markdownit from 'markdown-it';

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
});

if (document.contentType === 'text/markdown') {
  const markdownText = document.documentElement.innerText;
  const renderedHtml = md.render(markdownText);

  document.documentElement.innerHTML = `
    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" type="text/css" href="${browser.runtime.getURL('github-markdown.min.css')}">
      <link rel="stylesheet" type="text/css" href="${browser.runtime.getURL('layout.css')}">
    </head>
    <body class="markdown-body">${renderedHtml}</body>
  `;
}
